jQuery(function(){
    $.datetimepicker.setLocale('es');

    jQuery('#hora_inicio').datetimepicker({

        theme:'dark',
        format:'Y-m-d',
        onShow:function( ct ){
            this.setOptions({
                maxDate:jQuery('#hora_fin').val()?jQuery('#hora_fin').val():false
            })
        },
        timepicker:false
    });
    jQuery('#hora_fin').datetimepicker({
        theme:'dark',
        format:'Y-m-d ',
        onShow:function( ct ){
            this.setOptions({
                minDate:jQuery('#hora_inicio').val()?jQuery('#hora_inicio').val():false
            })
        },
        timepicker:false
    });
});
$("#fecha").submit(function(){
    //$("#test").dataTable().fnDestroy();
    var form1 = $("#fecha").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var datos= (datosTabla1);
    var columnas = [{ data : "idBitacora" },
        { data : "idError" },
        { data : "descripcion" },
        { data : "usuario" },
        { data : "fecha" }];
    peticionAjaxDT('reporte/bitacora/seleccionar',('#test'),datosTabla1,columnas,null);
return false;

});