
<transition name="fade"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"

            v-on:before-leave="beforeLeave"
            v-on:leave="leave"
            v-on:after-leave="afterLeave">

    <div v-if="isArticle" class="active_content">
        <div class="icons">
            <div class="hline"><a href="">Realizētie projekti</a></div>
            <div class="icon_wrap">
                <thumbnail v-for="(article, index) in data.frontPageArticles" :article="article" :key="index"></thumbnail>
            </div>
        </div>
        <div class="icons">
            <div class="hline"><a href="">Realizētie projekti</a></div>
            <div class="icon_wrap">
                <thumbnail v-for="(article, index) in data.frontPageArticles" :article="article" :key="index"></thumbnail>
            </div>
        </div>
    </div>

</transition>
