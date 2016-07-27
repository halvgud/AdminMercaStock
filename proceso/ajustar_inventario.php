<?php
session_start();
$path = "/ADMINMERCASTOCK";

if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}else {
    ?>
    <div id="page-wrapper">
        <?php $_SESSION['bandera'] = true; ?>
        <br/>
        <h1 id="titulo">Ajustar Inventario</h1>
        <hr>
        <form class="form-inline" id="inventario" method="post">
            <label for="idSucursal">Filtrar por Sucursal: </label>
            <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" required>
            </select>
            <label for="fechaInicio">&nbsp;&nbsp;&nbsp;&nbsp;Fecha de Inicio</label>
            <input type="text" id="fechaInicio" name="fechaInicio" class="form-control" size="20" autocomplete="off" style="width: 10%"/>
            <label for="fechaFin">&nbsp;&nbsp;&nbsp;&nbsp;Fecha Final</label>
            <input type="text" id="fechaFin" name="fechaFin" class="form-control" size="20" autocomplete="off" style="width: 10%"/>
            <input type="hidden" id="idUsuario" value="<?php echo $_SESSION['idUsuario']; ?>">
            <button type="submit" class="btn  btn-success" id="search"><i class="fa fa-search"></i> Buscar</button>
        </form>
        <br /><br />
            <table id="tabla" width="90%" class="table table-striped" >
                <thead>
                <th>id</th>
                <th>Descripcion</th>
                <th>Fecha</th>
                <th>Cantidad Total de Inventario</th>
                <th>Cantidad de Inventario realizado</th>
               <!-- <th>Cantidad Total de producto</th>
                <th>Cantidad de producto inventariado</th>
                   <th>Diferencia total</th>-->
                <th>Costo total</th>
                </thead>
                <tbody></tbody>
            </table>
            <div id="divDetalle">
            <table id="tablaDetalle"  class="table table-striped" align="center">
                <thead>
                <tr align="center">
                    <th align="center">fecha Solicitud</th>
                    <th align="center">id Inventario</th>
                    <th align="center" >descripcion</th>
                    <th align="center" >Cantidad en sistema</th>
                    <th align="center" >Cantidad física</th>
                    <th align="center">Ajustes anteriores</th>
                    <th align="center">Diferencia</th>
                    <th align="center" >Costo Actual</th>
                    <th align="center" >Costo Ajustes</th>
                    <th align="center">Editar</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <script type="text/javascript" src="js/controlador/proceso/ajustar_inventario.js"></script>
    </div>
    <?php
} ?>