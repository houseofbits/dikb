
Vue.component('preload-image', {
    props: ['id', 'thumbnail'],
    template:'#preload-image-template',
    data: function () {
        return {
            imageSrc:'',
            loaded:false,
        }
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0.1
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1,
            }, { duration: 300, complete: done })
        },
        leave: function (el, done) {
            Velocity(el, { opacity: 0.1,
            }, { duration: 300, complete: done })
        },
        imageSource:function () {
            var thumb = '';
            if(this.thumbnail)thumb = '/1';
            return '/image/' + this.id + thumb;
        }
    },
    mounted:function () {
        var parent = this;
        const img = new Image();
        img.onload = function(){
            parent.imageSrc = this.src;
            parent.loaded = true;
        };
        img.src = this.imageSource();
    }
})