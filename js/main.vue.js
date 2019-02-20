var app = new Vue({
    el: '#mainApp',
    data: {
        show:true,

        selectedPage:null,
        selectedArticle:null,
        data:{
            frontPageArticles:[],
        },
        loading:true,
    },
    computed:{
        isMain:function() {
            return this.selectedPage == 'main';
        },
        isArticle:function() {
            return this.selectedPage == 'article';
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
        },


        // --------
        // ENTERING
        // --------

        beforeEnter: function (el) {
         //   console.log('before enter');
        },
        // the done callback is optional when
        // used in combination with CSS
        enter: function (el, done) {
        //    console.log('enter');
         //   console.log(el);
            //done();
        },
        afterEnter: function (el) {
         //   console.log('after enter');
        },
        enterCancelled: function (el) {
        //    console.log('enter cancelled');
        },

        // --------
        // LEAVING
        // --------

        beforeLeave: function (el) {
        //    console.log('before leave');
        },
        // the done callback is optional when
        // used in combination with CSS
        leave: function (el, done) {
         //   console.log('leave');
            //done();
        },
        afterLeave: function (el) {
         //   console.log('after enter');
        },
        // leaveCancelled only available with v-show
        leaveCancelled: function (el) {
        //    console.log('leave cancelled');
        }

    },
    mounted:function () {
        var parent = this;
        this.showMain();
    }
});