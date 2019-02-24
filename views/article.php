
<div class="content-block-wide">
    <div class="header-line mt-10">
        <div class="header">
            <a class="link-button">{{selectedArticleData.category}}</a>
            <a> / </a>
            <a class="link-button">{{selectedArticleData.title}}</a>
        </div>
    </div>
    <div class="article-slider mt-10">

        <slider :images="selectedArticleData.images"></slider>

    </div>

    <div class="article-description mt-10">
        {{selectedArticleData.message}}
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
