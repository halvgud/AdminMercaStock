
$(function() {
    $('#total').hide();
    $('#divDetalle').hide();
    $('#min, #max').keyup( function() {
        dt.draw();
    } );
    Funcion.cargarDropDownList(("#idSucursal"),
        'idSucursal',
        'nombre',
        API_SYS_PATH + 'sucursal/seleccionar',
        true,
        false,
        'Buscando Sucursal...',
        'Seleccione una Sucursal');
    $.datetimepicker.setLocale('es');
    var dateNow = new Date();
    var month = dateNow.getUTCMonth() + 1; //months from 1-12
    var day = dateNow.getUTCDate();
    var year = dateNow.getUTCFullYear();

    var newdate = year + "-" + month + "-" + day;
    var fechaIni=$('#fechaInicio');
    var fechaFin=$('#fechaFin');
    fechaIni.datetimepicker({
        theme:'dark',
        format:'Y-m-d',
        useCurrent: false,

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
        useCurrent: false,
        onShow:function(  ){
            this.setOptions({
                minDate:fechaIni.val()?fechaIni.val():false
            })
        },
        timepicker:false
    });
    fechaIni.val(newdate);
    fechaFin.val(newdate);
});

$("#inventario").submit(function(){
    if(banderaGenerado){
        $('#tabla').find('tbody').unbind('click');

        banderaGenerado=false;
    }

    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var columnas =[
        { data: "idSucursal" },
        { data: "nombre" },
        { data: "fecha" },
        { data: "total" },
        { data: "totalAcertado" },
        { data: "totalFallado" },
        { data: "costo"},
        { data: "bandera"}
    ];
    var arregloBoton={Boton:true,Posicion:7};
    Funcion.peticionAjaxDT({
        RestUrl:'inventario/reporte/cabecero',
        DT:('#tabla'),
        datos:datosTabla1,
        arregloColumnas:columnas,
        loading:null,
        success:function(){
            banderaGenerado=true;
            llamarclic();

        },
        ocultarBusqueda:undefined,
        funcionDeColor:arregloBoton});
    $('#total').show();
    return false;

});

function llamarclic() {
    var table = $('#tabla').DataTable();
    $("div.dt-buttons.btn-group").append("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");
    $('#tabla tbody').on('dblclick', 'tr', function(){
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            dt=Funcion.peticionAjaxDT({
                RestUrl:'inventario/reporte/detalle',
                DT:('#tablaDetalle'),
                datos : {idSucursal:$('#idSucursal').val(),
                         fecha:table.row('.selected').data().fecha},
                arregloColumnas:[
                    { data : "fechaSolicitud" },
                    { data : "clave" },
                    { data : "descripcion" },
                    { data : "existenciaSolicitud" },
                    { data : "existenciaEjecucion" },
                    { data : "existenciaRespuesta" },
                    { data : "diferencia"},
                    { data : "costo"},
                    { data : "bandera" }
                ],
                loading:null,
                funcionDeColor:{
                    Boton:false,
                    Posicion:8
                }
            });
            $('#divDetalle').show();
            return false;
        }

    });

    $('#detalle').click(function () {

    });
}
var banderaGenerado=false;
var dt;
$('#idSucursal').on('change',function(){
    limpiarTablas()
});
$('#fechaInicio').on('change',function(){
    limpiarTablas()
});
$('#fechaFin').on('change',function(){
    limpiarTablas()
});

function limpiarTablas(){
    $('#total').hide();
    $('#divDetalle').hide();
    $('#detalle').hide();
}

$.fn.dataTable.ext.search.push(
    function( settings, data ) {

        var min = parseFloat( $('#min').val() );
        var max = parseFloat( $('#max').val() );
        var age = parseFloat( data[$('#idConcepto').val()] ) || 0; // use data for the age column
        console.log(age + "--"+min+"--"+max);
        return !!(( isNaN(min) && isNaN(max) ) ||
        ( isNaN(min) && age <= max ) ||
        ( min <= age && isNaN(max) ) ||
        ( min <= age && age <= max ));

    }
);




