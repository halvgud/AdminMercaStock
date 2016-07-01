<?php
session_start();
$path = "/ADMINMERCASTOCK";

if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}
else
{ ?>
    <div id="page-wrapper">
        </br>
        <h1>Art&iacute;culos</h1>
        <hr>
        <form class="form-inline" id="articulo" method="post">
            <label for="idSucursal">Filtrar por Sucursal: </label>
            <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;"  required>
            </select>&nbsp;&nbsp;&nbsp;
            <label for="dep_id">Filtrar por Departamento: </label>
            <select id="dep_id" name="dep_id" class="form-control" style="width: 25%;" onchange="buscarCategoria();" required >
            </select>&nbsp;&nbsp;&nbsp;<br>
            <label for="cat_id">Filtrar por Categoria: </label>
            <select id="cat_id" name="cat_id" class="form-control" style="width: 25%;" required >
            </select>&nbsp;&nbsp;&nbsp;
            <button type="submit" class="btn btn-success"><i class="fa fa-search"></i> Buscar</button>
        </form></br>
        <table id="resultadosArticulo" class="table table-condensed text-center"  align="center">
            <thead>
            <tr>
                <th class="text-center">CLAVE</th>
                <th class="text-center">NOMBRE</th>
                <th class="text-center">PRECIO</th>
                <th class="text-center">MARGEN</th>
                <th class="text-center">EXISTENCIA</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <script type="text/javascript" src="js/controlador/catalogo/articulo.js"></script>
    </div>
    <?php
} ?>