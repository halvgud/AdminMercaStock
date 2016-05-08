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
            <div id="page-wrapper">
                <br/>
                <h1>Generar Inventario</h1>
                <hr>

            </div>

    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
