<?php
session_start();

if (!isset($_SESSION['idUsuario'])){
    header('Location: ' . '../index.php');
}
else
{
    ?>
    <div id="page-wrapper">
        <br><br>
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">Registrar</a></li>
            <li><a data-toggle="tab" href="#menu1" id="buscarYModificar" name="buscarYModificar">Buscar y Modificar</a></li>
        </ul>
        <div class="tab-content">
            <div id="home" class="tab-pane fade in active">
                <div class="col-md-6 col-md-offset-3">
                    <h3>Registrar Usuario</h3>
                    <br />
                    <form id="guardarUsuario">
                        <input type="hidden" name="idUsuario" id="idUsuario" value="<?php
                        echo $_SESSION['idUsuario'] ?>">
                        <div class="form-group">
                            <label for="usuario">Nombre de Usuario:</label>
                            <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Nombre de Usuario" required autocomplete="off">
                            <label for="password">Password</label>
                            <input type="password"  class="form-control" id="password" name="password" placeholder="Password" required autocomplete="off" maxlength="4" onkeydown="reactivarBtnU();" >
                            <label for="repetirpassword">Repetir Password</label>
                            <input type="password" class="form-control" id="repetirpassword" name="repetirpassword" placeholder="Repetir Password" onkeydown="reactivarBtnU();" required autocomplete="off" maxlength="4">
                            <label for="nombre">Nombre:</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" required autocomplete="off">
                            <label for="apellido">Apellido:</label>
                            <input type="text" class="form-control" id="apellido" name="apellido" placeholder="Apellido" required autocomplete="off">
                            <label for="apellido">Contacto:</label>
                            <input type="text" class="form-control" id="contacto" name="contacto" placeholder="Contacto" autocomplete="off">
                            <label for="sexo">Sexo</label>
                            <select class="form-control"  id="sexo" name="sexo" REQUIRED  >
                                <option value="">Seleccione el Sexo</option>
                            </select>
                            <label for="idSucursal">Sucursal</label>
                            <select class="form-control"  name="idSucursal" id="idSucursal" required>
                                <option value="">Seleccione una Sucursal</option>
                            </select>
                            <label for="idNivelAutorizacion">Nivel Autorizaci&oacute;n</label>
                            <select class="form-control" id="idNivelAutorizacion" name="idNivelAutorizacion" REQUIRED>
                                <option value="">Seleccione un Nivel</option>
                            </select>
                        </div>
                        <button type="submit" id='btnGuardar' class="btn btn-success"><i class="fa fa-floppy-o"></i> Guardar</button>
                    </form>
                </div>
            </div>
            <div id="menu1" class="tab-pane fade">
                <div class="col-md-6 col-md-offset-3">
                    <h3>Buscar y Modificar Usuario</h3>
                    <br />
                    <table id="resultados" class="table table-condensed" style="display:none;">
                        <thead>
                        <tr>
                            <th class="text-center">USUARIO</th>
                            <th class="text-center">ROL</th>
                            <th class="text-center">ESTADO</th>
                            <th class="text-center">EDICION</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="js/controlador/catalogo/alta_usuario.js">
        </script>
    </div>
    <?php
}
?>
