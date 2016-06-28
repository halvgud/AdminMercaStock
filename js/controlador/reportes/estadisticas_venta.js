
$(function() {
    $('#total').hide();
    $('#divDetalle').hide();
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

$("#venta").submit(function(){
    if(banderaGenerado){
        $('#total tbody').unbind('click');

        banderaGenerado=false;
    }

    var form1 = $("#venta").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    console.log(datosTabla1);
    var datos= (datosTabla1);
    var columnas = [{ data : "mpa_id" },
        { data : "metodo" },
        { data : "Total" }];
    var success=function(resultado){
        banderaGenerado=true;
        llamarclic();

    };
    var arregloBoton={Boton:true};
    peticionAjaxDT('detalles_venta/seleccionar',('#total'),datosTabla1,columnas,null,success,false,arregloBoton);
    $('#total').show();
    return false;

});


function llamarclic() {
    var table = $('#total').DataTable();
    $("div.toolbar").html("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");
    console.log(table);
    $('#total tbody').on('click', 'tr', function(){
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
        var idMetodo=table.row('.selected').data().mpa_id;
        var datosTabla1 = {};
        /*var form1 = $("#venta").find("select,input").serializeArray();

        form1.forEach(function(input) {
            datosTabla1[input.name] = input.value;
        });*/
        datosTabla1['idSucursal']=$('#idSucursal').val();
        datosTabla1['fechaInicio']=$('#fechaInicio').val();
        datosTabla1['fechaFin']=$('#fechaFin').val();
        datosTabla1['idMetodo']=idMetodo;
        console.log(datosTabla1);
        var datos= (datosTabla1);
        var columnas = [{ data : "tic_id" },
            { data : "descripcion" },
            { data : "fecha" },
            { data : "total" }];


        peticionAjaxDT('detalles_venta/seleccionarDetalles',('#tablaDetalle'),datosTabla1,columnas,null,null);
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