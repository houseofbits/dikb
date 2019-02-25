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
    <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script-->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
    <!--script type="text/javascript" src="<?=BASE_URL;?>/js/jquery.backgroundpos.min.js"></script-->

    <link rel="stylesheet" href="<?=BASE_URL;?>/css/style.css" type="text/css" />
</head>
<body>
<div id="bg"></div>
<div id="mainApp" v-cloak>
    <div id="header">
        <img src="img/logo.png" width="122" height="131" v-on:click="showMain()"/>
        <ul id="main_menu">
            <li :class="{selected:(selectedPage=='contacts')}">Kontakti</li>
            <!--li :class="{selected:(selectedPage=='services')}">Pakalpojumi</li-->
            <li v-on:click="showPortfolio" :class="{selected:(selectedPage=='portfolio'||selectedPage=='article')}">Portfolio</li>
            <li v-on:click="showMain" :class="{selected:(selectedPage=='main')}">Sākums</li>
        </ul>
    </div>

    <div id="content">


        <transition name="fade"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave"
                    v-bind:css="false"
                    mode="out-in">

            <div v-if="isMain" class="content-block" key="main">

                <?php include 'views/main.php'?>

            </div>
            <div v-else-if="isArticle" class="content-block" key="article">

                <?php include 'views/article.php'?>

            </div>
            <div v-else-if="isPortfolio" class="content-block" key="portfolio">

                <?php include 'views/portfolio.php'?>

            </div>
        </transition>








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
    <div class="icon-container cursor-pointer" v-on:click="open()">
        <img :src="imageSrc">
        <p class="link-button">{{article.title}}</p>
    </div>
</script>
<script type="text/x-template" id="slider-template">
    <div class="slider">
        <div v-if="title" class="slider-title">{{title}}</div>
        <ul class="dots">
            <li class="arrow l"></li>
            <li class="arrow r"></li>
        </ul>
        <div id="slide-container">
            <img v-for="image in images" :src="imageSrc(image)">
        </div>
    </div>
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script src="js/thumbnail.vue.js"></script>
<script src="js/slider.vue.js"></script>
<script src="js/main.vue.js"></script>
</body>
</html>