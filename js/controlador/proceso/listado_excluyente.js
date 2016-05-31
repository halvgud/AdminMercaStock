var estadoF = 'FALSE';

$(document).ready(function() {
    $("#divEstado").hide();
    $("#idSucursal").empty();
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'Buscando Sucursales...', 'Seleccione una Sucursal');
    $("#idSucursal2").empty();
    cargarDropDownList(("#idSucursal2"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'Buscando Sucursales...', 'Seleccione una Sucursal');
});

$("#listadoFijo").submit(function() {
    var tbody = $("#resultados tbody").empty();
    var datosTabla2 = {};
    datosTabla2['idSucursal'] = $('#idSucursal2').val();
    cargarTabla(datosTabla2, 10);
    return false;
});

function limpiarTabla2() {
    var tbody = $("#resultados2 tbody").empty();
    $('#divEstado').hide();
}

function limpiarTabla1() {
    var tbody = $("#resultados tbody").empty();
}
$("#buscarArticulo").submit(function() {
    var datosTabla3 = {};
    datosTabla3['clave'] = $('#art_id').val();
    cargarTabla2(datosTabla3, 10);
    return false;
});

function cambiarEstado() {
    arreglo = {};
    exitoso = function(result) {
        if (result.estado != undefined) {
            if (result.estado == 'warning') {
                notificacionWarning(result.success);
                return;
            }
        }
    };
    fallo = function(datos) {
        console.log(datos);
    };
    arreglo['valor'] = $('#idSucursal2').val();
    arreglo['excluyente'] = '1';
    if ($('#myonoffswitch').check=false) {
        arreglo['comentario'] = 'FALSE';
        peticionAjax(API_SYS_PATH + 'parametros/actualizarListaFija', arreglo, exitoso, fallo);
    }
    if ($('#myonoffswitch').check=true) {
        arreglo['comentario'] = 'TRUE';
        peticionAjax(API_SYS_PATH + 'parametros/actualizarListaFija', arreglo, exitoso, fallo);
    }
}

