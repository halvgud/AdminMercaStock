var banderaGenerado=false;
var banderaGenerado2=false;
var dt;
var table;

$(function() {
    var idSucursalDropDownList=$('#idSucursal');
    var dateNow = new Date();
    var month = dateNow.getUTCMonth() + 1; //months from 1-12
    var day = dateNow.getUTCDate();
    var year = dateNow.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day;
    var fechaIni=$('#fechaInicio');
    var fechaFin=$('#fechaFin');
    Funcion.cargarDropDownList(
        ("#idSucursal"), /*nombre de objeto Jquery*/
        'idSucursal',/*id de sql*/
        'nombre',/*campo de descripcion*/
        API_SYS_PATH + 'sucursal/seleccionar', /*rest url*/
        true,/*idGenerico*/
        false,/*opcion de "Cargar Todos"*/
        'cargando', /*Dialogo de espera al hacer cambio...*/
        'Seleccione una Sucursal'/*Opción default e inicial*/
    );
    idSucursalDropDownList.change(function() {
        $("#tabla").find("tbody").empty();
    });
    $.datetimepicker.setLocale('es');

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
    $('#divDetalle').hide();
});//$(function()

$("#inventario").submit(function(){
    $("div.dt-buttons.btn-group").remove();
    $("#tablaDetalle").find("tbody").empty();
    $("#tabla").find("tbody").empty();
    if(banderaGenerado){
        $('#tabla').find('tbody').unbind('click');
        banderaGenerado=false;
    }
    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });

    Funcion.peticionAjaxDT({
        RestUrl:'ajuste/seleccionar/cabecero',
        DT:('#tabla'),
        datos:datosTabla1,
        arregloColumnas:[
            { data: "idSucursal" },/*id de la sucursal*/
            { data: "descripcionSucursal" },/*nombre de la sucursal*/
            { data: "fechaSolicitud" },/*fecha de la solicitud, no confundir con la fecha de respuesta*/
            { data: "cantidadTotalInventario" },/*cantidad en variedad de productos*/
            { data: "cantidadInventario"},/*cantidad en variedad de productos inventariados*/
            /*{ data: "cantidadTotal" }, *//*suma total en cantidad de productos por inventariar*/
            /*{ data: "cantidadInventariada"},*//*suma total en cantidad de productos inventariados*/
            /*{ data: "diferencia" },*//*diferencia entre lo inventariado y lo real*/
            { data: "costo"} /*costo en base al precio de compra*/
        ],
        loading:null,
        success:function(){
            banderaGenerado=true;
            llamarclic();

        },
        ocultarBusqueda:undefined,
        funcionDeColor:{Boton:true}});
    $('#divDetalle').show();
    return false;

});




$('#tabla tbody').on('click','tr',function(){
    if ($(this).hasClass('selected2')) {
        $(this).removeClass('selected2');
    }
    else {
        table.$('tr.selected2').removeClass('selected2');
        $(this).addClass('selected2');
    }
});


