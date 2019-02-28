
<div id="intro">

    <div class="intro-slider mt-18">
        <slider title="Interjera noformējums" :images="data.sliderImages" interval="6000"></slider>
    </div>

    <div class="intro-text-block mt-18">
        <div class="intro-title">Dizaina un Interjera Konsultāciju<br /> Birojs</div>
        <div class="intro-description mt-10">
            Arhitektūras pakalpojumi<br>
            Specializētie projektēšanas darbi<br>
            Interjera dizains<br>
            Mēbeļu projektēšana<br>
            Muzeju ekspozīcijas<br>
        </div>
    </div>
</div>

<div class="content-block-wide">
    <div class="header-line mt-10">
        <div class="header">
            <a class="link-button">Realizētie projekti</a>
        </div>
    </div>
    <div class="icons mt-10">
        <thumbnail v-for="(article, index) in data.frontPageArticles" :article="article" :key="index"></thumbnail>
    </div>
</div>

