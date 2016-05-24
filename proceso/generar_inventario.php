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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"GENERAR_INVENTARIO")) {

        ?>
            <div id="page-wrapper">
                <?php $_SESSION['bandera']=true;?>
                <br/>
                <h1>Generar Inventario</h1>
                <hr>
                <form class="form-inline" id="inventario" method="post">
                    <label for="sucursal">Filtrar por Sucursal: </label>
                    <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" onchange="buscarDeparamento();" required>
                        <!--<option value="">Seleccione una Sucursal</option>-->
                    </select>&nbsp;&nbsp;&nbsp;
                    <label for="dep_id">Filtrar por Departamento: </label>
                    <select id="dep_id" name="dep_id" class="form-control" style="width: 25%;" onchange="buscarCategoria();"  >
                        <!-- <option value="">Seleccione un Departamento</option>
                         <option value="s">:O</option>-->
                    </select>&nbsp;&nbsp;&nbsp;</br></br>
                    <label for="cat_id">Filtrar por Categoria: </label>
                    <select id="cat_id" name="cat_id" class="form-control" style="width: 25%;" >
                        <!--<option value="">Seleccione un Categoria</option>-->
                    </select>&nbsp;&nbsp;&nbsp;
                    <label for="concepto">Filtrar por Concepto: </label>
                    <select id="concepto" name="concepto" class="form-control" style="width: 25%;" onchange="/*if (this.selectedIndex==1) configuracionAzar();*/" required >
                        <!--<option value="">Seleccione un Categoria</option>-->
                    </select>&nbsp;&nbsp;&nbsp;
                    <input type="hidden" id="idUsuario" value="<?php echo $_SESSION['idUsuario']; ?>">
                    <button type="submit" class="btn btn-outline btn-success" id="search"><i class="fa fa-search"></i> Buscar</button>
                </form>
<br><br><div  align="center">
                <table id="resultados" width="90%" class="table table-condensed" >
                    <thead><th>Clave</th><th>Descripci&oacute;n</th><th>Existencia</th><th>Edici&oacute;n</th></thead>
<tbody></tbody>
                </table></div>
                <form id="send" method="post">
                    <button type="submit" id="btnSend" name="btnSend" class="btn btn-outline btn-success" value=""><i class="fa fa-paper-plane"> Enviar tabla en formato JSON</i></button>
                </form>

                <script type="text/javascript" src="js/controlador/proceso/generar_inventario.js"></script>
                <script type="text/javascript" src="http://lightswitch05.github.io/table-to-json/javascripts/jquery.tabletojson.min.js"></script>
            </div>

    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
