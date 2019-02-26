var app = new Vue({
    el: '#mainApp',
    data: {
        articles:[],
        categories:[],
        allImages:[],
        allArticles:[],
        selectedCategoryId:'',
        editCategoryObj:'',
        newCategoryName:'',
        articleData:{
            id:0,
            catid:null,
            title:null,
            message:null,
            images:[],
        },
        imageError:null,
        sliderModalSelectedCategory:0,
        sliderModalSelectedArticle:0,
        sliderModalSelectedImages:0,
    },
    computed:{
        sliderModalSelectedArticles:function () {
            if(this.sliderModalSelectedCategory != 0){
                var art = [];
                for(i in this.allArticles){
                    if(this.allArticles[i].catid == this.sliderModalSelectedCategory){
                        art.push(this.allArticles[i]);
                    }
                }
                return art;
            }
            return this.allArticles;
        },
        sliderModalFilteredImages:function () {
            if(this.sliderModalSelectedImages){
                var images = [];
                for(i in this.allImages){
                    if(this.allImages[i].slider > 0){
                        images.push(this.allImages[i]);
                    }
                }
                return images;
            }else if(this.sliderModalSelectedCategory!=0 || this.sliderModalSelectedArticle!=0){
                var images = [];
                for(i in this.allImages){
                    if(this.sliderModalSelectedArticle != 0
                        && this.allImages[i].articleid == this.sliderModalSelectedArticle){
                        images.push(this.allImages[i]);
                    }else if(this.sliderModalSelectedArticle == 0
                        && this.sliderModalSelectedCategory != 0
                        && this.allImages[i].catId == this.sliderModalSelectedCategory){
                        images.push(this.allImages[i]);
                    }
                }
                return images;
            }
            return this.allImages;
        }
    },
    methods: {
        selectSliderImage:function(imageId){
            for(var i=0; i<this.allImages.length; i++){
                if(this.allImages[i].id == imageId){
                    if(this.allImages[i].slider > 0){
                        this.allImages[i].slider = 0;
                    }else{
                        this.allImages[i].slider = 1000;
                    }
                    this.renumberSliderImages();
                    return;
                }
            }
        },
        renumberSliderImages:function () {
            var idsToNum = [];
            for(var i=0; i<this.allImages.length; i++) {
                if (this.allImages[i].slider > 0) {
                    idsToNum.push(this.allImages[i]);
                }
            }
            idsToNum.sort(function (a,b) {
                return a.slider - b.slider;
            });
            for(i=0; i<idsToNum.length; i++){
                idsToNum[i].slider = (i+1);
            }
        },
        deleteImage:function (imageId) {
            var formData = new FormData();
            formData.append('imageId', imageId);
            formData.append('articleId', this.articleData.id);
            this.$http.post('api.php?deleteImage',formData).then(function(response) {
                this.articleData.images = response.body;
            }, function(){});
        },
        getImages:function (articleId) {
            this.$http.get('api.php?images='+articleId).then(function(response) {
                this.articleData.images = response.body;
            }, function(){});
        },
        onFileChange:function(e) {
            this.imageError = null;
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            var formData = new FormData();
            formData.append('articleId', this.articleData.id);
            for(var i=0; i<files.length; i++){
                formData.append('fileData'+i, files[i]);
            }
//            formData.append('fileData', files[0]);
            this.$http.post('api.php?upload',formData).then(function(response) {
                if(typeof response.body.imageId != 'undefined'){
                    this.getImages(this.articleData.id);
                }
                if(typeof response.body.error != 'undefined'){
                    this.imageError = response.body.error;
                }
            }, function(){});
        },
        deleteArticle:function (id) {
            var formData = new FormData();
            formData.append('id', this.articleData.id);
            this.$http.post('api.php?delete',formData).then(function(response) {
                this.getArticles(this.selectedCategoryId);
            }, function(){});
        },
        saveArticle:function () {
            var formData = new FormData();
            formData.append('id', this.articleData.id);
            formData.append('catid', this.articleData.catid);
            formData.append('title', this.articleData.title);
            formData.append('message', this.articleData.message);
            this.$http.post('api.php?save',formData).then(function(response) {
                this.articleData = response.body;
                this.getArticles(this.selectedCategoryId);
            }, function(){});
        },
        newArticle:function () {
            this.imageError = null;
            this.articleData = {
                id:0,
                catid:null,
                title:null,
                message:null,
                images:[],
            };
        },
        getArticle: function (id) {
            this.imageError = null;
            this.$http.get('api.php?article='+id).then(function(response) {
                this.articleData = response.body;
            }, function(){});
        },
        getArticles: function (category) {
            this.selectedCategoryId = category;
            this.$http.get('api.php?articles='+this.selectedCategoryId).then(function(response) {
                this.articles = response.body;
            }, function(){});
        },
        getAllArticles: function () {
            this.selectedCategoryId = '';
            this.$http.get('api.php?articles='+this.selectedCategoryId).then(function(response) {
                this.allArticles = response.body;
                this.articles = this.allArticles;
            }, function(){});
        },
        getCategories: function () {
            this.$http.get('api.php?categories').then(function(response) {
                this.categories = response.body;
            }, function(){});
        },
        getAllImages:function () {
            this.$http.get('api.php?allImages').then(function(response) {
                this.allImages = response.body;
            }, function(){});
        },
        addCategory:function (name) {
            var formData = new FormData();
            formData.append('name', name);
            this.$http.post('api.php?addCat',formData).then(function(response) {
                this.categories = response.body;
            }, function(){});
        },
        deleteCategory:function (id) {
            var formData = new FormData();
            formData.append('id', id);
            this.$http.post('api.php?deleteCat',formData).then(function(response) {
                this.categories = response.body;
            }, function(){});
        },
        updateCategory:function () {
            var formData = new FormData();
            formData.append('id', this.editCategoryObj.id);
            formData.append('name', this.editCategoryObj.title);
            if(this.editCategoryObj){
                this.$http.post('api.php?renameCat',formData).then(function(response) {
                    this.categories = response.body;
                }, function(){});
            }
        },
        updateSliderImages:function () {
            var formData = new FormData();
            for(var i=0;i<this.allImages.length; i++){
                formData.append("images["+i+"][id]",this.allImages[i].id );
                formData.append("images["+i+"][slider]",this.allImages[i].slider);
            }
            this.$http.post('api.php?updateSliderImages', formData).then(function(response) {
            }, function(){});
        },
        articleImageSrc:function (article) {
            if(typeof article.images != 'undefined'
                && typeof article.images[0] != 'undefined'){
                return '/image/' + article.images[0].id + '';
            }
            return false;
        }
    },
    watch:{
        'sliderModalSelectedCategory':function () {
            this.sliderModalSelectedArticle = 0;
        },
    },
    mounted:function () {
        var parent = this;
        $('#articleModal').on('show.bs.modal',function () {
            parent.getCategories();
        });
        $('#articleModal').on('shown.bs.modal',function () {
            if(parent.articleData.id > 0){
                $('#collapseGallery').collapse("show");
                $('#collapseMain').collapse("hide");
            }else{
                $('#collapseMain').collapse("show");
                $('#collapseGallery').collapse("hide");
            }
        });
        $('#categoriesModal').on('show.bs.modal',function () {
            parent.getCategories();
        });
        $('#sliderImagesModal').on('show.bs.modal',function () {
            parent.getAllImages();
        });
        $('#addCategorieModal').on('show.bs.modal',function () {
            parent.newCategoryName = '';
        });
        this.getAllArticles();
        this.getCategories();
    }
})