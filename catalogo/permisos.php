<?php session_start();
$path = "/ADMINMERCASTOCK";
if(!isset($_SESSION['idUsuario'])){
    //require_once('../index.php');
   header('Location: '.'../index.php');
}
else
{
    ?>
        <div id="page-wrapper">
            <br/>
            <h1>Editar Permisos</h1>
            <hr>

            <table id="resultados" class="table table-striped table-bordered" style="display:none;">
                <thead>
                <tr>
                    <th class="text-center">ROL</th>
                    <th colspan="2" class="text-center">Edicion</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <!-- /#page-wrapper -->
            <script type="text/javascript" src="js/controlador/catalogo/permisos.js">

    </script>
    </div>
    <!-- /#wrapper -->


<?php
} ?>
