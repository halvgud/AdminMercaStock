$('#buscarYModificar').click(function(){
    console.log("fthf");
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,false,'Cargando...','Seleccione una Sucursal');
});
$("#listadoFijo").submit(function(){
    var datosTabla2 = {};
    datosTabla2['idSucursal'] = document.getElementById('idSucursal').value;
    //console.warn(datosTabla2);
    cargarTabla(datosTabla2,10);
    return false;
});
function cargarTabla(arregloConInputs,idTransaccion) {
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
            var editar = $("<button></button>",{class:'btn btn-primary'});
            var icono_editar = $("<i></i>",{class:'fa fa-pencil-square-o'});
            editar.append(icono_editar);
            editar.append(" Editar");
            $(editar).click(function(){
                editarSucursal(element,tr);
            })
            agregarTDaTR(tr,idSucursal);
            agregarTDaTR(tr,clave);
            agregarTDaTR(tr,descripcion);
            agregarTHaTR(tr,editar);
            $(tbody).append(tr);
        });

        if(find){
            $('#resultados').show();
        }
    };
    fallo = function(datos){
        console.log(datos);
    };
    peticionAjax(API_SYS_PATH+'parametros/seleccionarListaFija',arregloConInputs,exitoso,fallo,'Buscando');
    return false;
}
