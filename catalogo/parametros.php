<?php
    session_start(); 
    if(!isset($_SESSION['idUsuario'])){
         //require_once('../index.php');
        header('Location: '.'../index.php');
    }
    else{
        echo "Parametros";
    }
?>