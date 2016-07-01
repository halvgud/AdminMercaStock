$(function(){
    $.datetimepicker.setLocale('es');
    var fechaIni=$('#fechaInicio');
    var fechaFin=$('#fechaFin');
    fechaIni.datetimepicker({
        theme:'dark',
        format:'Y-m-d',
        onShow:function( ){
            this.setOptions({
                maxDate:fechaFin.val()?fechaFin.val():false
            })
        },
        timepicker:false
    });
    fechaFin.datetimepicker({
        theme:'dark',
        format:'Y-m-d ',
        onShow:function(  ){
            this.setOptions({
                minDate:fechaIni.val()?fechaIni.val():false
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
    var columnas = [{ data : "idBitacora" },
        { data : "idError" },
        { data : "descripcion" },
        { data : "usuario" },
        { data : "fecha" }];
    Funcion.peticionAjaxDT('bitacora/seleccionar',('#test'),datosTabla1,columnas,null);
    return false;
});