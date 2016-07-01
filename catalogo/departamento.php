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
        <h1>Departamentos</h1>
        <hr>
        <form class="form-inline" id="departamento" method="post">
            <label for="idSucursal">Filtrar por Sucursal: </label>
            <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" required >
                <option value="">Seleccione una Sucursal</option>
            </select>
            <button type="submit" class="btn btn-success"><i class="fa fa-search"></i> Buscar</button>
        </form>
        <br><br>
        <table id="resultadosSucursal" class="table table-condensed text-center"  align="center">
            <thead>
            <tr>
                <th class="text-center">ID</th>
                <th class="text-center">NOMBRE</th>
                <th class="text-center">PORCENTAJE</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <script type="text/javascript" src="js/controlador/catalogo/departamento.js"></script>
    </div>
    <?php
} ?>