$( document ).ready(function() {
    $("#idSucursal").empty();
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,false,'Cargando...','Seleccione una Sucursal');
});
$('#buscarYModificar').click(function(){
    console.log("fthf");
    $("#idSucursal2").empty();
    cargarDropDownList(("#idSucursal2"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,false,'Cargando...','Seleccione una Sucursal');
});
$("#listadoFijo").submit(function(){
    var datosTabla2 = {};
    datosTabla2['idSucursal'] = document.getElementById('idSucursal2').value;
    //console.warn(datosTabla2);
    cargarTabla(datosTabla2,10);
    return false;
});
$("#buscarArticulo").submit(function(){
    var datosTabla3 = {};
    datosTabla3['clave'] = document.getElementById('art_id').value;
    //console.warn(datosTabla2);
    cargarTabla2(datosTabla3,10);
    return false;
});
function cargarTabla(arregloConInputs,idTransaccion) {
    arregloConInputs['idTransaccion']=idTransaccion;
    $("#resultados2").hide();
    var tbody = $("#resultados2 tbody").empty();
    exitoso = function(result){
        if(result.estado!=undefined){
            if(result.estado =='warning'){
                notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.data.forEach( function(element, index) {
            find = true;
            var tr = $("<tr class='text-center' ></tr>");
            var idSucursal = element['art_id'];
            var clave = element['clave'];
            var descripcion = element['descripcion'];
            var eliminar = $("<button></button>",{class:'btn btn-danger'});
            var icono_eliminar = $("<i></i>",{class:'fa fa-minus-square'});
            eliminar.append(icono_eliminar);
            eliminar.append(" Eliminar");
            $(eliminar).click(function(){
                BootstrapDialog.confirm({
                    title: 'Advertencia',
                    message: 'Esta apunto de eliminar el artículo '+descripcion+'. \n \n ¿Desea Continuar?',
                    size: BootstrapDialog.SIZE_LARGE,
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: false, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
                    btnOKLabel: 'Continuar', // <-- Default value is 'OK',
                    btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
                    callback: function(result) {
                        // result will be true if button was click, while it will be false if users close the dialog directly.
                        if(result) {
                           notificacionSuccess('Se ha eliminado correctamente');
                            $(tr).remove();
                            arregloConInputs['parametro']=document.getElementById('idSucursal2').value;
                            arregloConInputs['valor']=idSucursal;
                            peticionAjax(API_SYS_PATH + 'parametros/eliminarListaFija', arregloConInputs, exitoso, fallo);
                        }else {

                        }
                    }
                });

            });
            agregarTDaTR(tr,idSucursal);
            agregarTDaTR(tr,clave);
            agregarTDaTR(tr,descripcion);
            agregarTHaTR(tr,eliminar);
            $(tbody).append(tr);
        });

        if(find){
            $('#resultados2').show();
        }
    };
    fallo = function(datos){
        console.log(datos);
    };
    arregloConInputs['bandera']='1';
    peticionAjax(API_SYS_PATH+'parametros/seleccionarListaFija',arregloConInputs,exitoso,fallo);
    return false;
}
function cargarTabla2(arregloConInputs,idTransaccion) {
    arregloConInputs['idTransaccion']=idTransaccion;
    $("#resultados").hide();
    var tbody = $("#resultados tbody").empty();
    exitoso = function(result){
        if(result.estado!=undefined){
            if(result.estado =='warning'){
                notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.data.forEach( function(element, index) {
            find = true;
            var tr = $("<tr class='text-center' ></tr>");
            var idSucursal = element['art_id'];
            var clave = element['clave'];
            var descripcion = element['descripcion'];
            var agregar = $("<button></button>",{class:'btn btn-success'});
            var icono_agregar = $("<i></i>",{class:'fa fa-check-square-o'});
            agregar.append(icono_agregar);
            agregar.append(" Agregar");
            $(agregar).click(function(){
                BootstrapDialog.confirm({
                    title: 'Advertencia',
                    message: 'Esta apunto de agregar el artículo '+descripcion+'. \n \n ¿Desea Continuar?',
                    size: BootstrapDialog.SIZE_LARGE,
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: false, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
                    btnOKLabel: 'Continuar', // <-- Default value is 'OK',
                    btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
                    callback: function(result) {
                        // result will be true if button was click, while it will be false if users close the dialog directly.
                        if(result) {
                            notificacionSuccess('Se ha agregado correctamente');
                            $(tr).remove();
                            arregloConInputs['parametro']=document.getElementById('idSucursal').value;
                            arregloConInputs['valor']=idSucursal;
                            arregloConInputs['usuario']=document.getElementById('usuario').value;
                            peticionAjax(API_SYS_PATH + '/parametros/insertarListaFija', arregloConInputs, exitoso, fallo);
                        }else {

                        }
                    }
                });

            });
            agregarTDaTR(tr,idSucursal);
            agregarTDaTR(tr,clave);
            agregarTDaTR(tr,descripcion);
            agregarTHaTR(tr,agregar);
            $(tbody).append(tr);
        });

        if(find){
            $('#resultados').show();
        }
    };
    fallo = function(datos){
        console.log(datos);
    };
    arregloConInputs['art_id']=document.getElementById('art_id').value;
    arregloConInputs['idSucursal']=document.getElementById('idSucursal').value;
    peticionAjax(API_SYS_PATH+'articulo/seleccionarListaFija',arregloConInputs,exitoso,fallo,'Buscando');
    return false;
}
