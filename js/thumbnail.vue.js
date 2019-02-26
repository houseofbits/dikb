
Vue.component('thumbnail', {
    props: ['article'],
    template:'#thumbnail-template',
    data: function () {
        return {}
    },
    computed:{
        imageSrc:function() {
            return '/image/'+this.article.imageID+'/1';
        },
        imageId:function () {
            return this.article.imageID;
        }
    },
    methods: {
        open:function () {
            this.$parent.showArticle(this.article);
        }
    }
})