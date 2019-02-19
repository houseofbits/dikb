var app = new Vue({
    el: '#mainApp',
    data: {
        selectedPage:'main',
        selectedArticle:null,
        data:{
            frontPageArticles:[],
        },
        loading:true,
    },
    computed:{
        isMain:function() {
            return this.selectedPage == 'main';
        }
    },
    methods: {
        showMain:function () {
            this.selectedPage = 'main';
            this.getPageData();
        },
        showArticle:function (id) {
            this.loading = true;
            this.selectedPage = 'article';
            this.selectedArticle = id;
            this.getPageData();
        },
        getPageData:function () {
            this.loading = true;
            this.$http.get('api.php').then(function(response) {
                this.data = response.body;
                this.loading = false;
            }, function(){});
        }
    },
    mounted:function () {
        var parent = this;
        this.showMain();
    }
});