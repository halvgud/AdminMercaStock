<?php session_start();
$path = "/ADMINMERCASTOCK";
if(!isset($_SESSION['idUsuario'])){
    //require_once('../index.php');
    header('Location: '.'../index.php');
}
else
{

    require_once "../data/PrivilegiosUsuario.php";
    $decoded = PrivilegiosUsuario::traerPrivilegios();
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"GENERAR_INVENTARIO")) {
        ?>
        <!DOCTYPE html>
        <html lang="en">

        <head>

            <?php require_once('../header-comun-carpeta.html'); ?>

        </head>

        <body>

        <div id="wrapper">
            <?php require_once('../menu.php'); ?>
            <div id="page-wrapper">
                <br/>
                <h1>Generar Inventario</h1>
                <hr>

            </div>
            <!-- /#page-wrapper -->
        </div>
        <!-- /#wrapper -->

        <?php require_once('../footer-comun-carpeta.html'); ?>
        <script type="text/javascript" src="../js/controlador/catalogo/permisos.js">

        </script>
        </body>

        </html>
    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
