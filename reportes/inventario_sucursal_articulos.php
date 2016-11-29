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
        <form class="form-horizontal" id="inventario" name="inventario">
            <div class="row">
                <div class='col-sm-4'>
                    <label for="idSucursal">Sucursales:</label>
                    <select id="idSucursal" name="idSucursal" class="form-control"  required></select>
                </div>
                <div class='col-sm-2'>
                    <label for="fechaInicio">Fecha de Inicio</label>
                    <input type="text" id="fechaInicio" name="fechaInicio" class="form-control" size="20" autocomplete="off" />
                </div>
                <div class='col-sm-2'>
                    <label for="fechaFin">Fecha Final</label>
                    <input type="text" id="fechaFin" name="fechaFin" class="form-control" size="20" autocomplete="off" />
                </div>
                <div class='col-sm-2'>
                    <label for='concepto'>Concepto</label>
                    <select id="concepto" name="concepto" class="form-control" >
                    </select>
                </div>
                <div class="col-sm-1">
                    <label for="search">Búsqueda</label>
                    <button type="submit" class="form-control btn btn-success" id="search"><i class="fa fa-cog"></i> Generar</button>
                </div>
            </div>
        </form>
        <h3>Inventario por Sucursal y Artículos</h3>
        <table id="tabla"  class="table table-condensed table-responsive"  style="width:100%" align="center">
            <thead>
            <tr align="center">
                <th align="center">idSucursal</th>
                <th align="center">Nombre</th>
                <th align="center">idNombre</th>
                <th align="center">fecha</th>
                <th align="center">Total</th>
                <th align="center">Acertado</th>
                <th align="center">Fallado</th>
                <th align="center">Restante</th>
                <th align="center">Costo</th>
                <th align="center">%</th>
                <th align="center">Detalle</th>
                <th align="center">Cancelar</th>
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
                    <th align="center">id</th>
                    <th align="center">Fecha</th>
                    <th align="center">Id Departamento</th>
                    <th align="center">Departamento</th>
                    <th align="center">Clave</th>
                    <th align="center">Descripcion</th>
                    <th align="center">Cantidad solicitada</th>
                    <th align="center">Cantidad en sistema</th>
                    <th align="center">Cantidad ACTUAL en sistema</th>
                    <th align="center">Cantidad física</th>
                    <th align="center">Diferencia</th>
                    <th align="center">Costo</th>
                    <th align="center" >Porcentaje</th>
                    <th align="center">Lista Temporal</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <script type="text/javascript" src="js/controlador/reportes/inventario_sucursal_articulos.js"></script>

    </div>
    <?php
} ?>