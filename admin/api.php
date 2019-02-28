<?php
include("dikb_sql.php");

include("../../config.php");

$db = new DIKB_SQL($conf['sql_host'], $conf['sql_user'], $conf['sql_password'], $conf['sql_db']);

if(isset($_GET['categories'])){
    echo json_encode($db->GetCategories());
}
if(isset($_GET['allImages'])){
    echo json_encode($db->GetAllImages());
}
if(isset($_GET['articles'])){
    $catid = -1;
    if(!empty($_GET['articles']))$catid = $_GET['articles'];
    if($catid == 'FRONTPAGE')echo json_encode($db->GetArticlesArray(-1, true));
    else echo json_encode($db->GetArticlesArray($catid));
}
if(!empty($_GET['images'])){
    echo json_encode($db->GetImages($_GET['images']));
}
if(isset($_GET['deleteImage'])){
    $db->RemoveImage($_POST['imageId']);
    echo json_encode($db->GetImages($_POST['articleId']));
}
if(isset($_GET['article']) && !empty($_GET['article'])){
    echo json_encode($db->GetArticle($_GET['article']));
}
if(isset($_GET['addCat']) && !empty($_POST['name'])){
    $db->CreateCategory($_POST['name']);
    echo json_encode($db->GetCategories());
}
if(isset($_GET['renameCat']) && !empty($_POST['id'])){
    $db->RenameCategory($_POST['name'],$_POST['id']);
    echo json_encode($db->GetCategories());
}
if(isset($_GET['deleteCat']) && !empty($_POST['id'])){
    $db->DeleteCategory($_POST['id']);
    echo json_encode($db->GetCategories());
}
if(isset($_GET['updateSliderImages']) && !empty($_POST['images'])){
    foreach ($_POST['images'] as $image){
        $db->SetImageOptionSlider($image['id'], $image['slider']);
    }
}
if(isset($_GET['save'])){
    $id = null;
    if(!empty($_POST['id'])){
        if($db->UpdateArticle($_POST['id'], $_POST['title'], $_POST['message'], filter_var($_POST['frontpage'], FILTER_VALIDATE_BOOLEAN), $_POST['catid'])){
            $id = $_POST['id'];
        }
    }else{
        $id = $db->CreateArticle($_POST['catid'], $_POST['title'], $_POST['message'], filter_var($_POST['frontpage'], FILTER_VALIDATE_BOOLEAN));
    }
    if($id)echo json_encode($db->GetArticle($id));
}
if(isset($_GET['delete']) && !empty($_POST['id'])){
    $db->RemoveArticle($_POST['id']);
}
if(isset($_GET['upload']) && !empty($_FILES)){

    $phpFileUploadErrors = array(
        0 => 'There is no error, the file uploaded with success',
        1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
        2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
        3 => 'The uploaded file was only partially uploaded',
        4 => 'No file was uploaded',
        6 => 'Missing a temporary folder',
        7 => 'Failed to write file to disk.',
        8 => 'A PHP extension stopped the file upload.',
    );

    $return_data = [];

    foreach ($_FILES as $fileData) {
        $tempFile = $fileData['tmp_name'];
        $targetPath = rtrim($_SERVER['DOCUMENT_ROOT'], '/') . '/' . $conf['uploads_dir'];
        $targetFile = rtrim($targetPath, '/') . '/';
        $fileTypes = array('jpg', 'jpeg', 'gif', 'png'); // File extensions
        $fileParts = pathinfo($fileData['name']);

        if (!empty($fileData['error'])) {

            if (isset($phpFileUploadErrors[$fileData['error']]))
                $return_data['error'] = $fileData['name'].' Attēla augšuplādes neizdevās: "' . $phpFileUploadErrors[$fileData['error']] . '"';
            else
                $return_data['error'] = $fileData['name'].' Attēla augšuplādes neizdevās';

        } else if (in_array(strtolower($fileParts['extension']), $fileTypes)) {

            $return_data = [];

            $id = $db->CreateImage($_POST['articleId']);

            $gis = getimagesize($tempFile);
            $type = $gis[2];

            switch ($type) {
                case "1":
                    $imorig = imagecreatefromgif($tempFile);
                    break;
                case "2":
                    $imorig = imagecreatefromjpeg($tempFile);
                    break;
                case "3":
                    $imorig = imagecreatefrompng($tempFile);
                    break;
                default:
                    $imorig = imagecreatefromjpeg($tempFile);
            }
            $aw = imagesx($imorig);
            $ah = imagesy($imorig);

            $dstw = 182;
            $dsth = 124;

            $dstaspect = $dstw / $dsth;
            $aspect = $aw / $ah;

            $croppedw = $aw;
            $croppedh = $ah;

            $offsetx = 0;
            $offsety = 0;

            if ($dstaspect > $aspect) {
                $croppedw = $aw;
                $croppedh = $croppedw / $dstaspect;
                $offsety = ($ah - $croppedh) / 2;
            } else {
                $croppedh = $ah;
                $croppedw = $croppedh * $dstaspect;
                $offsetx = ($aw - $croppedw) / 2;
            }

            $imicon = imagecreatetruecolor($dstw, $dsth);

            //save icon image
            if (imagecopyresampled($imicon, $imorig, 0, 0, $offsetx, $offsety, $dstw, $dsth, $croppedw, $croppedh)) {
                if (!imagejpeg($imicon, $targetFile . $id . '_icon.jpeg')) {
                    @imagedestroy($imicon);
                    $return_data['error'] = $fileData['name'].' Failed to save icon image file!';
                }
            } else {
                @imagedestroy($imicon);
                $return_data['error'] = $fileData['name'].' Failed to copy resampled icon image!';
            }
            imagedestroy($imicon);

            $dstw = 800;
            $dsth = 450;

            $dstaspect = $dstw / $dsth;
            $aspect = $aw / $ah;

            $croppedw = $aw;
            $croppedh = $ah;

            $offsetx = 0;
            $offsety = 0;

            if ($aw < $dstw || $ah < $dsth) {
                $return_data['error'] = $fileData['name'].' Uploaded image is too small. Minumum required size is 800 x 600 px';
            }

            if ($dstaspect > $aspect) {
                $croppedw = $aw;
                $croppedh = $croppedw / $dstaspect;
                $offsety = ($ah - $croppedh) / 2;
            } else {
                $croppedh = $ah;
                $croppedw = $croppedh * $dstaspect;
                $offsetx = ($aw - $croppedw) / 2;
            }

            $im = imagecreatetruecolor($dstw, $dsth);

            $return_data['dbg'] = $targetFile . $id . '.jpeg';

            if (imagecopyresampled($im, $imorig, 0, 0, $offsetx, $offsety, $dstw, $dsth, $croppedw, $croppedh)) {
                if (imagejpeg($im, $targetFile . $id . '.jpeg')) {
                    $return_data['imageId'] = $id;
                } else {
                    @imagedestroy($im);
                    $return_data['error'] = $fileData['name'].' Failed to save image file!';
                }
            } else {
                @imagedestroy($im);
                $return_data['error'] = $fileData['name'].' Failed to copy resampled image!';
            }
            @imagedestroy($im);
        } else {
            $return_data['error'] = $fileData['name'].' Invalid file format. Supported file types are .jpg .jpeg .gif .png';
        }
    }
    echo json_encode($return_data);
}


