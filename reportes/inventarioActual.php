<?php session_start();

if(!isset($_SESSION['idUsuario'])){
    header('Location: '.'../index.php');
}
else{
    ?>
    <div id="page-wrapper">
        <br>
        <h1>Inventario actual</h1>
        <br>
        <br>
        <form class="form-inline" id="inventarioActual" name="inventarioActual">
            <div class="form-group">
                <label for="idSucursal">Sucursales:&nbsp;</label>
                <select id="idSucursal" name="idSucursal" class="form-control"  required></select>
                <button type="submit" class="btn btn-success"><i class="fa fa-cog"></i> Generar</button>
            </div>
        </form>
        <br>

        <table id="resultados" class="table table-striped" align="center">
            <thead>
            <tr>
                <th>Fecha</th>
                <th>Departamento</th>
                <th>Nombre</th>
                <th>Existencia real</th>
                <th>Existencia en sistema</th>
                <th>Estado</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
        <br>
        <script type="text/javascript" src="js/controlador/reportes/inventarioActual.js"></script>

    </div>
    <?php
}
?>
