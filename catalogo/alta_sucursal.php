<?php
session_start();

if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}
else
{
    require_once "../data/Roles.php";
    require_once "../data/PrivilegiosUsuario.php";
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
                        <input type="hidden" id="idSucursal" name="idSucursal" value="0" />
                        <button id="btnGuardar" type="submit" class="btn btn-success"><i class="fa fa-floppy-o"></i> Guardar</button>
                    </form>
                </div>
            </div>
            <div id="menu1" class="tab-pane fade">
                <div class="col-md-6 col-md-offset-3">
                    <h3>Buscar y Modificar Sucursal</h3>
                    </br>
                    <table id="resultados" class="table table-condensed" style="">
                        <thead>
                        <tr>
                            <th class="text-center">ID SUCURSAL</th>
                            <th class="text-center">NOMBRE</th>
                            <th class="text-center">USUARIO</th>
                            <th class="text-center">DOMICILIO</th>
                            <th class="text-center">CONTACTO</th>
                            <th class="text-center">ID ESTADO</th>
                            <th class="text-center">EDICI&Oacute;N</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="js/controlador/catalogo/alta_sucursal.js" ></script>
    </div>
    <?php
} ?>