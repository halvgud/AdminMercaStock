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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"PARAMETROS")) {
        ?>
            <div id="page-wrapper">
                <br/>
                <h1>Parametros</h1>
                <hr>
            </div>
            <!-- /#page-wrapper -->

        <!-- /#wrapper -->



    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
