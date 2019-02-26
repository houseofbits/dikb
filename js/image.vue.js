
Vue.component('preload-image', {
    props: ['id', 'thumbnail'],
    template:'<img :src="imageSrc">',
    data: function () {
        return {
            imageSrc:'',
        }
    },
    computed:{


    },
    methods: {
        imageSource:function () {
            var thumb = '';
            if(this.thumbnail)thumb = '/1';
            return '/image/' + this.id + thumb;
        }
    },
    mounted:function () {
        this.imageSrc = this.imageSource();
    }
})