
Vue.component('preload-image', {
    props: ['imageid', 'thumbnail'],
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
            return '/image/' + this.imageid + thumb;
        }
    },
    mounted:function () {
        const img = new Image();
        img.parentComponent = this;
        img.onload = function(){
            //console.log(this.parentComponent.imageid + ' / ' + this.src);
            this.parentComponent.imageSrc = this.src;
            this.parentComponent.loaded = true;
        };
        img.src = this.imageSource();
        //console.log(img.parentComponent.imageid + ' // ' + img.src);
    }
})