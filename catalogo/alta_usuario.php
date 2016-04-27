
<?php session_start(); 
if(!isset($_SESSION['id_usuario'])){
   require_once('../login.php');  
}
else
{
  ?>
<!DOCTYPE html>
<html lang="en">

<head>

    <?php require_once('../header-comun-carpeta.html'); ?> 

</head>

<body>

    <div id="wrapper">
    <?php require_once('../menu.php'); ?>
     <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#home">Registrar</a></li>
                    <li><a data-toggle="tab" href="#menu1">Buscar y Modificar</a></li>
                </ul>
                <div class="tab-content">
                    <div id="home" class="tab-pane fade in active">   
                      <div id="page-wrapper">
                          <h2>Registrar Usuario</h2>
                          <hr>
                          <div class="col-md-6 col-md-offset-3">
                              
                              <form id="guardarUsuario">
                                  <input type="hidden" name="tabla" id="tabla" value="usuario">
                                  <input type="hidden" name="id_usuario_creacion"  value="N">
                                  <input type="hidden" name="estado"  value="A">
                                  <input type="hidden" name="tipo_transaccion"  value="1">
                                <div class="form-group">
                                  <label for="usuario">Nombre de Usuario:</label>
                                  <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Nombre de Usuario" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="password">Password</label>
                                  <input type="password" class="form-control" id="password" name="password" placeholder="Password" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="password2">Repetir Password</label>
                                  <input type="password" class="form-control" id="password2" name="password2" placeholder="Repetir Password" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="nombre">Nombre:</label>
                                  <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="apellido">Apellido:</label>
                                  <input type="text" class="form-control" id="apellido" name="apellido" placeholder="Apellido" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="apellido">Contacto:</label>
                                  <input type="text" class="form-control" id="contacto" name="contacto" placeholder="Contacto" required autocomplete="off">
                                </div>
                                 <div class="form-group">
                                  <label for="sexo">Sexo</label>
                                  <select class="form-control" id="sexo" name="sexo" required>
                                      <option value="">Seleccione el Sexo</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="rol">Nivel Autorizaci&oacute;n</label>
                                  <select class="form-control" id="autorizacion" name="autorizacion" required>
                                      <option value="">Seleccione un Nivel</option>
                                  </select>
                                </div>
                                
                                <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-floppy-o"></i> Guardar</button>
                              </form>
                          </div>
                      </div>
                    </div>
                    <div class="tab-content">
                        <div id="home" class="tab-pane fade in active">   
                           <div id="page-wrapper">
                                 <h2>Registrar Usuario</h2>
                          <hr>
                          <div class="col-md-6 col-md-offset-3">
                              
                              <form id="buscarUsuario">
                                  <input type="hidden" name="tabla" id="tabla" value="usuario">
                                  <input type="hidden" name="id_usuario_creacion"  value="N">
                                  <input type="hidden" name="estado"  value="A">
                                  <input type="hidden" name="tipo_transaccion"  value="1">
                                <div class="form-group">
                                  <label for="usuario">Nombre de Usuario:</label>
                                  <input type="text" class="form-control" id="usuario" name="usuario" placeholder="Nombre de Usuario" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="password">Password</label>
                                  <input type="password" class="form-control" id="password" name="password" placeholder="Password" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="password2">Repetir Password</label>
                                  <input type="password" class="form-control" id="password2" name="password2" placeholder="Repetir Password" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="nombre">Nombre:</label>
                                  <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="apellido">Apellido:</label>
                                  <input type="text" class="form-control" id="apellido" name="apellido" placeholder="Apellido" required autocomplete="off">
                                </div>
                                <div class="form-group">
                                  <label for="apellido">Contacto:</label>
                                  <input type="text" class="form-control" id="contacto" name="contacto" placeholder="Contacto" required autocomplete="off">
                                </div>
                                 <div class="form-group">
                                  <label for="sexo">Sexo</label>
                                  <select class="form-control" id="sexo" name="sexo" required>
                                      <option value="">Seleccione el Sexo</option>
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="rol">Nivel Autorizaci&oacute;n</label>
                                  <select class="form-control" id="autorizacion" name="autorizacion" required>
                                      <option value="">Seleccione un Nivel</option>
                                  </select>
                                </div>
                                
                                <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-search"></i> Guardar</button>
                              </form>
                          </div>
                         </div>
                        </div>
                    </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <?php require_once('../footer-comun.html'); ?>
    <script type="text/javascript">

    </script>
</body>

</html>
<?php } ?>