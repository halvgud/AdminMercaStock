<?php session_start();
$path = "/ADMINMERCASTOCK";
if(!isset($_SESSION['idUsuario'])){
    //require_once('../index.php');
    header('Location: '.'../index.php');
}
else
{
        ?>
            <div id="page-wrapper">
                <br/>
                <h1>Estadísticas por Venta</h1>
                <hr>
            </div>

    <?php
} ?>
