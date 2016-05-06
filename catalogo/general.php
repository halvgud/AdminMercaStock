<?php session_start();
$path = "/ADMINMERCASTOCK";
if(!isset($_SESSION['idUsuario'])){
    //require_once('../index.php');
    header('Location: '.'../index.php');
}
else
{

    require_once "../data/PrivilegiosUsuario.php";
    $decoded = PrivilegiosUsuario::traerPrivilegios();
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"GENERAL")) {
        ?>

            <div id="page-wrapper">
                <br/>
                <h1>General</h1>
                <hr>
                <form id="enviarSucursal">

                    <div class="form-group">
                        <label for="rol">Sucursal</label>
                        <select class="form-control" id="sucursal" name="sucursal" REQUIRED>
                            <option value="">Seleccione un Nivel</option>
                            <option value="1">Sucursal 1</option>
                            <option value="2">Sucursal 2</option>
                            <option value="3">Sucursal 3</option>
                        </select>
                        <select class="form-control" id="art" name="art" REQUIRED>
                            <option value="">Seleccione un art</option>
                            <option value="10">art 10</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-floppy-o"></i> Guardar</button>
                </form>
                <table id="test" class="table table-condensed" style="display:none;">
                    <thead>
                    <tr>
                        <th class="text-center">USUARIO</th>
                        <th class="text-center">ROL</th>
                        <th class="text-center">EDICION</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            <!-- /#page-wrapper -->
                <script type="text/javascript" src="js/controlador/catalogo/permisos.js"></script>
                <script type="text/javascript" src="js/controlador/catalogo/ms_inventario.js" ></script>
        </div>
        <!-- /#wrapper -->

    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
