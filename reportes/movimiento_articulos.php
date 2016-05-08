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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"MOVIMIENTO_ARTICULOS")) {
        ?>
            <div id="page-wrapper">
                <br/>
                <h1>Movimiento de Artículos</h1>
                <hr>

            </div>
            <!-- /#page-wrapper -->
    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>