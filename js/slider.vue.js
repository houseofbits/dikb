
Vue.component('slider', {
    props: ['images', 'title', 'description', 'interval'],
    template:'#slider-template',
    data: function () {
        return {
            currentImage:0,
            timer:null,
        }
    },
    methods:{
        next:function () {
            this.currentImage = this.currentImage + 1;
            if(this.currentImage == this.images.length)this.currentImage = 0;
            this.restartSlideTimer();
        },
        prev:function () {
            this.currentImage = this.currentImage-1;
            if(this.currentImage < 0)this.currentImage = this.images.length - 1;
            this.restartSlideTimer();
        },
        imageSrc:function (image) {
            return '/image/'+image.id;
        },
        startSlideTimer:function () {
            clearInterval(this.timer);
            if(this.interval > 0)this.timer = setInterval(this.next, this.interval);
        },
        restartSlideTimer:function () {
            clearInterval(this.timer);
            this.timer = setInterval(this.startSlideTimer, this.interval);
        },

        beforeEnter: function (el) {
            el.style.opacity = 0
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1
                // maxHeight: -el.offsetHeight
            }, { duration: 700, complete: done })
        },
        leave: function (el, done) {
            Velocity(el, { opacity: 0
                //   maxHeight: -el.offsetHeight
            }, { duration: 700, complete: done })
        }
    },
    mounted:function () {
        this.startSlideTimer();
    }
})