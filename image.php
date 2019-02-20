<?php
include("../config.php");

if(!empty($_GET['i']) && is_numeric($_GET['i'])){
    $filePath = rtrim($conf['uploads_dir'], '/') . '/' . intval($_GET['i']);
    if(!empty($_GET['t']) && $_GET['t'] == 1){
        $filePath .= '_icon';
    }
    $filePath .= '.jpeg';
    if(file_exists($filePath)){
        header('Content-type: image/jpeg');
        readfile($filePath);
        exit;
    }
}
