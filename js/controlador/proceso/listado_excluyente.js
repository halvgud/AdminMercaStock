var estadoF = 'FALSE';

$(document).ready(function() {
    $("#divEstado").hide();
    $("#idSucursal").empty();
    Funcion.cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'Buscando Sucursales...', 'Seleccione una Sucursal');
    $("#idSucursal2").empty();
    Funcion.cargarDropDownList(("#idSucursal2"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'Buscando Sucursales...', 'Seleccione una Sucursal');
});

$("#listadoFijo").submit(function() {
    $("#resultados").find("tbody").empty();
    var datosTabla2 = {};
    datosTabla2['idSucursal'] = $('#idSucursal2').val();
    cargarTabla(datosTabla2, 10);
    return false;
});
$("#idSucursal").on('change',function(){
    $("#resultados").find("tbody").empty();
});
$("#idSucursal2").on('change',function(){
    $("#resultados2").find("tbody").empty();
    $('#divEstado').hide();
});


$("#buscarArticulo").submit(function() {
    var datosTabla3 = {};
    datosTabla3['clave'] = $('#art_id').val();
    cargarTabla2(datosTabla3, 10);
    return false;
});

$('#myonoffswitch').change(function(){
    var arreglo = {};
    /**
     * @param {{estado:string}} result
     * @param {{success:string}} result
     */
    var exitoso = function(result) {
        if (typeof(result.estado) != 'undefined') {
            if (result.estado == 'warning') {
                Funcion.notificacionWarning(result.success);
                //return;
            }
        }
    };
    var fallo = function(datos) {
        console.log(datos);
    };
    arreglo['valor'] = $('#idSucursal2').val();
    arreglo['excluyente'] = '1';
    arreglo['comentario'] = $('#myonoffswitch').check().val().toString().toUpperCase();
    Funcion.peticionAjax({Url:API_SYS_PATH + 'parametros/actualizarListaFija', datos:arreglo,success: exitoso,error: fallo});
});


function cargarTabla(arregloConInputs, idTransaccion) {
    arregloConInputs['idTransaccion'] = idTransaccion;
    var resultados2 = $('#resultados2');
    resultados2.hide();
    var tbody = resultados2.find("tbody").empty();
    /**
     * @param {{estado:string}} result
     * @param {{success:string}} result
     */
    var exitoso = function(result) {
        if (typeof(result.estado) != 'undefined') {
            if (result.estado == 'warning') {
                Funcion.notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.data.forEach(function(element) {
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
                            Funcion.notificacionSuccess('Se ha eliminado correctamente');
                            $(tr).remove();
                            arregloConInputs['parametro'] = $('#idSucursal2').val();
                            arregloConInputs['valor'] = idSucursal;
                            arregloConInputs['excluyentes'] = '1';
                            Funcion.peticionAjax({Url:API_SYS_PATH + 'parametros/eliminarListaFija', datos:arregloConInputs,success: exitoso,error: fallo});
                        } else {
                        }
                    }
                });
            });
            Funcion.agregarTDaTR(tr, idSucursal);
            Funcion.agregarTDaTR(tr, clave);
            Funcion.agregarTDaTR(tr, descripcion);
            Funcion.agregarTHaTR(tr, eliminar);
            $(tbody).append(tr);
        });
        traerEstado();
        if (find) {
            $('#resultados2').show();
        }
    };
    var fallo = function(datos) {
        console.log(datos);
    };
    arregloConInputs['idSucursal'] = $('#idSucursal2').val();
    arregloConInputs['excluyente'] = '1';
    Funcion.peticionAjax({Url:API_SYS_PATH + 'parametros/seleccionar/datos:lista/success:excluyente',error: arregloConInputs, exitoso, fallo});
    return false;
}

function traerEstado() {
    /**
     * @param {{estado:string}} result
     * @param {{success:string}} result
     */
    var exitoso = function(result) {
        if (typeof(result.estado) != 'undefined') {
            if (result.estado == 'warning') {
                Funcion.notificacionWarning(result.success);
                return;
            }
        }
        result.data.forEach(function(element) {
            estadoF = element['comentario'];
        });
        $('#myonoffswitch').check=Boolean(estadoF);

        var idSucursal2 = $('#idSucursal2');
        if (idSucursal2.val() != 0) {
            $('#divEstado').show();
        }
        else{
            $('#divEstado').hide();
        }
    };
    var fallo = function(datos) {
        console.log(datos);
    };
    var arregloEstado = {};
    arregloEstado['idSucursal'] = $('#idSucursal2').val();
    arregloEstado['excluyente'] = '1';
    Funcion.peticionAjax({Url:API_SYS_PATH + 'parametros/seleccionarEstado', datos:arregloEstado,success: exitoso,error: fallo});
}

function cargarTabla2(arregloConInputs, idTransaccion) {
    arregloConInputs['idTransaccion'] = idTransaccion;
    var resultados = $('#resultados');
    resultados.hide();
    var tbody = resultados.find("tbody").empty();
    /**
     * @param {{estado:string}} result
     * @param {{success:string}} result
     */
    var exitoso = function(result) {
        if (typeof(result.estado) != 'undefined') {
            if (result.estado == 'warning') {
                Funcion.notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.data.forEach(function(element) {
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
                            Funcion.notificacionSuccess('Se ha agregado correctamente');
                            $(tr).remove();
                            arregloConInputs['parametro'] = $('#idSucursal').val();
                            arregloConInputs['valor'] = idSucursal;
                            arregloConInputs['usuario'] = $('#usuario').val();
                            arregloConInputs['excluyente'] = '1';
                            Funcion.peticionAjax({Url:API_SYS_PATH + 'parametros/insertarListaFija', datos:arregloConInputs,success: exitoso,error: fallo});
                        } else {
                        }
                    }
                });
            });
            Funcion.agregarTDaTR(tr, idSucursal);
            Funcion.agregarTDaTR(tr, clave);
            Funcion.agregarTDaTR(tr, descripcion);
            Funcion.agregarTHaTR(tr, agregar);
            $(tbody).append(tr);
        });
        if (find) {
            $('#resultados').show();
        }
    };
    var fallo = function(datos) {
        console.log(datos);
    };
    arregloConInputs['art_id'] = $('#art_id').val();
    arregloConInputs['idSucursal'] = $('#idSucursal').val();
    Funcion.peticionAjax({Url:API_SYS_PATH + 'articulo/seleccionarListaFija', datos:arregloConInputs,success: exitoso,error: fallo, mensajeDeEspera:'Buscando Artículos...'});
    return false;
}