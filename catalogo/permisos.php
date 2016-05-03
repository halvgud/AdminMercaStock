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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {
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
            <h1>Editar Permisos</h1>
            <hr>
            <div class="sk-cube-grid" id="cover" style="display:none;">
                <div class="sk-cube sk-cube1"></div>
                <div class="sk-cube sk-cube2"></div>
                <div class="sk-cube sk-cube3"></div>
                <div class="sk-cube sk-cube4"></div>
                <div class="sk-cube sk-cube5"></div>
                <div class="sk-cube sk-cube6"></div>
                <div class="sk-cube sk-cube7"></div>
                <div class="sk-cube sk-cube8"></div>
                <div class="sk-cube sk-cube9"></div>
                <div><h3>Cargando...</h3></div>
            </div>
            <table id="resultados" class="table table-striped table-bordered" style="display:none;">
                <thead>
                <tr>
                    <th class="text-center">ROL</th>
                    <th colspan="2" class="text-center">Edicion</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
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
