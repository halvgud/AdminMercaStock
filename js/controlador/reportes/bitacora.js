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
    var form1 = $("#fecha").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
            $('#test').dataTable( {

                ajax:{
                    "url": API_SYS_PATH + 'reporte/bitacora/seleccionar',
                    /*"dataSrc": "datos",*/
                    "type": "POST",

                    "data":JSON.stringify(datosTabla1),
                    dataType: 'json'
             /* function(){
                    peticionAjax(API_SYS_PATH + 'reporte/bitacora/seleccionar',datosTabla1,exitoso,fallo);
                    }*/
                },
                columns: [
                    { data : "idBitacora" },
                    { data : "idError" },
                    { data : "descripcion" },
                    { data : "usuario" },
                    { data : "fecha" }
                ]
            });
return false;

});