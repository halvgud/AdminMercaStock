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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"ESTADISTICAS_VENTA")) {
        ?>

        <div id="wrapper">
            <?php require_once('../menu.php'); ?>
            <div id="page-wrapper">
                <br/>
                <h1>Estadísticas por Venta</h1>
                <hr>
            </div>

    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
