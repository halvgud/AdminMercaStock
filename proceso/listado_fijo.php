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
    if (PrivilegiosUsuario::tienePrivilegio($decoded,"LISTADO_FIJO")) {
        ?>

        <div id="page-wrapper">
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#home">Registrar</a></li>
                <li><a data-toggle="tab" href="#menu1" id="buscarYModificar" name="buscarYModificar">Buscar y Modificar</a></li>
            </ul>
            <div class="tab-content">
                <div id="home" class="tab-pane fade in active">
                    <div class="col-md-6 col-md-offset-3">
                        <h3>Registrar Sucursal</h3>
                        </br>
                        <form id="guardarSucursal">
                            <div class="form-group">
                                <label for="nombre">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" required autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="domicilio">Domicilio:</label>
                                <input type="text" class="form-control" id="domicilio" name="domicilio" placeholder="Direcci&oacute;n" required autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="contacto">Contacto:</label>
                                <input type="text" class="form-control" id="contacto" name="contacto" placeholder="Contacto" required autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="usuario">Usuario:</label>
                                <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Usuario" required autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="Password" onkeydown="reactivarBtnS();" required autocomplete="off">
                            </div>
                            <div class="form-group">
                                <label for="repetirpassword">Repetir Password:</label>
                                <input type="password" class="form-control" id="repetirpassword" name="repetirpassword" placeholder="Repetir Password" required autocomplete="off">
                            </div>
                            <input type="hidden" id="claveAPI" name="claveAPI" value="default" />
                            <input type="hidden" id="idEstado" name="idEstado" value="1" />
                            <button id="btnGuardar" type="submit" class="btn btn-outline btn-success"><i class="fa fa-floppy-o"></i> Guardar</button>
                        </form>
                    </div>
                </div>
                <div id="menu1" class="tab-pane fade">
                    <div class="col-md-6 col-md-offset-3">
                        <br/>
                        <h1>Listado Fijo</h1>
                        <hr>
                        <form class="form-inline" id="listadoFijo" method="post">
                            <label for="idSucursal">Sucursales Disponibles: </label>
                            <select id="idSucursal" name="idSucursal" class="form-control" style="width: 25%;" required>
                                <!-- <option value="">Seleccione una Sucursal</option>-->
                            </select>
                            &nbsp;&nbsp;&nbsp;
                            <button type="submit" class="btn btn-outline btn-success" id="btnBuscar"><i class="fa fa-search"></i> Buscar</button>
                        </form>
                        <table id="resultados" class="table table-condensed" style="" align="center">
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
            <script type="text/javascript" src="js/controlador/proceso/listado_fijo.js" ></script>
        </div>        <!-- /#wrapper -->

    <?php } else{
        header('Location: '.'../index.php');
    }
} ?>
