<?php session_start();
$path = "/ADMINMERCASTOCK";

if(!isset($_SESSION['idUsuario'])){
    header('Location: '.'../index.php');
}
else{
    ?>
            <div id="page-wrapper">
                <br>
                <h1>Estadísticas por Venta</h1>
                <br>
                <br>
                <form class="form-inline" id="venta" name="venta">
                    <div class="form-group">
                        <label>Sucursales:&nbsp;</label>
                        <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" onchange="limpiarTablas();" required></select>
                        <label for="fechaInicio">&nbsp;&nbsp;&nbsp;&nbsp;Fecha de Inicio</label>
                        <input type="text" id="fechaInicio" name="fechaInicio" class="form-control" size="20" autocomplete="off" style="width: 10%" readonly="readonly" onchange="limpiarTablas();"/>
                        <label for="fechaFin">&nbsp;&nbsp;&nbsp;&nbsp;Fecha Final</label>
                        <input type="text" id="fechaFin" name="fechaFin" class="form-control" size="20" autocomplete="off" style="width: 10%" readonly="readonly" onchange="limpiarTablas();"/>
                        <label>&nbsp;&nbsp;&nbsp;</label>
                        <button type="submit" class="btn btn-success"><i class="fa fa-cog"></i> Generar</button>
                        </div>
                </form>
                <br>

                <table id="total" class="table table-striped" align="center">
                    <thead>
                    <tr align="center">
                        <th align="center">Id de Método de Pago</th>
                        <th align="center">Método de Pago</th>
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
                <script type="text/javascript" src="js/controlador/reportes/estadisticas_venta.js"></script>

            </div>
    <?php
}
?>
