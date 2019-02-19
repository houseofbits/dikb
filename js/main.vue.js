var app = new Vue({
    el: '#mainApp',
    data: {
        selectedPage:'main',
        data:{
            frontPageArticles:[],
        },
        loading:true,
    },
    methods: {

        loadMain:function () {
            this.selectedPage = 'main';
            this.getPageData();
        },
        loadContacts:function () {
            this.selectedPage = 'contacts';
        },
        loadPortfolio:function () {
            this.selectedPage = 'portfolio';
        },
        loadServices:function () {
            this.selectedPage = 'services';
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
        this.getPageData();
    }
});