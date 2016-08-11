<?php
session_start();
$path = "/ADMINMERCASTOCK";

if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}
else
{ ?>
    <div id="page-wrapper">
        <br/>
        <h1>Proveedores</h1>
        <hr>
        <form class="form-inline" id="proveedor" method="post">
            <label for="idSucursal">Filtrar por Sucursal: </label>
            <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" required >
                <option value="">Seleccione una Sucursal</option>
            </select>
            <button type="submit" class="btn btn-success"><i class="fa fa-search"></i> Buscar</button>
        </form>
        <br><br>
        <table id="resultadosProveedor" class="table table-condensed text-center"  align="center">
            <thead>
            <tr>
                <th class="text-center">Id</th>
                <th class="text-center">Nombre</th>
                <th class="text-center">Representante</th>
                <th class="text-center">Telefono</th>
                <th class="text-center">RFC</th>

            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <script type="text/javascript" src="js/controlador/catalogo/proveedor.js"></script>
    </div>
    <?php
} ?>