$('#tabla tbody').on('dblclick', 'tr', function(){
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }
    else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        if(banderaGenerado2){
            $('#detalle2').unbind('click');
            banderaGenerado2=false;
        }
        dt=Funcion.peticionAjaxDT({
            RestUrl:'ajuste/seleccionar/detalle',
            DT:('#tablaDetalle'),
            datos : {
                idSucursal:$('#idSucursal').val(),
                fecha     :table.row('.selected').data().fechaSolicitud
            },
            arregloColumnas:[
                { data : "fechaSolicitud" }, /*oculto*/
                { data : "idInventario"}, /*oculto*/
                { data : "descripcion" },
                { data : "existenciaEjecucion" },/*oculto*/
                { data : "existenciaRespuesta" },/*oculto*/
                { data : "cantidadDeVueltas"},
                { data : "diferencia"},
                { data : "costoActual" },
                { data : "costoAjuste" },
                { data : "edicion" },
                { data : "aplicar"}/*,"defaultContent": "<button class='btn btn-info'>Ajuste</button>"*/
               /* ,{
                    data:   "aplicar",
                    render: function ( data, type, row ) {
                        if ( type === 'display' ) {
                                return '<input type="checkbox" class="editor-active"/>';
                        }
                        return data;
                    },
                    className: "dt-body-center"
                }*/
            ], 'select': {
                'style': 'multi'
            },
            loading:null,
            funcionDeColor:{
                Boton:false,
                Posicion:1
            },
            columnDefs:[{
                'targets': -1,
                'checkboxes': {
                    'selectRow': true
                }
            },{
                'targets':[1,3,4],
                visible:false
              }
            ],
            rowCallBack:function( row, data ) {
                if (data.edicion === "EDICION") {
                    $(row).find('td:eq(-2)').html("<button class='btn btn-info'>Ajuste</button>");
                }else
                {
                    $(row).find('td:eq(-2)').html("<b>"+data.edicion+"</b>");
                }
                if(data.aplicarCheckbox==='1'){
                    $(row).find('input:eq(-1)').prop( 'checked',true );
                    $(row).addClass('selected');
                }else{
                    $(row).find('input:eq(-1)').prop( 'checked', false );
                    $(row).find('input:eq(-1)').prop( 'disabled','disabled');
                }

                /*if(data.aplicar ==='1'){
                    $(row).find('td:eq(-1)').html("<input type='checkbox' class='form-control' value='1' checked/><label>Ajuste</label>");
                }else{
                    $(row).find('td:eq(-1)').html("<input type='checkbox' class='form-control' value='0' disabled/><label>Ajuste</label>");
                }*/
            },
            success:function(){
                ajustar();
                banderaGenerado2=true;
/*
                $('#detalle2').click( function(e){


                });*/
            }
        });

        $('#divDetalle').show();

        return false;
    }

});
$('#tablaDetalle tbody').on( 'click', 'button', function () {
    var datatable=$('#tablaDetalle').DataTable();
    var datosRenglon = datatable.row($(this).parents('tr')).data();
    BootstrapDialog.confirm({
        title: 'Advertencia',
        message: 'Esta apunto de ajustar el artículo '+datosRenglon.descripcion+
        '\n\n existencia anterior:'+datosRenglon.existenciaEjecucion+
        '\n\n existencia nueva:'+datosRenglon.existenciaRespuesta +
        '\n \n ¿Desea Continuar?',
        size: BootstrapDialog.SIZE_LARGE,
        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: false, // <-- Default value is false
        draggable: true, // <-- Default value is false
        btnCancelLabel: 'Regresar', // <-- Default value is 'Cancel',
        btnOKLabel: 'Continuar', // <-- Default value is 'OK',
        btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
        callback: function(result) {
            // result will be true if button was click, while it will be false if users close the dialog directly.
            /* if(result) {
             Funcion.notificacionSuccess('Se ha eliminado correctamente');
             $(tr).remove();
             arregloConInputs['parametro']=document.getElementById('idSucursal2').value;
             arregloConInputs['valor']=idSucursal;
             Funcion.peticionAjax(API_SYS_PATH + 'parametros/eliminarListaFija', arregloConInputs, exitoso, fallo);
             }else {

             }*/
        }
    });
} );

function ajusteInventario(element,e){
    var form = element;
    var rows_selected = dt.column(-1).checkboxes.selected();
    // Iterate over all selected checkboxes
    $.each(rows_selected, function(index, rowId){
        // Create a hidden element
        console.log('1');
        $(form).append(
            $('<input>')
                .attr('type', 'hidden')
                .attr('name', 'id[]')
                .attr('data-token','token')
                .val(rowId)
        );
    });

    // Output form data to a console
    var form1 = $(form).find('input[type="hidden"]').serializeArray();
    console.log(form1);
    //  console.log("Form submission", $(form).serialize());
    // $('#detalle2').unbind('click');
    // Prevent actual form submission
    $("input[data-token='token']").remove();
    e.preventDefault();
}

function llamarclic() {
    table = $('#tabla').DataTable();
    $("div.dt-buttons.btn-group").append("<button id='detalle' name='detalle' class='btn btn-success'>Obtener Detalles</button>");

    $('#detalle').click(function () {
        $('#tabla tbody tr.selected2').dblclick();
    });

}
function ajustar() {
    table = $('#tablaDetalle').DataTable();
    var div  = $('#tablaDetalle_wrapper');

    div.find("div.dt-buttons.btn-group").append("<button id='detalle2' name='detalle2' class='btn btn-warning' onclick='ajusteInventario(this,event)'>Ajustar registros</button>");

    $('#detalle').click(function () {
        $('#tabla tbody tr.selected2').dblclick();
    });
   /* $('#seleccionarTodos').on('click', function(){
        // Check/uncheck all checkboxes in the table
        var rows = table.rows({ 'search': 'applied' }).nodes();
        console.log(rows);
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
    });*/
    /*$('#tablaDetalle tbody').on('change', 'input[type="checkbox"]', function(){
        // If checkbox is not checked
        if(!this.checked){
            var el = $('#seleccionarTodos').get(0);
            // If "Select all" control is checked and has 'indeterminate' property
            if(el && el.checked && ('indeterminate' in el)){
                // Set visual state of "Select all" control
                // as 'indeterminate'
                el.indeterminate = true;
            }
        }
    });*/


}
