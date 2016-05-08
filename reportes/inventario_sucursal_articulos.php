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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"INVENTARIO_SUCURSAL_ARTICULOS")) {
        ?>
            <div id="page-wrapper">
                <br/>
                <h1>Inventario por Sucursal y Artículos</h1>
                <hr>

            </div>
            <!-- /#page-wrapper -->
    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>