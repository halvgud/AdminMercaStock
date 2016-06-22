$(function() {
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', true, false, 'Buscando Sucursal...', 'Seleccione una Sucursal');
});

jQuery(function(){
    $.datetimepicker.setLocale('es');
    jQuery('#fechaInicio').datetimepicker({
        theme:'dark',
        format:'Y-m-d',
        onShow:function( ct ){
            this.setOptions({
                maxDate:jQuery('#fechaFin').val()?jQuery('#fechaFin').val():false
            })
        },
        timepicker:false
    });
    jQuery('#fechaFin').datetimepicker({
        theme:'dark',
        format:'Y-m-d ',
        onShow:function( ct ){
            this.setOptions({
                minDate:jQuery('#fechaInicio').val()?jQuery('#fechaInicio').val():false
            })
        },
        timepicker:false
    });
});

$("#inventario").submit(function(){
    /*
     var form1 = $("#venta").find("select,input").serializeArray();
     var datosTabla1 = {};
     form1.forEach(function(input) {
     datosTabla1[input.name] = input.value;
     });
     console.log(datosTabla1);
     var datos= (datosTabla1);
     var columnas = [{ data : "metodo" },
     { data : "Total" }];
     peticionAjaxDT('detalles_venta/seleccionar',('#total'),datosTabla1,columnas,null);
     return false;
     */
    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    console.log(datosTabla1);
    var datos= (datosTabla1);
    var columnas = [{ data : "idBitacora" },
        { data : "idError" },
        { data : "descripcion" },
        { data : "usuario" },
        { data : "fecha" }];
    peticionAjaxDT('bitacora/seleccionar',('#tabla'),datosTabla1,columnas,null);
    return false;

});