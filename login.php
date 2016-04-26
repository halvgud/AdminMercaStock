<!DOCTYPE html>
<html lang="en">
<head>
    <?php require_once('header-comun.html'); ?> 

</head>

<body>

    <div class="fluid-container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3><i class="fa fa-user"></i>Iniciar Sesión</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" id='loginForm' name='loginForm'>
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Usuario" name="usuario" id="usuario" type="usuario" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="contrasena" id="contrasena" type="password" value="">
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button type="submit" class="btn btn-lg btn-success btn-block"><i class="fa fa-sign-in"></i> Iniciar sesion</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php require_once('footer-comun.html'); ?>

    <script src="js/controlador/login.js">
    </script>

</body>

</html>
<?php  ?>

