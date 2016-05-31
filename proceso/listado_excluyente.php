<?php
session_start();
$path = "/ADMINMERCASTOCK";

if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}
else
{ ?>
    <div id="page-wrapper">
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">Registrar</a></li>
            <li><a data-toggle="tab" href="#menu1" id="buscarYModificar" name="buscarYModificar">Buscar y Eliminar</a></li>
        </ul>
        <div class="tab-content">
            <div id="home" class="tab-pane fade in active">
                <div class="col-md-6 col-md-offset-3">
                    <br>
                    <h3>Registrar Art&iacute;culo en Lista Excluyente</h3>
                    <br>
                    <form class="form-inline" id="buscarArticulo" method="post">
                        <label for="idSucursal">Sucursal: </label>
                        <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" required onchange="limpiarTabla1();">
                        </select>
                        <label for="art_id">Clave o Descripci&oacute;n </label>
                        <input type="text" class="form-control" id="art_id" name="art_id" placeholder="" required autocomplete="off" style="width: 20%;">
                        <br><br>
                        <button type="submit" class="btn btn-outline btn-success" id="btnBuscar"><i class="fa fa-search"></i> Buscar</button>
                    </form>
                    <br>
                    <table id="resultados" class="table table-condensed" style="" align="center">
                        <thead>
                        <tr>
                            <th class="text-center">ART ID</th>
                            <th class="text-center">CLAVE</th>
                            <th class="text-center">DESCRIPCI&Oacute;N</th>
                            <th class=" -align-center">AGREGAR</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div id="menu1" class="tab-pane fade">
                <div class="col-md-6 col-md-offset-3">
                    <br>
                    <h3>Listado Excluyente</h3>
                    <br>
                    <form class="form-inline" id="listadoFijo" method="post">
                        <label for="idSucursal2">Sucursales Disponibles: </label>
                        <select id="idSucursal2" name="idSucursal2" class="form-control" style="width: 25%;" required onchange="limpiarTabla2()">
                        </select>
                        &nbsp;&nbsp;&nbsp;
                        <div id="divEstado">
                            <label for="myonoffswitch">Estado</label>
                            <div class="onoffswitch">
                                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" onchange="cambiarEstado();"/>
                                <label class="onoffswitch-label" for="myonoffswitch"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label>
                            </div>
                        </div>
                    </form>
                    <br>
                    <br>
                    <table id="resultados2" class="table table-condensed" style="" align="center">
                        <thead>
                        <tr>
                            <th class="text-center">ART ID</th>
                            <th class="text-center">CLAVE</th>
                            <th class="text-center">DESCRIPCI&Oacute;N</th>
                            <th class=" -align-center">EDICI&Oacute;N</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <input type="hidden" id="usuario" name="usuario" value="<?php echo $_SESSION['usuario']; ?>">
        <script type="text/javascript" src="js/controlador/proceso/listado_excluyente.js"></script>
    </div>
    <?php
} ?>