<?php
include("../config.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>DIKB</title>
    <meta name="revisit-after" content="20 days" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="robots" content="no-index, no-follow" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
    <script type="text/javascript" src="<?=BASE_URL;?>/js/jquery.backgroundpos.min.js"></script>
    <link rel="stylesheet" href="<?=BASE_URL;?>/css/style.css" type="text/css" />
</head>
<body>
<div id="bg"><div></div></div>
<div id="mainApp" v-cloak>
    <div id="header">
        <img src="img/logo.png" width="122" height="131" v-on:click="showMain()"/>
        <p>Telefona nr. +371 29648203</p>
        <p>Epasts: dikb@dikb.lv</p>
        <ul id="main_menu">
            <li :class="{selected:(selectedPage=='contacts')}">Kontakti</li>
            <li :class="{selected:(selectedPage=='services')}">Pakalpojumi</li>
            <li v-on:click="showArticle" :class="{selected:(selectedPage=='article')}">Portfolio</li>
            <li v-on:click="showMain" :class="{selected:(selectedPage=='main')}">Sākums</li>
        </ul>
    </div>

    <div id="content">

        <?php include 'views/main.php'?>

        <?php include 'views/article.php'?>

    </div>
    <div id="footer">
        <p>SIA "DIZAINA UN INTERJERA KONSULTĀCIJU BIROJS"</p>
        <p>:: LV 40003396980</p>
        <p>:: Inčukalna nov., Inčukalna pag., Inčukalns, "Mākoņi", LV-2141</p>
        <p>:: Telefona nr. +371 29648203</p>
        <p>:: Epasts: dikb@dikb.lv</p>
    </div>

</div>
<script type="text/x-template" id="thumbnail-template">
    <div class="image_icon_container" v-on:click="open()">
        <div>
            <img :src="imageSrc">
            <div class="image_icon_container_overlay" style="opacity: 0;">
                <p data-categoryid="2" style="top: -30px;">TESTCAT2</p>
                <img src="img/cross.png" style="top: 150px;">
            </div>
        </div>
        <p>{{article.title}}</p>
    </div>
</script>
<script src="js/thumbnail.vue.js"></script>
<script src="js/main.vue.js"></script>
</body>
</html>