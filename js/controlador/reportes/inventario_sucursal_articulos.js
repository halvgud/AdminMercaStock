
$(function() {
    $('#total').hide();
    $('#divDetalle').hide();
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', true, false, 'Buscando Sucursal...', 'Seleccione una Sucursal');
});
$(function(){
    $.datetimepicker.setLocale('es');
    jQuery('#fechaInicio').datetimepicker({
        theme:'dark',
        format:'Y-m-d',
        onShow:function( ct ){
            this.setOptions({
                maxDate:$('#fechaFin').val()?$('#fechaFin').val():false
            })
        },
        timepicker:false
    });
    jQuery('#fechaFin').datetimepicker({
        theme:'dark',
        format:'Y-m-d ',
        onShow:function( ct ){
            this.setOptions({
                minDate:$('#fechaInicio').val()?$('#fechaInicio').val():false
            })
        },
        timepicker:false
    });
});

$("#inventario").submit(function(){
    if(banderaGenerado){
        $('#tabla tbody').unbind('click');

        banderaGenerado=false;
    }

    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    console.log(datosTabla1);
    var datos= (datosTabla1);
    var columnas = [{ data : "idSucursal" },
        { data : "nombre" },
        { data : "fecha" },
        { data : "total" },
        { data : "totalAcertado" },
        { data : "totalFallado" },
        {data:"bandera"}
    ];
    var success=function(resultado){
        banderaGenerado=true;
        llamarclic();

    };
    var arregloBoton={Boton:true,Posicion:6};
    peticionAjaxDT('inventario/reporte/cabecero',('#tabla'),datosTabla1,columnas,null,success,undefined,arregloBoton);
    $('#total').show();
    return false;

});


function llamarclic() {
    var table = $('#tabla').DataTable();
    $("div.toolbar").html("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");
    console.log(table);
    $('#tabla tbody').on('click', 'tr', function(){
        console.log('contador');
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            console.log('remove');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            console.log('add');
        }
    });

    $('#detalle').click(function () {
        var fecha=table.row('.selected').data().fecha;
        var datosTabla1 = {};
        datosTabla1['idSucursal']=$('#idSucursal').val();
        datosTabla1['fecha']=fecha;
        var columnas = [{ data : "fechaSolicitud" },
            { data : "clave" },
            { data : "descripcion" },
            { data : "existenciaSolicitud" },
            { data : "existenciaEjecucion" },
            { data : "existenciaRespuesta" },
            { data : "bandera" }
        ];
//{ data : "bandera" }
        var arregloBoton={Boton:true,Posicion:6};
        peticionAjaxDT('inventario/reporte/detalle',('#tablaDetalle'),datosTabla1,columnas,null,undefined,undefined,arregloBoton);
        $('#divDetalle').show();
        return false;

        //table.row('.selected').remove().draw(false);
    });
}
var banderaGenerado=false;

function limpiarTablas(){
    $('#total').hide();
    $('#divDetalle').hide();
    $('#detalle').hide();
}