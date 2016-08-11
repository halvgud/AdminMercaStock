<?php session_start();


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
                <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" required></select>
                <label for="fechaInicio">&nbsp;&nbsp;&nbsp;&nbsp;Fecha de Inicio</label>
                <input type="text" id="fechaInicio" name="fechaInicio" class="form-control" size="20" autocomplete="off" style="width: 10%"/>
                <label for="fechaFin">&nbsp;&nbsp;&nbsp;&nbsp;Fecha Final</label>
                <input type="text" id="fechaFin" name="fechaFin" class="form-control" size="20" autocomplete="off" style="width: 10%"/>
                <label>&nbsp;&nbsp;&nbsp;</label>
                <button type="submit" class="btn btn-success"><i class="fa fa-cog"></i> Generar</button>
            </div>
        </form>
        <h3>Inventario por Sucursal y Artículos</h3>
        <table id="tabla" class="table table-condensed table-responsive" align="center">
            <thead>
            <tr align="center">
                <th align="center">idSucursal</th>
                <th align="center">Nombre</th>
                <th align="center">fecha</th>
                <th align="center">Total</th>
                <th align="center">Total Acertado</th>
                <th align="center">Total Fallado</th>
                <th align="center">Costo</th>
                <th align="center" >Porcentaje</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <br>
        <div id="divDetalle">
            <table border="0" cellpadding="5" cellspacing="5">
                <tbody><tr>
                    <td>Concepto:</td>
                    <td> <select id="idConcepto" name="idConcepto" class="form-control" required>
                            <option value="6">Diferencia</option>
                            <option value="7">Costo</option>
                            <option value="8">Porcentaje</option>
                        </select></td>
                    <td>Rango mínimo:</td>
                    <td><input id="min" name="min" type="text" class="form-control"/></td>

                    <td>Rango máximo:</td>
                    <td><input id="max" name="max" type="text" class="form-control"/></td>
                </tr>
                </tbody></table>
            <table id="tablaDetalle"  class="table table-striped table-responsive" align="center">
                <thead>
                <tr align="center">
                    <th align="center">Fecha</th>
                    <th align="center">Clave</th>
                    <th align="center">Descripcion</th>
                    <th align="center">Cantidad solicitada</th>
                    <th align="center">Cantidad en sistema</th>
                    <th align="center">Cantidad física</th>
                    <th align="center">Diferencia</th>
                    <th align="center">Costo</th>
                    <th align="center" >Porcentaje</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <script type="text/javascript" src="js/controlador/reportes/inventario_sucursal_articulos.js"></script>

    </div>
    <?php
} ?>