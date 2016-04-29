<?php

require_once "data/Roles.php";
require_once "data/PrivilegiosUsuario.php";
$decoded = PrivilegiosUsuario::traerPrivilegios();

     $path = "/ADMINMERCASTOCK";
if(!isset($_SESSION['idUsuario'])){
    //require_once('../index.php');
    header('Location: '.'index.php');
}else{
?>
    <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  
                    
                </button>
                <a class="navbar-brand" href="<?php echo $path;?>/index.php" data-toggle="collapse" data-target=".navbar-collapse"><!--<i class="fa fa-heartbeat"></i>-->
                <img src="<?php echo $path;?>/img/mstockicon.png" height="100%;" width="6%;" style="float: left"/> &nbsp;&nbsp;Sistema de Control de MercaStock</a>
            </div>
            <!-- /.navbar-header -->
            <ul class="nav navbar-top-links navbar-right">
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i> <?php print $_SESSION['usuario']; ?> <i class="fa fa-caret-down"> </i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="#" onClick="logout();"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li>
                            <a href="<?php echo $path;?>/index.php"><i class="fa fa-home fa-fw"></i> Dashboard</a>
                        </li>
<?php if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) { ?>

                        <li>
                            <a href="#"><i class="fa fa-th-list fa-fw"></i> Catálogo<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <?php if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) { ?>
                                <li>
                                    <a href="<?php echo $path;?>/catalogo/general.php"><i class="fa fa-plus fa-fw"></i>General</a>       
                             </li>
                                 <?php  } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                 <li>
                                    <a href="<?php echo $path;?>/catalogo/alta_usuario.php"><i class="fa fa-user-plus fa-fw"></i>Alta de Usuario</a>
                                </li>
                                <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                <li>
                                    <a href="<?php echo $path;?>/catalogo/alta_sucursal.php"><i class="fa fa-building fa-fw"></i>Alta de Sucursal</a>
                                </li>
                                <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                <li>
                                    <a href="<?php echo $path;?>/catalogo/permisos.php"><i class="fa fa-lock fa-fw"></i> Permisos</a>
                                </li>
                                <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                 <li>
                                    <a href="<?php echo $path;?>/catalogo/parametros.php"><i class="fa fa-wrench fa-fw"></i> Parametros</a>
                                </li>
                                 <?php } ?>
                            </ul>
                        </li>
                            <!-- /.nav-second-level -->
                        <?php }if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) { ?>
                        <li>
                            <!-- <i class="fa fa-bar-chart-o fa-fw"></i> -->
                            <a href="#"><i class="fa fa-cogs fa-fw"></i> Proceso<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                               
                                <?php if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                <li>
                                    <a href="<?php echo $path;?>/proceso/generar_inventario.php"><i class="fa fa-file-text-o fa-fw"></i>Generar Inventario</a>
                                </li>
                                <?php }?>
                                <!--<li>
                                    <a href="#"><i class="fa fa-plus-square fa-fw"></i> Medicamento <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                        <li>
                                            <a href="medicamento-nuevo.php"><i class="fa fa-plus fa-fw"></i> Nuevo</a>
                                        </li>
                                        <li>
                                            <a href="medicamento-edicion.php"><i class="fa fa-pencil-square-o fa-fw"></i> Edicion</a>
                                        </li>
                                    </ul>
                                    <!-- /.nav-third-level 
                                </li>-->
                          <!--  </ul>-->
                            <!-- /.nav-second-level -->
                            </ul>
                        </li>
<?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) { ?>

                        <li>
                            <!-- <i class="fa fa-bar-chart-o fa-fw"></i> -->
                            <a href="#"><i class="fa fa-database fa-fw"></i> Reportes<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <?php if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                <li>
                                    <a href="<?php echo $path;?>/reportes/estadisticas_venta.php"><i class="fa fa-area-chart fa-fw"></i>Estadísiticas por Venta</a>
                                </li>
                                <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                <li>
                                    <a href="<?php echo $path;?>/reportes/movimiento_articulos.php"><i class="fa fa-exchange fa-fw"></i>Movimiento de Artículos</a>
                                </li>
                                <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                <li>
                                    <a href="<?php echo $path;?>/reportes/existencias.php"><i class="fa fa-calendar-check-o fa-fw"></i>Existencias</a>
                                </li>
                                <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) {  ?>
                                  <li>
                                    <a href="<?php echo $path;?>/reportes/inventario_sucursal_articulos.php"><i class="fa fa-industry fa-fw"></i>Inventario por Sucursal / por Artículo</a>
                                </li>
                                  <?php }  ?>
                                <!--<li>
                                    <a href="#"><i class="fa fa-plus-square fa-fw"></i> Medicamento <span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                        <li>
                                            <a href="medicamento-nuevo.php"><i class="fa fa-plus fa-fw"></i> Nuevo</a>
                                        </li>
                                        <li>
                                            <a href="medicamento-edicion.php"><i class="fa fa-pencil-square-o fa-fw"></i> Edicion</a>
                                        </li>
                                    </ul>
                                    <!-- /.nav-third-level 
                                </li>-->
                           <!-- </ul>-->
                            <!-- /.nav-second-level -->
                            </ul>
                        </li>

