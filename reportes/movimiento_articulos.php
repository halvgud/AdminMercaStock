<?php session_start();
$path = "/ADMINMERCASTOCK";

if(!isset($_SESSION['idUsuario'])){
    header('Location: '.'../index.php');
}else{
    ?>
    <div id="page-wrapper">
        <br>
        <h1>Movimiento de Artículos</h1>
        <br>
        <br>
        <form class="form-inline" id="venta" name="venta">
            <div class="form-group">
                <label for="idSucursal">Sucursales:&nbsp;</label>
                <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;"  required></select>
                <label for="fechaInicio">&nbsp;&nbsp;&nbsp;&nbsp;Fecha de Inicio</label>
                <input type="text" id="fechaInicio" name="fechaInicio" class="form-control" autocomplete="off" style="width: 25%" readonly="readonly"  required/>
                <label for="fechaFin">&nbsp;&nbsp;&nbsp;&nbsp;Fecha Final</label>
                <input type="text" id="fechaFin" name="fechaFin" class="form-control" autocomplete="off" style="width: 25%" readonly="readonly"  required/>
                <label>&nbsp;&nbsp;&nbsp;</label>
                <label for="descripcionArticulo">Artículo</label>
                <input type="text" id="descripcionArticulo" name="descripcionArticulo" class="form-control" required autocomplete="off"/>
                <input type="hidden" id="input2" name="input2" value=""/>
                <button type="submit" class="btn btn-success"><i class="fa fa-cog"></i> Generar</button>
            </div>
        </form>
        <br>

        <table id="total" class="table table-striped" align="center">
            <thead>
            <tr align="center">
                <th align="center">Clave</th>
                <th align="center">Descripción</th>
                <th align="center" >Cantidad</th>
                <th align="center">Fecha</th>
                <th align="center">Unidad</th>
                <th align="center" >Total</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <br>
        <div id="divDetalle">
            <table id="tablaDetalle"  class="table table-striped" align="center">
                <thead>
                <tr align="center">
                    <th align="center">No. de Ticket</th>
                    <th align="center">Artículo</th>
                    <th align="center" >Fecha</th>
                    <th align="center" >Total</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <script type="text/javascript" src="js/controlador/reportes/movimiento_articulos.js"></script>

    </div>
    <?php
} ?>