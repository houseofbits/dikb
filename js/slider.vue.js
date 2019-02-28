
Vue.component('slider', {
    props: ['images', 'title', 'description'],
    template:'#slider-template',
    data: function () {
        return {
            currentImage:0,
        }
    },
    methods:{
        next:function () {
            this.currentImage = this.currentImage + 1;
            if(this.currentImage == this.images.length)this.currentImage = 0;
        },
        prev:function () {
            this.currentImage = this.currentImage-1;
            if(this.currentImage < 0)this.currentImage = this.images.length - 1;
        },
        imageSrc:function (image) {
            return '/image/'+image.id;
        },

        beforeEnter: function (el) {
            el.style.opacity = 0
        },
        enter: function (el, done) {

            Velocity(el, { opacity: 1,
                // maxHeight: -el.offsetHeight
            }, { duration: 1000, complete: done })

            //console.log(getComputedStyle(el).height);
        },
        leave: function (el, done) {

            Velocity(el, { opacity: 0,
                //   maxHeight: -el.offsetHeight
            }, { duration: 1000, complete: done })
        }
    }
})