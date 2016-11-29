<?php
session_start();

if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}else {
    ?>
    <div id="page-wrapper">
        <?php $_SESSION['bandera'] = true; ?>
        <br/>
        <h1 id="titulo">Generar Inventario</h1>
        <hr>
        <form class="form-horizontal" id="inventario" method="post">
            <div class='row'>
                <div class='col-sm-4'>
                    <label for="idSucursal">Filtrar por Sucursal: </label>
                    <select id="idSucursal" name="idSucursal" class="form-control" onchange="" required>
                    </select>
                </div>
                <div class='col-sm-4'>
                    <label for="dep_id">Filtrar por Departamento: </label>
                    <select id="dep_id" name="dep_id" class="form-control"   >
                    </select>
                </div>
                <div class='col-sm-4'>
                    <label for="nombreInventario">Nombre </label>
                   <input type="text" class="form-control" id="nombreInventario" name="nombreInventario"/>
                </div>
            </div>
            <div class='row'>
                <div class='col-sm-4'>
                    <label for="cat_id">Filtrar por Categoria: </label>
                    <select id="cat_id" name="cat_id" class="form-control"  >
                    </select>
                </div>
                <div class='col-sm-4'>
                    <label for="concepto">Filtrar por Concepto: </label>
                    <select id="concepto" name="concepto" class="form-control" required>
                    </select>
                </div>
                <div class='col-sm-4'>
                    <input type="hidden" id="idUsuario" value="<?php echo $_SESSION['idUsuario']; ?>">
                    <label for="search">Búsqueda</label>
                    <button type="submit" class="form-control btn btn-info" id="search"><i class="fa fa-search"></i> Buscar</button>
                </div>
            </div>
        </form>
        <br />
        <br />
        <div  align="center">
            <table id="resultados" width="90%" class="table table-condensed" >
                <thead>
                    <tr>
                        <th>Clave</th>
                        <th>Descripci&oacute;n</th>
                        <th>Existencia</th>
                        <th>Edici&oacute;n</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table></div>
        <form id="send" method="post">
            <button type="submit" id="btnSend" name="btnSend" class="btn btn-success" value=""><i class="fa fa-cog fa-spin fa-3x fa-fw" style="display: none"></i>Generar</button>
        </form>
        <script type="text/javascript" src="js/controlador/proceso/generar_inventario.js"></script>
    </div>
    <?php
} ?>