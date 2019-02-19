<!DOCTYPE html>
<html lang="en">
<head>
    <title>DIKB</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
    <!-- development version, includes helpful console warnings -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
</head>
<body class="bg-secondary">
<div id="mainApp" v-cloak>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#" v-on:click="newArticle()" data-toggle="modal" data-target="#articleModal">Izveidot rakstu</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#categoriesModal">Kategorijas</a>
            </li>
        </ul>
    </nav>

    <div class="m-3" v-if="selectedCategoryId">
        <a href="#" class="btn btn-danger" v-on:click="getArticles('')">
            {{articles[0].category}} <span class="badge badge-light">{{articles.length}}</span>
        </a>
    </div>
    <div class="m-3" v-cloak>
        <div class="card-columns">
            <div class="card" v-for="article in articles">
                <div class="card-body text-center">
                    <h4 class="card-title">{{article.title}}</h4>
                    <p class="card-text">{{article.message}}</p>
                    <span class="badge badge-secondary">{{article.category}}</span>
                    <hr>
                    <a href="#" v-on:click="getArticle(article.id)" data-toggle="modal" data-target="#articleModal" class="btn btn-primary">Labot</a>
                    <a href="#" v-on:click="articleData=article" data-toggle="modal" data-target="#deleteArticleModal" class="btn btn-danger">Dzēst</a>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="categoriesModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Kategorijas</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <button type="button" class="mb-3 btn btn-success" data-toggle="modal" data-target="#addCategoryModal">Izveidot jaunu kategoriju</button>
                    <div class="list-group">
                        <template v-for="cat in categories">
                            <a href="#" v-if="cat.numArticles>0" data-dismiss="modal" v-on:click="getArticles(cat.id)"
                               class="list-group-item list-group-item-action list-group-item-light  d-flex justify-content-between align-items-center">{{cat.title}}
                                <span class="badge badge-primary badge-pill">{{cat.numArticles}}</span>
                            </a>
                            <a href="#" v-else="" v-on:click="deleteCategoryObj=cat" data-toggle="modal" data-target="#deleteCategoryModal"
                               class="list-group-item list-group-item-action list-group-item-warning  d-flex justify-content-between align-items-center">{{cat.title}}
                                <span class="badge badge-danger badge-pill">Dzēst</span>
                            </a>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addCategoryModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Pievienot kategoriju</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="usr">Nosaukums:</label>
                        <input v-model="newCategoryName" type="text" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" v-on:click="addCategory(newCategoryName)" data-dismiss="modal">Pievienot</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteCategoryModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Dzēst kategoriju "{{deleteCategoryObj.title}}"?</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <button type="button" class="btn btn-success" v-on:click="deleteCategory(deleteCategoryObj.id)" data-dismiss="modal">Jā</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Nē</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="deleteArticleModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Dzēst rakstu "{{articleData.title}}"?</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <button type="button" class="btn btn-success" v-on:click="deleteArticle(articleData.id)" data-dismiss="modal">Jā</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Nē</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="articleModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 v-if="articleData.id" class="modal-title">Rediģēt rakstu</h4>
                    <h4 v-else="" class="modal-title">Jauns raksts</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="accordion">
                        <div class="card">
                            <div class="card-header">
                                <a class="card-link" data-toggle="collapse" href="#collapseMain">Pamatdati</a>
                            </div>
                            <div id="collapseMain" class="collapse show" data-parent="#accordion">
                                <div class="card-body bg-light">
                                    <div class="form-group">
                                        <label>Kategorija:</label>
                                        <select v-model="articleData.catid" name="cars" class="custom-select">
                                            <option v-for="cat in categories" :value="cat.id">{{cat.title}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Virsraksts:</label>
                                        <input v-model="articleData.title" type="text" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Saturs:</label>
                                        <textarea v-model="articleData.message" class="form-control" rows="5"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="switch1">
                                            <label class="custom-control-label" for="switch1">Rādīt galvenajā lapā</label>
                                        </div>
                                    </div>
                                    <button v-if="articleData.id" type="button" class="mt-3 btn btn-success" v-on:click="saveArticle()" data-dismiss="modal">Saglabāt un aizvērt</button>
                                    <button v-else="" type="button" class="mt-3 btn btn-success" v-on:click="saveArticle()">Saglabāt</button>
                                </div>
                            </div>
                        </div>

                        <div class="card" v-if="articleData.id">
                            <div class="card-header">
                                <a class="collapsed card-link" data-toggle="collapse" href="#collapseGallery">
                                    Galerija <span class="badge badge-primary badge-pill">{{articleData.images.length}}</span>
                                </a>
                            </div>
                            <div id="collapseGallery" class="collapse" data-parent="#accordion">
                                <div class="card-body bg-light">
                                    <div class="alert alert-danger alert-dismissible" v-if="imageError">
                                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                                        <strong>Kļūda!</strong> {{imageError}}
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="customFile" @change="onFileChange">
                                            <label class="custom-file-label" for="customFile">Pievienot attēlu</label>
                                        </div>
                                    </div>

                                    <div class="card-columns">
                                        <div class="card bg-success" v-for="image in articleData.images">
                                            <img class="card-img-top" :src="'/image/'+image.id+'/1'" alt="Image">
                                            <div class="card-img-overlay">
                                                <a href="#" class="btn btn-danger" v-on:click="deleteImage(image.id)">Dzēst</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</div>
<script src="main.vue.js"></script>
</body>
</html>