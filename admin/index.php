<?php
    include("../../config.php");

    session_start();
    if(!empty($_POST)){
        if(!empty($_POST['username']) && !empty($_POST['password'])){
            if(md5($_POST['username']) == $conf['admin_user']
            &&
                md5($_POST['password']) == $conf['admin_password']){

                $_SESSION['userLogedIn'] = $_POST['username'];

                header('location: edit.php');
                exit;
            }
        }
    }
    unset($_SESSION['userLogedIn']);
?>
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
    <div id="login">
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12">
                        <form id="login-form" class="form" action="" method="post">
                            <div class="text-center text-info"><img src="../img/logo.png"></div>
                            <div class="form-group">
                                <label for="username" class="text-info">Lietotāja vārds:</label><br>
                                <input type="text" name="username" id="username" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Parole:</label><br>
                                <input type="password" name="password" id="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-info btn-md" value="Pieslēgties">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>