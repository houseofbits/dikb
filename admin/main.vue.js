var app = new Vue({
    el: '#mainApp',
    data: {
        articles:[],
        categories:[],
        selectedCategoryId:'',
        deleteCategoryObj:'',
        newCategoryName:'',
        articleData:{
            id:0,
            catid:null,
            title:null,
            message:null,
            images:[],
        },
        imageError:null,
    },
    methods: {
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
            formData.append('fileData', files[0]);
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
        getCategories: function () {
            this.$http.get('api.php?categories').then(function(response) {
                this.categories = response.body;
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
        $('#addCategorieModal').on('show.bs.modal',function () {
            parent.newCategoryName = '';
        });
        this.getArticles('');
    }
})