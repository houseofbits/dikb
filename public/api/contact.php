<?php
/**
 * Contact form endpoint: POST /api/contact.php (JSON body) → plain-text email.
 *
 * Settings come from environment variables when the host provides them, with
 * the defaults below otherwise. Nothing secret lives in this file: it uses
 * PHP's mail(), i.e. the hosting server's own mail transport.
 *
 *   CONTACT_TO       where enquiries are delivered
 *   CONTACT_FROM     sender address; should be on the site's own domain so
 *                    SPF/DKIM pass and the message doesn't land in spam
 *   CONTACT_ORIGINS  comma-separated list of allowed browser Origins
 *
 * Abuse protection: allowed-origin check, hidden honeypot field, minimum
 * fill time, per-IP rate limit, length limits, and header-injection-safe
 * headers (the visitor's address only ever goes into Reply-To, validated).
 */

declare(strict_types=1);

const MAX_PER_HOUR = 5;
const MIN_FILL_SECONDS = 3;
const LIMITS = ['name' => 200, 'organization' => 200, 'email' => 254, 'message' => 5000];

$to = getenv('CONTACT_TO') ?: 'kpudzens@gmail.com';
$from = getenv('CONTACT_FROM') ?: 'noreply@dizainsuninterjers.lv';
$allowedOrigins = array_map(
    'trim',
    explode(',', getenv('CONTACT_ORIGINS') ?: 'https://dizainsuninterjers.lv,https://www.dizainsuninterjers.lv')
);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}

// Browsers always send Origin on a cross-origin or fetch POST; reject foreign sites.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$input = json_decode($raw ?: '', true);
if (!is_array($input)) {
    respond(400, ['ok' => false, 'error' => 'invalid']);
}

/** Trim, normalise newlines and drop control characters (keeps \n for the message). */
function clean(mixed $value, bool $multiline = false): string
{
    $text = is_string($value) ? trim($value) : '';
    $text = str_replace(["\r\n", "\r"], "\n", $text);
    $pattern = $multiline ? '/[\x00-\x09\x0B-\x1F\x7F]/u' : '/[\x00-\x1F\x7F]/u';
    return (string) preg_replace($pattern, '', $text);
}

// Bots: a filled honeypot or an instant submit gets a fake success, so they learn nothing.
$startedAt = (int) ($input['startedAt'] ?? 0);
if (clean($input['website'] ?? '') !== '' || ($startedAt > 0 && time() - intdiv($startedAt, 1000) < MIN_FILL_SECONDS)) {
    respond(200, ['ok' => true]);
}

$fields = [
    'name' => clean($input['name'] ?? ''),
    'organization' => clean($input['organization'] ?? ''),
    'email' => clean($input['email'] ?? ''),
    'message' => clean($input['message'] ?? '', true),
];

$invalid = [];
foreach (['name', 'email', 'message'] as $required) {
    if ($fields[$required] === '') {
        $invalid[] = $required;
    }
}
foreach (LIMITS as $key => $max) {
    if (mb_strlen($fields[$key]) > $max) {
        $invalid[] = $key;
    }
}
if ($fields['email'] !== '' && !filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    $invalid[] = 'email';
}
if ($invalid) {
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => array_values(array_unique($invalid))]);
}

// Per-IP rate limit. Only a hash of the IP is stored, in the system temp dir (outside the web root).
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . __FILE__);
$store = sys_get_temp_dir() . '/dikb-contact-rate.json';
$handle = fopen($store, 'c+');
if ($handle !== false && flock($handle, LOCK_EX)) {
    $log = json_decode(stream_get_contents($handle) ?: '{}', true) ?: [];
    $cutoff = time() - 3600;
    foreach ($log as $key => $times) {
        $log[$key] = array_values(array_filter($times, fn ($t) => $t > $cutoff));
        if (!$log[$key]) {
            unset($log[$key]);
        }
    }
    if (count($log[$ipHash] ?? []) >= MAX_PER_HOUR) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(429, ['ok' => false, 'error' => 'rate']);
    }
    $log[$ipHash][] = time();
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($log));
    flock($handle, LOCK_UN);
    fclose($handle);
}

$subjectName = $fields['organization'] !== '' ? "{$fields['name']} ({$fields['organization']})" : $fields['name'];
$subject = mb_encode_mimeheader('Website enquiry: ' . $subjectName, 'UTF-8', 'B', "\r\n");

$body = implode("\n", [
    'New enquiry from the DIKB website contact form.',
    '',
    'Name:         ' . $fields['name'],
    'Institution:  ' . ($fields['organization'] !== '' ? $fields['organization'] : '—'),
    'Email:        ' . $fields['email'],
    'Language:     ' . (($input['locale'] ?? '') === 'lv' ? 'LV' : 'EN'),
    '',
    'Message:',
    $fields['message'],
    '',
    '— Reply to this email to answer the sender directly.',
]);

$headers = implode("\r\n", [
    'From: DIKB website <' . $from . '>',
    'Reply-To: ' . $fields['email'],
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: dikb-contact',
]);

$sent = mail($to, $subject, $body, $headers, '-f' . $from);

if (!$sent) {
    error_log('dikb-contact: mail() returned false');
    respond(500, ['ok' => false, 'error' => 'send']);
}

respond(200, ['ok' => true]);