function cargarTabla(arregloConInputs, idTransaccion) {
    arregloConInputs['idTransaccion'] = idTransaccion;
    $("#resultados2").hide();
    var tbody = $("#resultados2 tbody").empty();
    exitoso = function(result) {
        if (result.estado != undefined) {
            if (result.estado == 'warning') {
                notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.data.forEach(function(element, index) {
            find = true;
            var tr = $("<tr class='text-center' ></tr>");
            var idSucursal = element['art_id'];
            var clave = element['clave'];
            var descripcion = element['descripcion'];
            var eliminar = $("<button></button>", {
                class: 'btn btn-danger'
            });
            var icono_eliminar = $("<i></i>", {
                class: 'fa fa-minus-square'
            });
            eliminar.append(icono_eliminar);
            eliminar.append(" Eliminar");
            $(eliminar).click(function() {
                BootstrapDialog.confirm({
                    title: 'Advertencia',
                    message: 'Esta apunto de eliminar el artículo ' + descripcion + '. \n \n ¿Desea Continuar?',
                    size: BootstrapDialog.SIZE_LARGE,
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: false, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
                    btnOKLabel: 'Continuar', // <-- Default value is 'OK',
                    btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
                    callback: function(result) {
                        // result will be true if button was click, while it will be false if users close the dialog directly.
                        if (result) {
                            notificacionSuccess('Se ha eliminado correctamente');
                            $(tr).remove();
                            arregloConInputs['parametro'] = $('#idSucursal2').val();
                            arregloConInputs['valor'] = idSucursal;
                            arregloConInputs['excluyentes'] = '1';
                            peticionAjax(API_SYS_PATH + 'parametros/eliminarListaFija', arregloConInputs, exitoso, fallo);
                        } else {
                        }
                    }
                });
            });
            agregarTDaTR(tr, idSucursal);
            agregarTDaTR(tr, clave);
            agregarTDaTR(tr, descripcion);
            agregarTHaTR(tr, eliminar);
            $(tbody).append(tr);
        });
        traerEstado();
        if (find) {
            $('#resultados2').show();
        }
    };
    fallo = function(datos) {
        console.log(datos);
    };
    arregloConInputs['idSucursal'] = $('#idSucursal2').val();
    arregloConInputs['excluyente'] = '1';
    peticionAjax(API_SYS_PATH + 'parametros/seleccionar/lista/excluyente', arregloConInputs, exitoso, fallo);
    return false;
}

function traerEstado() {

    exitoso = function(result) {
        if (result.estado != undefined) {
            if (result.estado == 'warning') {
                notificacionWarning(result.success);
                return;
            }
        }
        result.data.forEach(function(element, index) {
            estadoF = result.data[0]['comentario'];
        });
        if (estadoF == 'FALSE') {
            $('#myonoffswitch').check=false;
        }
        if (estadoF == 'TRUE') {
            $('#myonoffswitch').check=true;
        }
        if ($('#idSucursal2').val() != 0) {
            $('#divEstado').show();
        }
        if ($('#idSucursal2').val() == 0) {
            $('#divEstado').hide();
        }
    };
    fallo = function(datos) {
        console.log(datos);
    };
    arregloEstado = {};
    arregloEstado['idSucursal'] = $('#idSucursal2').val();
    arregloEstado['excluyente'] = '1';
    peticionAjax(API_SYS_PATH + 'parametros/seleccionarEstado', arregloEstado, exitoso, fallo);
}

function cargarTabla2(arregloConInputs, idTransaccion) {
    arregloConInputs['idTransaccion'] = idTransaccion;
    $("#resultados").hide();
    var tbody = $("#resultados tbody").empty();
    exitoso = function(result) {
        if (result.estado != undefined) {
            if (result.estado == 'warning') {
                notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.data.forEach(function(element, index) {
            find = true;
            var tr = $("<tr class='text-center' ></tr>");
            var idSucursal = element['art_id'];
            var clave = element['clave'];
            var descripcion = element['descripcion'];
            var agregar = $("<button></button>", {
                class: 'btn btn-success'
            });
            var icono_agregar = $("<i></i>", {
                class: 'fa fa-check-square-o'
            });
            agregar.append(icono_agregar);
            agregar.append(" Agregar");
            $(agregar).click(function() {
                BootstrapDialog.confirm({
                    title: 'Advertencia',
                    message: 'Esta apunto de agregar el artículo ' + descripcion + '. \n \n ¿Desea Continuar?',
                    size: BootstrapDialog.SIZE_LARGE,
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: false, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
                    btnOKLabel: 'Continuar', // <-- Default value is 'OK',
                    btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
                    callback: function(result) {
                        if (result) {
                            notificacionSuccess('Se ha agregado correctamente');
                            $(tr).remove();
                            arregloConInputs['parametro'] = $('#idSucursal').val();
                            arregloConInputs['valor'] = idSucursal;
                            arregloConInputs['usuario'] = $('#usuario').val();
                            arregloConInputs['excluyente'] = '1';
                            peticionAjax(API_SYS_PATH + 'parametros/insertarListaFija', arregloConInputs, exitoso, fallo);
                        } else {
                        }
                    }
                });
            });
            agregarTDaTR(tr, idSucursal);
            agregarTDaTR(tr, clave);
            agregarTDaTR(tr, descripcion);
            agregarTHaTR(tr, agregar);
            $(tbody).append(tr);
        });
        if (find) {
            $('#resultados').show();
        }
    };
    fallo = function(datos) {
        console.log(datos);
    };
    arregloConInputs['art_id'] = $('#art_id').val();
    arregloConInputs['idSucursal'] = $('#idSucursal').val();
    peticionAjax(API_SYS_PATH + 'articulo/seleccionarListaFija', arregloConInputs, exitoso, fallo, 'Buscando Artículos...');
    return false;
}