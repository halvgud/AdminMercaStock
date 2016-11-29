<?php
session_start();
if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}else {
    ?>
    <div id="page-wrapper">
        <?php $_SESSION['bandera'] = true; ?>
        <br/>
        <div title="Lista que guarda de forma temporal un listado de articulos antes de generar listado de inventario"><h1 id="titulo">Listado Temporal de Inventario</h1>
        </div>
        <hr>
        <div class="col-md-12">
            <div class="col-md-6">
                <form class="form-inline" id="listaTemporal" method="post">
                    <label for="idSucursal" class="control-label">Filtrar por Sucursal: </label>
                    <select id="idSucursal" name="idSucursal" class="form-control"  onchange="" required>
                    </select>&nbsp;&nbsp;&nbsp;
                    <input type="hidden" id="idUsuario" value="<?php echo $_SESSION['idUsuario']; ?>">
                </form>
            </div>
            <div class="col-md-6">
                <form method="post" id="buscarArticulo" class="form-inline">
                    <label for="descripcionArticulo"  class="control-label">Descripción:</label>
                    <input type="text" class="form-control" id="descripcionArticulo" name="descripcionArticulo" readonly="readonly">
                    <button type="button" class="btn btn-success" id="agregarArticuloLista"><i class="fa fa-search"></i>agregar producto</button>
                </form>
            </div>
        </div>
        <table id="resultados" width="90%" class="table table-condensed" >
            <thead>
            <tr>
                <th>id</th>
                <th>art_id</th>
                <th>Clave</th>
                <th>Descripci&oacute;n</th>

                <th>Existencia</th>
                <th>Edici&oacute;n</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <script type="text/javascript" src="js/controlador/proceso/listadoTemporal.js"></script>
    </div>
    <?php
} ?>