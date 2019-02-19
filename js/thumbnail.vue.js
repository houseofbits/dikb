
Vue.component('thumbnail', {
    props: ['imageid', 'title'],
    template:'#thumbnail-template',
    data: function () {
        return {
            count: 0
        }
    },
    computed:{
        imageSrc:function() {
            return '/image/'+this.imageid+'/1';
        }
    }
})