
Vue.component('slider', {
    props: ['images', 'title', 'description'],
    template:'#slider-template',
    data: function () {
        return {}
    },
    computed:{


    },
    methods: {
        imageSrc:function (image) {
            return '/image/'+image.id;
        }
    }
})