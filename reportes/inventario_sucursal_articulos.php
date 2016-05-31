<?php session_start();
$path = "/ADMINMERCASTOCK";

if(!isset($_SESSION['idUsuario'])){
    header('Location: '.'../index.php');
}else{
    ?>
    <div id="page-wrapper">
        <br>
        <h1>Inventario por Sucursal y Artículos</h1>
        <hr>
    </div>
    <?php
} ?>