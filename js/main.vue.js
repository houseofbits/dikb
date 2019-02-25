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
    },
    methods: {
        showMain:function () {
            if(this.selectedPage == 'main')return;
            this.selectedPage = 'main';
            this.getPageData();
        },
        showPortfolio:function () {
            this.selectedPage = 'portfolio';
        },
        showArticle:function (article) {
            this.loading = true;
            this.selectedPage = 'article';
            this.selectedArticleData = article;
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
               // maxHeight: -el.offsetHeight
            }, { duration: 200, complete: done })

            //console.log(getComputedStyle(el).height);
        },
        leave: function (el, done) {

            Velocity(el, { opacity: 0.1,
             //   maxHeight: -el.offsetHeight
            }, { duration: 200, complete: done })
        }

    },
    mounted:function () {
        var parent = this;
        this.getPageData();
        this.showMain();
    }
});