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
        <h1>Categorias</h1>
        <hr>
        <form class="form-inline" id="categoria" method="post">
            <label for="sucursal">Filtrar por Sucursal: </label>
            <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" onchange="buscarDepartamento();" required>
            </select>&nbsp;&nbsp;&nbsp;
            <label  class="form-inline" id="lDepartamento" style="">Filtrar por Departamento</label>
            <select id="dep_id" name="dep_id" class="form-control" style="width: 25%;" >
            </select>&nbsp;&nbsp;&nbsp;
            <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-search"></i> Buscar</button>
        </form>
        </br></br>
        <table id="resultadosCategoria" class="table table-condensed text-center"  align="center">
            <thead>
            <tr>
                <th class="text-center">ID CATEGORIA</th>
                <th class="text-center">ID LOCAL</th>
                <th class="text-center">ID SUCURSAL</th>
                <th class="text-center">NOMBRE</th>
                <th class="text-center">ID DEPARTAMENTO</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <script type="text/javascript" src="js/controlador/catalogo/categoria.js"></script>
    </div>
    <?php
} ?>