<?php
session_start();
$path = "/ADMINMERCASTOCK";

if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}
else{
    ?>
    <div id="page-wrapper">
        <br>
        <h1>Bit&aacute;cora</h1>
        <br>
        <br>
        <form class="form-inline" id="fecha" name="fecha">
            <div class="form-group">
                <label for="hora_inicio">Fecha de Inicio</label>
                <input type="text" id="hora_inicio" name="hora_inicio" class="form-control" size="20" autocomplete="off"/>
                <label for="hora_fin">&nbsp;&nbsp;&nbsp;&nbsp;Fecha Final</label>
                <input type="text" id="hora_fin" name="hora_fin" class="form-control" size="20" autocomplete="off" />
                <input type="hidden" id="idSucursal" name="idSucursal" value="2" >
            </div>
            <label>&nbsp;&nbsp;&nbsp;</label>
            <button type="submit" class="btn btn-success"><i class="fa fa-search"></i> Buscar</button>
        </form>
        <br>
        <table id="test" class="table table-condensed">
            <thead>
            <tr>
                <th>ID BIT&Aacute;CORA</th>
                <th>ID ERROR</th>
                <th>DESCRIPCI&Oacute;N</th>
                <th>USUARIO</th>
                <th>FECHA</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <script type="text/javascript" src="js/controlador/reportes/bitacora.js"></script>
    </div>
    <?php
} ?>