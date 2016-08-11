<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$path = "/adminmercastock/";
if(!isset($_SESSION['idUsuario'])){
    if (strpos( $_SERVER['HTTP_USER_AGENT'],'Trident')){
        //echo 'no valido';
        require_once('/login.php');
    }
    else{
        // echo $_SERVER['HTTP_USER_AGENT'];
        require_once('/login.php');
    }
}
else{
    header('Authorization:'.$_SESSION['ClaveAPI']);
    ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <?php require_once('/header-comun.html'); ?>
        <?php require_once('/footer-comun.html'); ?>

    </head>

    <body>

    <div id="wrapper">
        <?php require_once('/menu.php'); ?>
        <div id="page-wrapper">
            <div class="row" id="splash">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
                </div>
            </div>
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->


        <script>
            var seguridad = false;
            API_TOKEN = "<?php echo $_SESSION['ClaveAPI'];?>";

            function cambiarUrl(pagina, bandera, seguridad1) {
                if (seguridad == false) {
                    mostrarDialogo(pagina, bandera);
                } else {
                    BootstrapDialog.confirm({
                        title: 'Advertencia',
                        message: 'Esta apunto de salir, se perderán los cambios. \n \n ¿Desea Continuar?',
                        size: BootstrapDialog.SIZE_LARGE,
                        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                        closable: false, // <-- Default value is false
                        draggable: true, // <-- Default value is false
                        btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
                        btnOKLabel: 'Continuar', // <-- Default value is 'OK',
                        btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
                        callback: function(result) {
                            if (result) {
                                mostrarDialogo(pagina, bandera);
                                seguridad = false;
                            } else {}
                        }
                    });

                }
                seguridad = seguridad1 != undefined ? seguridad1 : false;
            }

            function mostrarDialogo(pagina, bandera) {
                Funcion.mostrarDialogoDeEspera("Cargando página");
                $.get("<?php echo $path;?>" + pagina, function(data) {
                    history.pushState("", document.title, window.location.pathname);
                    $("#page-wrapper").replaceWith(data);
                    if (bandera == undefined) {
                        BootstrapDialog.closeAll();
                    }
                    console.log('entro');
                });
                seguridad = true;
            }


            $(function() {
                SucursalEstadistica.Estadistica();
                SucursalTiempo.Estadistica();
            });


            var divDePanel = $("<div></div>", {'class': 'panel panel-default'});
            var divBodyPanelNotificacion = $("<div></div>", {'class': 'panel-body'});
            class SucursalTiempo {
                static Estadistica() {
                    var arreglo2 = {};
                    arreglo2['idGenerico'] = true;
                    var generarPanelConSucursal = function(result) {
                        if (result.data.length > 0) {
                            var divDeColumna = $("<div></div>", {'class': 'col-md-6'});
                            var divDePanelHeading = $("<div></div>", {'class': 'panel-heading'});
                            var elementoI = $("<i></i>", {'class': 'fa fa-bar-chart-o fa-fw'}).append('Tiempos');
                            var divSucursal = $("<div></div>", {'class': 'pull-right'});
                            var divBotones = $("<div></div>", {'class': 'btn-group'});
                            var botonToggle = $("<button></button>", {'class': 'btn btn-default btn-xs dropdown-toggle',
                                'data-toggle': 'dropdown','type': 'button'}).append('Sucursal');
                            var spanButton = $("<span></span>", {'class': 'caret'});
                            var ulDropDown = $("<ul></ul>", {'class': 'dropdown-menu pull-right','role': 'menu'});
                            botonToggle.append(spanButton);
                            divBotones.append(botonToggle);
                            var primero = false;
                            var idSucursal = 0;
                            result.data.forEach(function(element) {
                                if (!primero) {
                                    idSucursal = element['idSucursal'];
                                    primero = true;
                                }
                                var liSucursal = $("<li></li>");
                                var aSucursal = $("<a></a>", {href: '#' + element['idSucursal'],
                                    'onclick': "SucursalTiempo.obtenerDetalle(" + element['idSucursal'] + ")"})
                                    .append(element['nombre']);
                                liSucursal.append(aSucursal);
                                ulDropDown.append(liSucursal);
                            });
                            divBotones.append(ulDropDown);
                            divSucursal.append(divBotones);
                            divDePanelHeading.append(elementoI);
                            divDePanelHeading.append(divSucursal);
                            divDePanel.append(divDePanelHeading);
                            divDeColumna.append(divDePanel);
                            $("#splash").append(divDeColumna);
                            SucursalTiempo.obtenerDetalle(idSucursal);
                        }
                    };
                    var falloSucursal = function(result) {};
                    Funcion.peticionAjax(API_SYS_PATH + "sucursal/seleccionar", arreglo2, generarPanelConSucursal, falloSucursal);
                }
                static obtenerDetalle(idSucursal) {
                    divBodyPanelNotificacion.empty();
                    var arreglo3 = {};
                    arreglo3['idSucursal'] = idSucursal;
                    var successDetalle = function(resultado) {
                        var divListaGrupo = $("<div></div>", {'class': 'list-group'});
                        if (resultado.data.length > 0) {
                            resultado.data.forEach(function(element) {
                                var aItemDeLista = $("<a></a>", {'href': '#','class': 'list-group-item'});
                                var iItemLista = $("<i></i>", {'class': 'fa ' + element['icono'] + ' fa-fw'}); //icono
                                var spanItemLista = $("<span></span>", {'class': 'pull-right text-muted small'});
                                var emItemLista = $("<em></em>").append(element['tiempoRestante']
                                    + "/" + element['tiempoDefinido'] + " min &nbsp;");
                                var spanItemLista2 = $("<span></span>", {'class': 'pull-right text-muted small'});
                                var emItemLista2 = $("<em></em>",{'style':'font-size:8px'}).append('<br>última act:' + element['fechaActualizacion']);
                                spanItemLista.append(emItemLista);
                                spanItemLista.append(emItemLista2);
                                aItemDeLista.append(iItemLista);
                                aItemDeLista.append(element['descripcion']);
                                aItemDeLista.append(spanItemLista);
                                aItemDeLista.append(spanItemLista2);
                                divListaGrupo.append(aItemDeLista);
                            });
                        }
                        divBodyPanelNotificacion.append(divListaGrupo);
                        divDePanel.append(divBodyPanelNotificacion);

                    };
                    var failDetalle = function(resultado) {};
                    Funcion.peticionAjax(API_SYS_PATH + "general/dashboard/tiempo", arreglo3, successDetalle, failDetalle);
                }
            }
            class SucursalEstadistica {
                static Estadistica() {
                    var arreglo = {};
                    /**
                     * @param {{estado:string}} result
                     * @param {{success:string}} result
                     */
                    var success = function(result) {
                        if (typeof(result.estado) != 'undefined') {
                            if (result.estado == 'warning') {
                                Funcion.notificacionWarning(result.success);
                                return;
                            }
                        }
                        if (result.data.length > 0) {
                            var divDeClase = $("<div></div>", {'class': 'col-md-4'});
                            var divPanel = $("<div></div>", {'class': 'panel panel-default'});
                            var divPanelHeading = $("<div></div>", {'class': 'panel-heading'});
                            var iTitulo = $("<i></i>", {'class': 'fa fa-bar-chart-o fa-fw'}).append('Sucursales');
                            var divBody = $("<div></div>", {'class': 'panel-body'});
                            result.data.forEach(function(element) {
                                var parrafo = $("<p></p>").append(element['nombreSucursal'] + " al: "
                                    + element['porcentaje'] + "%");
                                var strong = $("<strong></strong>", {'class': 'pull-right text-muted'});
                                var span = $("<span></span>");
                                var color = '';
                                if (element['porcentaje'] <= 25) {
                                    color = 'danger';
                                } else if (element['porcentaje'] <= 50 && element['porcentaje'] > 25) {
                                    color = 'warning';
                                } else if (element['porcentaje'] <= 75 && element['porcentaje'] > 50) {
                                    color = 'info';
                                } else if (element['porcentaje'] <= 100 && element['porcentaje'] > 75) {
                                    color = 'success';
                                }
                                var divDeProgress = $("<div></div>", {'class': 'progress progress-striped active'});
                                var divProgressInfo = $("<div></div>", {'class': 'progress-bar progress-bar-' + color,
                                    role: "progressbar",'aria-valuenow': element['inventarioActual'],'aria-valuemin': 0,
                                    'aria-valuemax': element['inventarioTotal'],style: "width: " +
                                    element['porcentaje'] + "%"});

                                divDeProgress.append(divProgressInfo);
                                parrafo.append(strong);
                                parrafo.append(span);
                                divBody.append(parrafo);
                                divBody.append(divDeProgress);
                                divPanelHeading.append(iTitulo);
                                divPanel.append(divPanelHeading);
                                divPanel.append(divBody);
                                divDeClase.append(divPanel);
                                $("#splash").append(divDeClase);
                            });
                        }
                    };
                    var fail = function(result) {};
                    Funcion.peticionAjax(API_SYS_PATH + "general/dashboard", arreglo, success, fail, "Cargando dashboard...");
                }
            }
        </script>
    </body>
    </html>
<?php } ?>