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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"CATEGORIA")) {
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
                <h1>Categorias</h1>
                <hr>
                <input type="text" id="oculto">
                <form class="form-inline" id="categoria" method="post">
                    <label for="sucursal">Filtrar por Sucursal: </label>
                    <select id="sucursal" name="sucursal" class="form-control" style="width: 25%;" onchange="buscarDepartamento();" required>
                        <option value="">Seleccione una Sucursal</option>
                    </select>&nbsp;&nbsp;&nbsp;
                    <label  class="form-inline" id="lDepartamento" style="">Filtrar por Departamento</label>
                    <select id="departamento" name="departamento" class="form-control" style="width: 25%;" >
                        <option value="">Seleccione un Departamento</option>
                    </select>&nbsp;&nbsp;&nbsp;
                    <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-search"></i> Buscar</button>
                </form>
                </br></br>
                <table id="resultadosCategoria" class="table table-condensed" style="display:none; " align="center">
                    <thead>
                    <tr>
                        <th class="text-center">ID CATEGORIA</th>
                        <th class="text-center">ID LOCAL</th>
                        <th class="text-center">ID SUCURSAL</th>
                        <th class="text-center">NOMBRE</th>
                        <th class="text-center">ID DEPARTAMENTO</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <!-- /#wrapper -->

            <?php require_once('../footer-comun-carpeta.html'); ?>
            <script type="text/javascript" src="../js/controlador/catalogo/permisos.js"></script>
            <script type="text/javascript" src="../js/controlador/catalogo/categoria.js"></script>
        </body>

        </html>
    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
