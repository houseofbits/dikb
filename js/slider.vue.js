
Vue.component('slider', {
    props: ['images', 'description', 'interval'],
    template:'#slider-template',
    data: function () {
        return {
            currentImage:0,
            timer:null,
            title:null,
            articleid:null,
        }
    },
    methods:{
        imageCount:function () {
            return Object.keys(this.images).length;
        },
        slide:function (index) {
            this.currentImage = index;
            this.restartSlideTimer();
        },
        open:function () {
            this.$parent.showArticleById(this.articleid);
        },
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
    watch:{
        'currentImage':function (val) {
            if(typeof this.images[val] != 'undefined'
                && typeof this.images[val].articleTitle != 'undefined'){
                this.title = this.images[val].articleTitle;
                this.articleid = this.images[val].articleid;
            }
        },
        'images':function(){
            if(typeof this.images[this.currentImage] != 'undefined'
                && typeof this.images[this.currentImage].articleTitle != 'undefined'){
                this.title = this.images[this.currentImage].articleTitle;
                this.articleid = this.images[this.currentImage].articleid;
            }
        }
    },
    mounted:function () {
        this.startSlideTimer();
    }
})