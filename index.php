<<<<<<< HEAD
<?php session_start(); 
if(!isset($_SESSION['idUsuario'])){
=======
<?php session_start();
 $path = "";
if(!isset($_SESSION['id_usuario'])){
>>>>>>> origin/master
   require_once('login.php');  
}
else
{
  ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php require_once($path.'/header-comun.html'); ?> 
    

</head>

<body>

    <div id="wrapper">
    <?php require_once($path.'/menu.php'); ?> 
        <div id="page-wrapper">
            <div class="jumbotron text-center">
              <h1>Bienvenido!</h1>
              <p></p>
              <p><img src="img/sysco-inicio.png" class="img-responsive" alt="Responsive image"></p>
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <?php require_once('/footer-comun.html'); ?> 

</body>

</html>
<?php } ?>
