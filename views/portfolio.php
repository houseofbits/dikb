
<div class="content-block-wide" v-for="category in data.portfolioOverview">
    <div class="header-line mt-10">
        <div class="header">
            <a class="link-button">{{category.title}}</a>
        </div>
    </div>
    <div class="icons mt-10">
        <thumbnail v-for="(article, index) in category.articles" :article="article" :key="index"></thumbnail>
    </div>
</div>

