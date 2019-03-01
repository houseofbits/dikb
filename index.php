<?php
include("../config.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dizaina un interjera konsultāciju birojs</title>
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
<div id="bg1"></div>
<div id="bg"></div>
<div id="mainApp" v-cloak>
    <div id="header">
        <img src="img/logo.png" width="122" height="131" v-on:click="showMain()"/>
        <ul id="main_menu">
            <li v-on:click="showContacts" :class="{selected:(selectedPage=='contacts')}">Kontakti</li>
            <!--li :class="{selected:(selectedPage=='services')}">Pakalpojumi</li-->
            <li v-on:click="showPortfolio" :class="{selected:(selectedPage=='portfolio'||selectedPage=='article')}">Portfolio</li>
            <li v-on:click="showMain" :class="{selected:(selectedPage=='main')}">Sākums</li>
        </ul>
    </div>

    <div id="content" v-cloak>

        <transition v-on:before-enter="beforeEnter"
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
            <div v-else-if="isContacts" class="content-block" key="contacts">
                <?php include 'views/contacts.php'?>
            </div>
        </transition>

    </div>

    <transition v-on:before-enter="footerBeforeEnter"
                v-on:enter="footerEnter"
                v-on:leave="footerLeave"
                v-bind:css="false"
                mode="out-in">
        <div id="footer" v-if="!isContacts">
            <p>SIA "DIZAINA UN INTERJERA KONSULTĀCIJU BIROJS"</p>
            <p><img src="img/licence.svg" class="footerIcon"> LV 40003396980</p>
            <p><img src="img/home-address.svg" class="footerIcon"> Inčukalna nov., Inčukalna pag., Inčukalns, "Mākoņi", LV-2141</p>
            <p><img src="img/phone.svg" class="footerIcon"> +371 67223854</p>
            <p><img src="img/secured-letter.svg" class="footerIcon"> info@dizainsuninterjers.lv</p>
        </div>
    </transition>

</div>
<script type="text/x-template" id="preload-image-template">
    <div class="preload-image">
        <transition name="fade"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave"
                    v-bind:css="false"
                    mode="out-in">

            <img v-if="loaded" :src="imageSrc">
        </transition>
    </div>
</script>
<script type="text/x-template" id="thumbnail-template">
    <div class="icon-container cursor-pointer" v-on:click="open()">
        <div class="icon-image-wrap">
            <preload-image :imageid="imageId" thumbnail="1"></preload-image>
        </div>
        <p class="link-button">{{article.title}}</p>
    </div>
</script>
<script type="text/x-template" id="slider-template">
    <div class="slider">
        <div v-if="title" class="slider-title" v-on:click="open()">{{title}}</div>
        <ul class="dots">
            <li v-if="imageCount() > 1" v-for="(image, index) in images" :class="{'selected':index==currentImage}" v-on:click="slide(index)"></li>
            <li v-if="imageCount() > 1" class="arrow l" v-on:click="prev()"></li>
            <li v-if="imageCount() > 1" class="arrow r" v-on:click="next()"></li>
        </ul>
        <div class="slide-container">
            <transition-group name="fadeLeft"
                              v-on:before-enter="beforeEnter"
                              v-on:enter="enter"
                              v-on:leave="leave"
                              v-bind:css="false"
                              mode="out-in">
                <preload-image v-for="(image, index) in images" v-if="index==currentImage" :key="image.id" :imageid="image.id"></preload-image>
            </transition-group>
        </div>
    </div>
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script src="js/image.vue.js"></script>
<script src="js/thumbnail.vue.js"></script>
<script src="js/slider.vue.js"></script>
<script src="js/main.vue.js"></script>
</body>
</html>