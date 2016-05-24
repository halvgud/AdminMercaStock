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
       header('Authorization:07f896862ab333e70ef66e4d57c1c3b2');


   
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
    var seguridad=false;
    function cambiarUrl(pagina,bandera,seguridad1){
        if(seguridad==false) {
            mostrarDialogo(pagina,bandera);
        }else {
            BootstrapDialog.confirm({
                title: 'Advertencia',
                message: 'Esta apunto de salir, se perderán los cambios. \n \n ¿Desea Continuar?',
                size: BootstrapDialog.SIZE_LARGE,
                type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                closable: false, // <-- Default value is false
                draggable: true, // <-- Default value is false
                btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
                btnOKLabel: 'Continuar', // <-- Default value is 'OK',
                btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
                callback: function(result) {
                    // result will be true if button was click, while it will be false if users close the dialog directly.
                    if(result) {
                        mostrarDialogo(pagina,bandera);
                        seguridad=false;
                    }else {

                    }
                }
            });

        }
        seguridad = seguridad1!=undefined?seguridad1:false;
    }
        function mostrarDialogo(pagina,bandera){
            mostrarDialogoDeEspera("Cargando página");
            $.get("<?php echo $path;?>" + pagina, function (data) {
                history.pushState("", document.title, window.location.pathname);
                $("#page-wrapper").replaceWith(data);
                if (bandera == undefined) {
                    BootstrapDialog.closeAll();
                }
                console.log('entro');
            });
            seguridad=true;
        }
    </script>
</body>


</html>
<?php } ?>