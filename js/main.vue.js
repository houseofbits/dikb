var app = new Vue({
    el: '#mainApp',
    data: {
        show:true,
        selectedPage:null,
        selectedArticleData:null,
        data:{
            frontPageArticles:[],
            portfolioOverview:[],
            fullCategories:[],
            sliderImages:[],
        },
        loading:true,
    },
    computed:{
        isMain:function() {
            return this.selectedPage == 'main';
        },
        isArticle:function() {
            return this.selectedPage == 'article';
        },
        isPortfolio:function() {
            return this.selectedPage == 'portfolio';
        },
        isContacts:function() {
            return this.selectedPage == 'contacts';
        },
    },
    methods: {
        getCategoryArticles:function () {
            for(i in this.data.fullCategories){
                if(this.data.fullCategories[i].id == this.selectedArticleData.catid)return this.data.fullCategories[i].articles;
            }
            return false;
        },
        showMain:function () {
            if(this.selectedPage == 'main')return;
            this.selectedPage = 'main';
            this.getPageData();
        },
        showPortfolio:function () {
            this.selectedPage = 'portfolio';
        },
        showContacts:function () {
            this.selectedPage = 'contacts';
        },
        showArticle:function (article) {
            this.loading = true;
            this.selectedPage = 'article';
            this.selectedArticleData = article;
        },
        showArticleById:function (articleid) {
            for(i in this.data.fullCategories){
                for(a in this.data.fullCategories[i].articles){
                    if(articleid == this.data.fullCategories[i].articles[a].id){
                        this.showArticle(this.data.fullCategories[i].articles[a]);
                        return;
                    }
                }
            }

        },
        getPageData:function () {
            this.loading = true;
            this.$http.get('api.php').then(function(response) {
                this.data = response.body;
                this.loading = false;
            }, function(){});
        },

        beforeEnter: function (el) {
            el.style.opacity = 0.1
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1,
            }, { duration: 200, complete: done })
        },
        leave: function (el, done) {
            Velocity(el, { opacity: 0.1,
            }, { duration: 200, complete: done })
        },

        footerBeforeEnter: function (el) {
            el.style.opacity = 0.1;
        },
        footerEnter: function (el, done) {
            Velocity(el, { opacity: 1,//translateY:0,
            }, { duration: 500, complete: done })
        },
        footerLeave: function (el, done) {
            Velocity(el, { opacity: 0.1,//translateY:-200,
            }, { duration: 500, complete: done })
        }



    },
    mounted:function () {
        this.showMain();
    }
});