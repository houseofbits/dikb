<?php

include("admin/dikb_sql.php");

include("conf.php");

$db = new DIKB_SQL($conf['sql_host'], $conf['sql_user'], $conf['sql_password'], $conf['sql_db']);

$data = [
    'frontPageArticles' => $db->GetFrontPageArticles(),
];

echo json_encode($data);




