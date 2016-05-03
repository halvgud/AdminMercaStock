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
         /*   var datos={};
            datos = result.datos;
            var arr = [];
            for (var prop in datos) {
                arr.push(datos[prop]);
            }
            console.log(result.datos);*/
    var form1 = $("#fecha").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
            var prueba ={Json: {idBitacora: "1", idError: "99", descripcion: "Id ya existente", usuario: "Usuario 1", fecha: "2016-05-03 07:38:01"}};
           // console.log(prueba);
            $('#test').dataTable( {
                ajax:{
                    "url": API_SYS_PATH + 'reporte/bitacora/seleccionar',
                    "type": "POST",
                    //"query": postQuery,
                    "data":JSON.stringify(datosTabla1),
                    dataType: 'json'

                },
                columns: [
                    { datos : "idBitacora" },
                    { datos : "idError" },
                    { datos : "descripcion" },
                    { datos : "usuario" },
                    { datos : "fecha" }
                ]
            });


});