var contador = 0;
$("#guardarSucursal").submit(function(){
    var form1 = $("#guardarSucursal").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    // datosTabla1['fecha_alta'] = moment().format("YYYY/MM/DD HH:mm:ss");
    exitoso = function(datos){
        console.log(datos);
        notificacionSuccess(datos.success);
        $("#guardarSucursal")[0].reset();
        contador = 0;
    };
    fallo = function(datos){
        console.log(datos);
        notificacionError(datos.error);
    };
    peticionAjax(API_SYS_PATH+'sucursal/insertar',datosTabla1,exitoso,fallo);

    return false;
});