<?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) { ?>
                        <!--<li>-->
                            <!-- <i class="fa fa-bar-chart-o fa-fw"></i> -->
                            <!--<a href="#"><i class="fa fa-file-text fa-fw"></i> Expediente M&eacute;dico<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="expediente-revisar-consulta.php"><i class="fa fa-calendar fa-fw"></i> Revisar Consultas</a>
                                </li>
                                <li>
                                    <a href="expediente-guardar.php"><i class="fa fa-file-text fa-fw"></i> Guardar Expediente</a>
                                </li>
                                <li>
                                    <a href="pase-salida.php"><i class="fa fa-file-text-o fa-fw"></i> Pase de Salida</a>
                                </li>
                            </ul>-->
                            <!-- /.nav-second-level -->
                       <!-- </li>-->
<?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) { ?>
                        <!--<li>-->
                            <!-- <i class="fa fa-bar-chart-o fa-fw"></i> -->
                            <!--<a href="#"><i class="fa fa-ambulance fa-fw"></i> Incapacidades<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="incapacidad-guardar.php"><i class="fa fa-file-o fa-fw"></i> Guardar Incapacidad</a>
                                </li>
                                <li>
                                    <a href="memo-guardar.php"><i class="fa fa-file fa-fw"></i> Guardar Memo</a>
                                </li>
                            </ul>-->
                            <!-- /.nav-second-level -->
                       <!-- </li>-->
<?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) { ?>
                       <!-- <li>-->
                            <!-- <i class="fa fa-bar-chart-o fa-fw"></i> -->
                            <!--<a href="#"><i class="fa fa-bar-chart-o fa-fw"></i></i> Reportes<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="reportes-inventario.php"><i class="fa fa-list fa-fw"></i> Inventario de Comida</a>
                                </li>
                                <li>
                                    <a href="reportes-consulta-rango-fecha.php"><i class="fa fa-calendar-check-o fa-fw"></i> Consultas Agendadas</a>
                                </li>
                                <li>
                                    <a href="reportes-visita-rango-fecha.php"><i class="fa fa-calendar-check-o fa-fw"></i> Visitas Agendadas</a>
                                </li>
                                <li>
                                    <a href="reportes-pase-por-fecha.php"><i class="fa fa-calendar-check-o fa-fw"></i> Pases de Salida Agendados</a>
                                </li>
                                <li>
                                    <a href="reportes-expediente-por-fecha.php"><i class="fa fa-calendar-check-o fa-fw"></i> Expedientes Agendados</a>
                                </li>
                                <li>
                                    <a href="reportes-incapacidad-por-fecha.php"><i class="fa fa-calendar fa-fw"></i> Incapacidades por Fecha</a>
                                </li>
                                <li>
                                    <a href="reportes-memo-por-fecha.php"><i class="fa fa-calendar fa-fw"></i> Memos por Fecha</a>
                                </li>
                                <li>
                                    <a href="reportes-Comida-rank.php"><i class="fa fa-list-ol fa-fw"></i> Rango de Uso de Medicamento</a>
                                </li>
                                <li>
                                    <a href="reportes-diagnosticos-rank.php"><i class="fa fa-list-ol fa-fw"></i> Rango de Diagnosticos</a>
                                </li>
                                <li>
                                    <a href="reportes-empleados-consultas.php"><i class="fa fa-list-alt fa-fw"></i> Consultas Empleados</a>
                                </li>
                                <li>
                                    <a href="reportes-empleados-visitas.php"><i class="fa fa-list-alt fa-fw"></i> Visitas Emmpleados</a>
                                </li>
                                <li>
                                    <a href="reportes-empleados-pases.php"><i class="fa fa-list-alt fa-fw"></i> Pases de Salida Emmpleados</a>
                                </li>
                            </ul>-->
                            <!-- /.nav-second-level -->
                        <!--</li>-->
                        
<?php } }?>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>