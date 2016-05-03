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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"DEPARTAMENTO")) {
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
                <h1>Departamentos</h1>
                <hr>
                <!--<form id="seleccionarDepartamento">
                </form>-->
                <table id="resultadosDepartamento" class="table table-condensed" style="display:none; " align="center">
                    <thead>
                    <tr>
                        <th class="text-center">ID DEPARTAMENTO</th>
                        <th class="text-center">NOMBRE</th>
                        <th class="text-center" colspan="2">EDICION</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <!-- /#page-wrapper -->
            </div>
            <!-- /#wrapper -->

            <?php require_once('../footer-comun-carpeta.html'); ?>
            <script type="text/javascript" src="../js/controlador/catalogo/permisos.js"></script>
            <script type="text/javascript" src="../js/controlador/catalogo/departamento.js"></script>
        </body>

        </html>
    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
