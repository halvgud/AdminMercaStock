<?php
   if (session_status() == PHP_SESSION_NONE) {
      session_start();
   }
   $path = "";
   if(!isset($_SESSION['idUsuario'])){        
      if (strpos( $_SERVER['HTTP_USER_AGENT'],'Trident')){
         //echo 'no valido';
          require_once('login.php');
      }
      else{
        // echo $_SERVER['HTTP_USER_AGENT'];
         require_once('login.php');
      }
   }
   else{
       header('Authorization: 07f896862ab333e70ef66e4d57c1c3b2');
   
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php require_once($path.'/header-comun.html'); ?>
    <?php require_once('/footer-comun.html'); ?>

</head>

<body>

    <div id="wrapper">
    <?php require_once($path.'/menu.php'); ?> 
        <div id="page-wrapper">
            <div class="jumbotron text-center">
              <h1>Bienvenido!</h1>
              <p></p>
             <!-- <p><img src="img/mstockicon.png" class="img-responsive" alt="Responsive image"></p>-->
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->


    <script>
    function cambiarUrl(pagina,bandera){
        mostrarDialogoDeEspera("Cargando página");
    $.get("<?php echo $path;?>"+pagina, function(data) {

    $("#page-wrapper").replaceWith(data);
        if(bandera==undefined){
            BootstrapDialog.closeAll();
        }
        console.log('entro');
    });
    }
    </script>
</body>


</html>
<?php } ?>