<?php session_start(); 
    if(!isset($_SESSION['idUsuario'])){
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
            <div id="page-wrapper">   
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#home">Registrar</a></li>
                    <li><a data-toggle="tab" href="#menu1">Buscar y Modificar</a></li>
                </ul>
                <div class="tab-content">
                    <div id="home" class="tab-pane fade in active">
                        <div class="col-md-6 col-md-offset-3">
                            
                            <h3>Registrar Sucursal</h3>
                            </br>
                            <form id="guardarUsuario">
                                <input type="hidden" name="tabla" id="tabla" value="usuario">
                                <input type="hidden" name="id_usuario_creacion"  value="N">
                                <input type="hidden" name="estado"  value="A">
                                <input type="hidden" name="tipo_transaccion"  value="1">
                              <div class="form-group">
                                <label for="usuario">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" required autocomplete="off">
                              </div>
                               <div class="form-group">
                                <label for="usuario">Direcci&oacute;n:</label>
                                <input type="text" class="form-control" id="direccion" name="direccion" placeholder="Direcci&oacute;n" required autocomplete="off">
                              </div>
                                <div class="form-group">
                                <label for="usuario">Contacto:</label>
                                <input type="text" class="form-control" id="contacto" name="contacto" placeholder="Contacto" required autocomplete="off">
                              </div>
                              
                              <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-floppy-o"></i> Guardar</button>
                            </form>
                        </div>
                    </div>
                    <div id="menu1" class="tab-pane fade">
                        <div class="col-md-6 col-md-offset-3">
                            
                            
                            <h3>Buscar y Modificar Sucursal</h3>
                            </br>
                            <form id="buscarUsuario">
                                <input type="hidden" name="tabla" id="tabla" value="usuario">
                                <input type="hidden" name="id_usuario_creacion"  value="N">
                                <input type="hidden" name="estado"  value="A">
                                <input type="hidden" name="tipo_transaccion"  value="1">
                              <div class="form-group">
                                <label for="usuario">Nombre:</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" required autocomplete="off">
                              </div>
                               <div class="form-group">
                                <label for="usuario">Direcci&oacute;n:</label>
                                <input type="text" class="form-control" id="direccion" name="direccion" placeholder="Direcci&oacute;n" required autocomplete="off">
                              </div>
                                <div class="form-group">
                                <label for="usuario">Contacto:</label>
                                <input type="text" class="form-control" id="contacto" name="contacto" placeholder="Contacto" required autocomplete="off">
                              </div>
                              
                              <button type="submit" class="btn btn-outline btn-success"><i class="fa fa-search"></i> Buscar</button>
                            </form></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php require_once('../footer-comun-carpeta.html'); ?>
        <script type="text/javascript" src="../js/controlador/catalogo/alta_usuario.js" />
    </body>
</html>
<?php } ?>