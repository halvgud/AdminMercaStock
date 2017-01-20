<?php session_start();


if(!isset($_SESSION['idUsuario'])){
    header('Location: '.'../index.php');
}else{
    ?>
    <div id="page-wrapper">
        <br>
        <h1>Ajustes de inventario por Departamento</h1>
        <br>
        <br>
        <form class="form-inline" id="inventario" name="inventario">
            <div class="form-group">
                <label>Sucursales:&nbsp;</label>
                <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" required></select>
                <!--<label for="fechaInicio">&nbsp;&nbsp;&nbsp;&nbsp;Fecha de Inicio</label>
                <input type="text" id="fechaInicio" name="fechaInicio" class="form-control" size="20" autocomplete="off" style="width: 10%"/>
                <label for="fechaFin">&nbsp;&nbsp;&nbsp;&nbsp;Fecha Final</label>
                <input type="text" id="fechaFin" name="fechaFin" class="form-control" size="20" autocomplete="off" style="width: 10%"/>-->
                <label>&nbsp;&nbsp;&nbsp;</label>
                <button type="submit" class="btn btn-success"><i class="fa fa-cog"></i> Generar</button>
            </div>

        </form>
        <div id="divCabecero">
            <table id="total" class="table table-condensed" align="center">
                <thead>
                <tr align="center">
                    <th align="center">Fecha</th>
                    <th align="center">Departamento</th>
                    <th align="center">Cantidad total afectada</th>
                    <th align="center">Cantidad anterior</th>
                    <th align="center">Cantidad después del inventario</th>
                    <th align="center">índice de ajuste</th>
                    <th align="center">Perdida Actual</th>
                    <th align="center">Detalle</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <br>
        <div id="divDetalle">
            <table id="tablaDetalle"  class="table table-striped" align="center">
                <thead>
                <tr align="center">
                    <th align="center">Fecha</th>
                    <th align="center">Clave</th>
                    <th align="center" >Descripcion</th>
                    <th align="center" >Cantidad en sistema</th>
                    <th align="center" >Cantidad física</th>
                    <th align="center">Diferencia</th>
                    <th align="center" >Costo</th>
                    <th align="center" >Ajustado</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <script type="text/javascript" src="js/controlador/reportes/ajustes.js"></script>

    </div>
    <?php
} ?>