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
        <h3>Parametros</h3>
        </br>
        <form class="form-inline" id="parametro" method="post">
            <input type="hidden" id="nombreUsuario" value="<?php print $_SESSION['usuario']; ?>"/>
            <label for="sucursal">Filtrar por Sucursal: </label>
            <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" required>
                <option value="">Seleccione una Sucursal</option>
            </select>
            <button type="submit" class="btn btn-outline btn-success" id="btnBuscar"><i class="fa fa-search"></i> Buscar</button>
        </form></br>
        <table id="resultados" class="table table-condensed" style="">
            <thead>
            <tr>
                <th class="text-center">ACCI&Oacute;N</th>
                <th class="text-center">PAR&Aacute;METRO</th>
                <th class="text-center">VALOR</th>
                <th class="text-center">COMENTARIO</th>
                <th class="text-center">USUARIO</th>
                <th class="text-center">FECHA DE ACTUALIZACI&Oacute;N</th>
                <th class="text-center">EDICI&Oacute;N</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <hr>
    </div>
    <script type="text/javascript" src="js/controlador/catalogo/parametro.js"></script>
    <?php
} ?>