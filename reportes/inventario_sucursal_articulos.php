<?php session_start();
$path = "/ADMINMERCASTOCK";

if(!isset($_SESSION['idUsuario'])){
    header('Location: '.'../index.php');
}else{
    ?>
    <div id="page-wrapper">
        <br>
        <h1>Inventario por Sucursal y Artículos</h1>
        <br>
        <br>
        <form class="form-inline" id="inventario" name="inventario">
            <div class="form-group">
                <label>Sucursales:&nbsp;</label>
                <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" onchange="//buscarDepartamento();" required></select>
                <label for="fechaInicio">&nbsp;&nbsp;&nbsp;&nbsp;Fecha de Inicio</label>
                <input type="text" id="fechaInicio" name="fechaInicio" class="form-control" size="20" autocomplete="off" style="width: 10%"/>
                <label for="fechaFin">&nbsp;&nbsp;&nbsp;&nbsp;Fecha Final</label>
                <input type="text" id="fechaFin" name="fechaFin" class="form-control" size="20" autocomplete="off" style="width: 10%"/>
                <label>&nbsp;&nbsp;&nbsp;</label>
                <button type="submit" class="btn btn-success"><i class="fa fa-cog"></i> Generar</button>
            </div>

        </form>
        <h3>Inventario por Sucursal y Artículos</h3>
        <table id="tabla" class="table table-condensed" align="center">
            <thead>
            <tr align="center">
                <th align="center">Nº de veces inventariadas</th>
                <th align="center">Nº de veces acertado</th>
                <th align="center">Nº de veces erroneo</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <script type="text/javascript" src="js/controlador/reportes/inventario_sucursal_articulos.js"></script>

    </div>
    <?php
} ?>