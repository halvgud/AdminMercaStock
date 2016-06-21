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
                <li><a href="#" onClick="cambiarContrasena();return false;"><i class="fa fa-wrench fa-fw"></i> Cambiar Contrase&ntilde;a</a>
                </li>
                <li><a href="#" onClick="logout();"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                </li>
            </ul>
            <!-- /.dropdown-user -->
        </li>
        <!-- /.dropdown -->
    </ul>
    <!-- /.navbar-top-links -->
    <input type="hidden" id="usuario" name="usuario" value="<?php print $_SESSION['usuario']; ?>">
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
                            <?php  if (PrivilegiosUsuario::tienePrivilegio($decoded,"CATEGORIA")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/catalogo/categoria.php')"><i class="fa fa-tags fa-fw"></i> Categorias</a>
                                </li>
                            <?php  } if (PrivilegiosUsuario::tienePrivilegio($decoded,"ARTICULO")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/catalogo/articulo.php');"><i class="fa fa-cart-plus fa-fw"></i> Art&iacute;culos</a>
                                </li>
                            <?php  } if (PrivilegiosUsuario::tienePrivilegio($decoded,"DEPARTAMENTO")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/catalogo/departamento.php');"><i class="fa fa-tasks fa-fw"></i> Departamentos</a>
                                </li>
                            <?php  } if (PrivilegiosUsuario::tienePrivilegio($decoded,"ALTA_USUARIO")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/catalogo/alta_usuario.php');"><i class="fa fa-user-plus fa-fw"></i> Alta de Usuario</a>
                                </li>
                            <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"ALTA_SUCURSAL")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/catalogo/alta_sucursal.php');"><i class="fa fa-building fa-fw"></i> Alta de Sucursal</a>
                                </li>
                            <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"PERMISOS")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/catalogo/permisos.php','true');"><i class="fa fa-lock fa-fw"></i> Permisos</a>
                                </li>
                            <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"PARAMETROS")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/catalogo/parametros.php');"><i class="fa fa-wrench fa-fw"></i> Parametros</a>
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

                            <?php if (PrivilegiosUsuario::tienePrivilegio($decoded,"GENERAR_INVENTARIO")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/proceso/generar_inventario.php',true,true);"><i class="fa fa-file-text-o fa-fw"></i> Generar Inventario</a>
                                </li>
                            <?php }if (PrivilegiosUsuario::tienePrivilegio($decoded,"LISTADO_FIJO")) { ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/proceso/listado_fijo.php');"><i class="fa fa-link fa-fw"></i> Listado Fijo</a>
                                </li>
                            <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"LISTADO_EXCLUYENTE")) {  ?>
                            <li>
                                <a href="#" onclick="cambiarUrl('/proceso/listado_excluyente.php');"><i class="fa fa-ban fa-fw"></i> Listado Excluyente</a>
                            </li>
                        </ul>
                    </li>
                <?php }} if (PrivilegiosUsuario::tienePrivilegio($decoded,"DUMMY")) { ?>

                    <li>
                        <!-- <i class="fa fa-bar-chart-o fa-fw"></i> -->
                        <a href="#"><i class="fa fa-database fa-fw"></i> Reportes<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <?php if (PrivilegiosUsuario::tienePrivilegio($decoded,"ESTADISTICAS_VENTA")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/reportes/estadisticas_venta.php');"><i class="fa fa-area-chart fa-fw"></i> Estadísiticas por Venta</a>
                                </li>
                            <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"MOVIMIENTO_ARTICULOS")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/reportes/movimiento_articulos.php');"><i class="fa fa-exchange fa-fw"></i> Movimiento de Artículos</a>
                                </li>
                            <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"EXISTENCIAS")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/reportes/existencias.php');"><i class="fa fa-calendar-check-o fa-fw"></i> Existencias</a>
                                </li>
                            <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"INVENTARIO_SUCURSAL_ARTICULOS")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/reportes/inventario_sucursal_articulos.php');"><i class="fa fa-industry fa-fw"></i> Inventario por Sucursal / por Artículo</a>
                                </li>
                            <?php } if (PrivilegiosUsuario::tienePrivilegio($decoded,"BITACORA")) {  ?>
                                <li>
                                    <a href="#" onclick="cambiarUrl('/reportes/bitacora.php');"><i class="fa fa-calendar fa-fw"></i> Bit&aacute;cora</a>
                                </li>
                            <?php }  ?>
                        </ul>
                    </li>
                <?php }  }?>
            </ul>
        </div>
        <!-- /.sidebar-collapse -->
    </div>
    <!-- /.navbar-static-side -->
</nav>