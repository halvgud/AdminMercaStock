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
        <form class="form-inline" id="inventario" method="post">
            <label for="idSucursal">Filtrar por Sucursal: </label>
            <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" onchange="" required>
            </select>&nbsp;&nbsp;&nbsp;
            <label for="dep_id">Filtrar por Departamento: </label>
            <select id="dep_id" name="dep_id" class="form-control" style="width: 25%;"   >
            </select>&nbsp;&nbsp;&nbsp;<br><br>
            <label for="cat_id">Filtrar por Categoria: </label>
            <select id="cat_id" name="cat_id" class="form-control" style="width: 25%;" >
            </select>&nbsp;&nbsp;&nbsp;
            <label for="concepto">Filtrar por Concepto: </label>
            <select id="concepto" name="concepto" class="form-control" style="width: 25%;" required>
            </select>&nbsp;&nbsp;&nbsp;
            <input type="hidden" id="idUsuario" value="<?php echo $_SESSION['idUsuario']; ?>">
            <button type="submit" class="btn  btn-success" id="search"><i class="fa fa-search" hidden="true"></i> Buscar</button>
        </form>
        <br /><br /><div  align="center">
            <table id="resultados" width="90%" class="table table-condensed" >
                <thead><th>Clave</th><th>Descripci&oacute;n</th><th>Existencia</th><th>Edici&oacute;n</th></thead>
                <tbody></tbody>
            </table></div>
        <form id="send" method="post">
            <button type="submit" id="btnSend" name="btnSend" class="btn btn-success" value=""><div ><i class="fa fa-cog fa-spin fa-3x fa-fw" style="display: none"></i></div>

                Generar</button>
        </form>
        <script type="text/javascript" src="js/controlador/proceso/generar_inventario.js"></script>
    </div>
    <?php
} ?>