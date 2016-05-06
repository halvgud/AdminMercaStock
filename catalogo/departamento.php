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
                <form class="form-inline" id="departamento" method="post">
                    <label for="sucursal">Filtrar por Sucursal: </label>
                    <select id="sucursal" name="sucursal" class="form-control" style="width: 25%;" required>
                        <option value="">Seleccione una Sucursal</option>
                    </select>
                    <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-search"></i> Buscar</button>
                </form>
                </br></br>
                <!--<form id="seleccionarDepartamento">
                </form>-->
                <table id="resultadosSucursal" class="table table-condensed" style="display:none; " align="center">
                    <thead>
                    <tr>
                        <th class="text-center">ID DEPARTAMENTO</th>
                        <th class="text-center">ID LOCAL</th>
                        <th class="text-center">ID SUCURSAL</th>
                        <th class="text-center">NOMBRE</th>
                        <th class="text-center">RESTRINGIDO</th>
                        <th class="text-center">PORCENTAJE</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <!-- /#page-wrapper -->
            </div>
            <!-- /#wrapper -->

            <?php require_once('../footer-comun-carpeta.html'); ?>
            <script type="text/javascript" src="../js/controlador/catalogo/departamento.js"></script>
        </body>

        </html>
    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
