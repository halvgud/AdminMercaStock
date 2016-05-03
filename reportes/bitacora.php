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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"BITACORA")) {
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
                <h1>Bit&aacute;cora</h1>
                <form class="form-inline" id="fecha">
                    <div class="form-group">
                        <label>Fecha de Inicio</label>
                        <input type="text" id="hora_inicio" name="hora_inicio" class="form-control" size="20" readonly/>
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;Fecha Final</label>
                        <input type="text" id="hora_fin" name="hora_fin" class="form-control" size="20" readonly/>
                    </div>
                    <label>&nbsp;&nbsp;&nbsp;</label>
                    <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-search"></i> Buscar</button>
                </form>
                <table id="test" class="table table-condensed">
                </table>
            </div>
            <!-- /#wrapper -->

            <?php require_once('../footer-comun-carpeta.html'); ?>
            <script type="text/javascript" src="../js/controlador/reportes/bitacora.js" ></script>
        </body>

        </html>
    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>