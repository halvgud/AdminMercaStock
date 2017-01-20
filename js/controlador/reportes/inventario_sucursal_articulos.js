
$(function() {
    $('#divCabecero').hide();
    $('#divDetalle').hide();
    $('#divCabecero2').hide();
    $('#divDetalle2').hide();
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
    Funcion.cargarDropDownList(('#concepto'),
        'idConcepto',
        'concepto',
        API_SYS_PATH+'concepto/reporte',
        true,
        false,
        'Cargando Conceptos');
    $.datetimepicker.setLocale('es');
    var dateNow = new Date();
    var month = dateNow.getUTCMonth() + 1; //months from 1-12
    var day = dateNow.getUTCDate();
    var year = dateNow.getUTCFullYear();

    var newdate = year + "-" + month + "-" + day;
    var month2 = month==1?month:month-1;
    var day2 = month==1?1:day;
    var newdate2 = year + "-" + month2 + "-" +day2;
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
    fechaIni.val(newdate2);
    fechaFin.val(newdate);
    $.fn.editable.defaults.mode = 'inline';
});

function invocarColumnasCabecero(idConcepto){
    switch(idConcepto){
        case '1':
        case '2':
            var array1=[];

            array1=[
                { data: "idSucursal" },
                { data: "nombre" },
                { data: 'idInventarioExterno'},
                { data: "fecha" },
                { data: "total" },
                { data: "totalAcertado" },
                { data: "totalFallado" },
                { data: 'totalRestante'},
                { data: "costo"},
                { data: "bandera"},
                { data: 'detalle'},
                { data: 'cancelar'}
            ];
            return array1;
        break;
        case '3':
            var array=[];
            array=[{ data: "idSucursal" },
                { data: "nombre" },
                { data: 'idInventarioExterno'},
                { data: "fecha" },
                { data: "total" },
                { data: "totalAcertado" },
                { data: "totalFallado" },
                { data: 'totalRestante'},
                { data: "costo2"},
                { data: "bandera2"},
                { data: "costo"},
                { data: "bandera"},
                { data: 'detalle'},
                { data: 'cancelar'}];
            return array;
            break;
    }
}

function mostrarDetalle(idConcepto){
    switch(idConcepto){
        case 1:
            $('#divCabecero').show();
            $('#tabla').show();

            break;
        case 2:

            break;
        case 3:
            $('#divCabecero2').show();
            break;

    }
}
$("#inventario").submit(function(){
    Funcion.mostrarDialogoDeEspera("Cargando listas...");
    var concepto = $('#concepto').val();
    console.log(concepto);
    if(banderaGenerado){
        $('#tabla').find('tbody').unbind('click');
        banderaGenerado=false;
    }
    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var arregloBoton={PosicionColor:7,PosicionColor2:9};
    tablaCabecero= Funcion.peticionAjaxDT({
        RestUrl:'inventario/reporte/cabecero',
        DT:concepto=='3'?('#tabla2'):('#tabla')/*invocarTablaCabecero($('#concepto').val())*/,
        datos:datosTabla1,
        arregloColumnas:invocarColumnasCabecero(concepto),
        loading:null,
        success:function(){
            banderaGenerado=true;
            llamarclic();
            BootstrapDialog.closeAll();
        },
        rowCallBack:function(row, data){
            $(row).find('td:eq(-2)').html("<button class='btn btn-info'>Detalle</button>");
            $(row).find('td:eq(-1)').html("<button class='btn btn-danger'>Cancelar</button>");
            $(row).find('td:eq(0)').html("<a href='#'><strong>"+data.nombre+"</strong></a>");
            $(row).find('td:eq(0)').editable({
                type: 'text',
                name: 'nombre inventario',
                title: 'Ingresa un nombre al inventario'
            });
            $(row).on('click','.editable-submit',function(e){
                if(concepto=='1'){
                    e.stopPropagation();
                    var Val =$('#tabla').find('.input-sm').val();
                    var datosTabla = {};
                    datosTabla['idInventarioExterno']=data.idInventarioExterno;
                    datosTabla['nombre']=Val;
                    Funcion.peticionAjax({
                        Url:API_SYS_PATH+'inventario/nombre',
                        datos:datosTabla,
                        success:function(datos){
                            Funcion.notificacionSuccess(datos.success);
                            return false;
                        },
                        error:function(){}
                    });
                }
            });
        },
        columnDefs:[{
            targets:[0,2],
            visible:false
        }],
        funcionDeColor:arregloBoton});
    if(concepto=='3'){
        $('#divCabecero2').show();
        $('#tabla2').show();
        mostrarDetalle(concepto);
    }else{
        $('#divCabecero').show();
        $('#tabla').show();
        mostrarDetalle(concepto);
    }

    return false;
});

$('#tabla').find('tbody').on('click','tr',function(){
    if ($(this).hasClass('selected2')) {
        $(this).removeClass('selected2');
    }
    else {
        tablaCabecero.$('tr.selected2').removeClass('selected2');
        $(this).addClass('selected2');
    }
});
var tablaCabecero;
function invocarTabla(idConcepto){
    switch(idConcepto){
        case '1':
        case '2':return $('#tabla');break;
        case '3':return $('#tabla2');break;
    }
}
function invocarDatosPost(idConcepto,datosRenglon){
    var datosTabla={};
    console.log(datosRenglon);
    var idSucursal = $('#idSucursal').val();
    var fechaIni = $('#fechaInicio').val();
    var fechaFin = $('#fechaFin').val();
    switch(idConcepto){
        case '1':
            datosTabla['idSucursal']=idSucursal;
            datosTabla['fecha']=datosRenglon.fecha;
            datosTabla['busqueda']='%';
            datosTabla['idConcepto']=1;
            break;
        case '2':
            datosTabla['idSucursal']=idSucursal;
            datosTabla['fechaIni']=fechaIni;
            datosTabla['fechaFin']=fechaFin;
            datosTabla['busqueda']=datosRenglon.idSucursal;
            datosTabla['idConcepto']=2;
            break;
        case '3':
            datosTabla['idSucursal']=idSucursal;
            datosTabla['idConcepto']=3;
            datosTabla['busqueda']=datosRenglon.idSucursal;
            break;
    }
    return datosTabla;
}
function invocarArregloColumnas(idConcepto){
    console.log(idConcepto);
    switch(idConcepto){
        case '1':
        case '2':
        return [
            {data:null,"defaultContent": ''},
            {data: "art_id"},
            {data: "fechaSolicitud"},
            {data: 'idDepartamento'},
            {data: "departamento"},
            {data: "clave"},
            {data: "descripcion"},
            {data: "existenciaSolicitud"},
            {data: "existenciaEjecucion"},
            {data: 'existencia'},
            {data: "existenciaRespuesta"},
            {data: "diferencia"},
            {data: "costo"},
            {data: "bandera"},
            {data: "edicion"}
        ];break;
        case '3':
            return [
                {
                    "class":          'details-control',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": ''
                },
                {data: "art_id"},
                {data: "fechaSolicitud"},
                {data: 'idDepartamento'},
                {data: "departamento"},
                {data: "clave"},
                {data: "descripcion"},
                {data: "existenciaSolicitud"},
                {data: "existenciaEjecucion"},
                {data: 'existencia'},
                {data: "existenciaRespuesta"},
                {data: "diferencia"},
                {data: "costo"},
                {data: "bandera"},
                {data: "edicion"}
                ];
            break;
    }
}
var _COLUMNA_ID_=1;
var _COLUMNA_ID_DEPARTAMENTO_=3;
var _COLUMNA_DEPARTAMENTO_=4;

var _COLUMNA_CANTIDAD_SOLICITADA=7;
var _COLUMNA_CANTIDAD_SISTEMA=8;
var _COLUMNA_CANTIDAD_ACTUAL_SISTEMA_=9;
var _COLUMNA_CANTIDAD_FISICA_=10;
var _COLUMNA_DIFERENCIA_=11;
var _COLUMNA_COSTO_=12;
var _COLUMNA_PORCENTAJE_=13;
function llamarclic() {
    var concepto = $('#concepto').val();
    var idSucursal = $('#idSucursal');
    var fechaIni=$('#fechaInicio').val();
    var fechaFin=$('#fechaFin').val();
    if(concepto=='3'){
        var table = $('#tabla2');
    }else{
        table = $('#tabla');
    }
    var datatable = table.DataTable();
        table.find('tbody').on('click','button.btn-info',function(){
            var datosRenglon = datatable.row($(this).parents('tr')).data();
            tablaCabecero.$('tr.selected').removeClass('selected');
            Funcion.mostrarDialogoDeEspera("Cargando...");
            var datosTabla = invocarDatosPost(concepto,datosRenglon);
            dt=Funcion.peticionAjaxDT({
                RestUrl: 'inventario/reporte/detalle',
                DT: ('#tablaDetalle'),
                datos: datosTabla,
                arregloColumnas: invocarArregloColumnas(concepto),
                loading: null,
                funcionDeColor: {
                    Boton: false,
                    PosicionColor:9,
                    PosicionOrden:2
                },
                columnDefs:[{
                    targets:[_COLUMNA_ID_,_COLUMNA_ID_DEPARTAMENTO_,_COLUMNA_DEPARTAMENTO_,_COLUMNA_CANTIDAD_SOLICITADA],
                    visible:false
                }],
                initComplete:function(){
                var div = $('#tablaDetalle_wrapper');
                    var idSucursal = $("#idSucursal").val();
                    switch(concepto){
                        case '1':
                            div.find("#tablaDetalle_filter")
                                .prepend("<label for='idDepartamento'>Departamento:</label>" +
                                    "<select id='idDepartamento' name='idDepartamento' class='form-control' required></select>");
                            Funcion.cargarDropDownList(
                                ("#idDepartamento"),
                                'dep_id',
                                'nombre',
                                API_SYS_PATH + 'departamento/seleccionar',
                                idSucursal,
                                false,
                                'Buscando Departamentos...',
                                'TODOS');
                            console.log(this.api().column(3));
                            this.api().column(3).each(function() {
                                var column = this;
                                $('#idDepartamento').on('change', function() {
                                    var val = $(this).val();
                                    column.search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });
                            });
                            break;
                        case '2':
                            div.find("#tablaDetalle_filter")
                                .prepend("<label for='idCategoria'>Categoria</label> " +
                                    "<select id='idCategoria' name='idCategoria' class='form-control' required></select>");

                            var columnas = {
                                idSucursal:idSucursal,
                                dep_id: datosRenglon.idSucursal
                            };
                            if(idSucursal!='') {
                                Funcion.cargarDropDownList(("#idCategoria"), 'cat_id', 'nombre',
                                    API_SYS_PATH + 'categoria/seleccionar', columnas, false,
                                    'Buscando Categorias...', 'Seleccione una Categoria');
                            }
                            this.api().column(3).each(function() {
                                var column = this;
                                $('#idCategoria').on('change', function() {
                                    var val = $(this).val();
                                    column.search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });
                            });
                            break;
                        case 3:
                            div.find("#tablaDetalle2_filter")
                                .prepend("<label for='idCategoria'>Categoria</label>" +
                                    "<select id='idCategoria' name='idCategoria' class='form-control' required></select>");
                            var columnas2 = {
                                idSucursal:idSucursal,
                                dep_id: datosRenglon.idSucursal
                            };
                            if(idSucursal!='') {
                                Funcion.cargarDropDownList(("#idCategoria"), 'cat_id', 'nombre',
                                    API_SYS_PATH + 'categoria/seleccionar', columnas2, false,
                                    'Buscando Categorias...', 'Seleccione una Categoria');
                            }
                            this.api().column(3).each(function() {
                                var column = this;
                                $('#idCategoria').on('change', function() {
                                    var val = $(this).val();
                                    column.search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });
                            });
                            break;
                        default:
                    }
            },
                rowCallBack: function (row, data) {
                    if (data.edicion === "edicion") {
                        $(row).find('td:eq(-1)').html("<button class='btn btn-info'>Agregar</button>");
                    } else {
                        $(row).find('td:eq(-1)').html("<b>" + data.edicion + "</b>");
                    }

                    if(data.art_id2===null){
                        $(row).find('.details-control').removeClass('details-control');
                    }
                    BootstrapDialog.closeAll();
                },
                drawCallback:function(){
                    var api = this.api();
                    var rows = api.rows( {page:'current'} ).nodes();
                    var last=null;
                    api.column(4, {page:'current'} ).data().each( function ( group, i ) {
                        if ( last !== group ) {
                            $(rows).eq( i ).before(
                                '<tr class="even selected"><td colspan="11">'+group+'</td></tr>'
                            );
                            last = group;
                        }
                    });
                }
            });
            $('#divDetalle').show();
            $('#tablaDetalle').show();

            return false;
    });
        table.find('tbody').on('click','button.btn-danger',function(){
            var datosRenglon = datatable.row($(this).parents('tr')).data();
            var idSucursal = $('#idSucursal');
            BootstrapDialog.show({
                title: "Cancelar orden de inventario",
                message: function() {
                    return "Al cancelar la orden de inventario, solo se cancelarán los productos que no han sido \nprocesados" +
                            " por lo que para el listado actual y MercaStock desaparecerán y podrá generarlos nuevamente. " +
                            "\n<strong>Una vez cancelada la orden no podrá deshacerse. ¿Desea continuar?</strong>";
                },
                style: 'width:90%;',
                closable: false,
                type: BootstrapDialog.TYPE_WARNING,
                onshown: function() {},
                buttons: [{
                    id: 'btn-1',
                    label: 'Cancelar',
                    cssClass: 'btn-primary',
                    action: function(dialog) {
                        dialog.close();
                    }
                     }, {
                    id: 'btn-2',
                    label: 'Terminar',
                    cssClass: 'btn-danger',
                    submit: function() {
                        return false;
                    },
                    action: function(dialog) {
                        var arregloJson={};
                        switch($('#concepto').val()){
                            case '1':
                                arregloJson['idSucursal']=datosRenglon.idSucursal;
                                arregloJson['fechaSolicitud']=datosRenglon.fecha;
                                arregloJson['idConcepto']=1;
                                break;
                            case '2':
                                arregloJson['idSucursal']=idSucursal.val();
                                arregloJson['dep_id']=datosRenglon.idSucursal;
                                arregloJson['idConcepto']=2;
                                arregloJson['fechaIni']=$('#fechaInicio').val();
                                arregloJson['fechaFin']=$('#fechaFin').val();
                                break;
                            case '3':
                                arregloJson['idSucursal']=idSucursal.val();
                                arregloJson['idConcepto']=3;
                                break;
                        }
                        var exitoso = function(datos) {
                            Funcion.notificacionSuccess(datos.success);
                            return false;
                        };
                        var fallo = function(/*datos*/) {
                            return false;
                        };
                        Funcion.peticionAjax({Url:API_SYS_PATH + 'inventario/cancelar', datos:arregloJson,success: exitoso,error: fallo,mensajeDeEspera: "Enviando datos..."});
                        dialog.close();
                    }
                }]
            });
        });
}
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" class="table-condensed table-responsive" border="0" style="padding-right:50px;">'+
        '<tr>'+
        '<td><strong>Fecha:</strong></td>'+
        '<td>'+d.fechaRespuesta2+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td><strong>Cantidad En Sistema:</strong></td>'+
        '<td>'+d.existenciaEjecucion2+'</td>'+
        /*'</tr>'+
        '<tr>'+*/
        '<td><strong>Existencia Fisica:</strong></td>'+
        '<td>'+d.existenciaRespuesta2+'</td>'+
        '<td><strong>Diferencia:</strong></td>'+
        '<td>'+d.diferencia2+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td><strong>Costo:</strong></td>'+
        '<td>'+d.costo2+'</td>'+
        '<td ><strong>Porcentaje:</strong></td>'+
        "<td style='background-color:"+Funcion.obtenerColorPorPorcentaje(d.bandera2)+";'>"+d.bandera2+'</td>'+
        '</tr>'+
        '</table>';
}
$('#tablaDetalle').find('tbody').on( 'click', 'button', function () {
    var datatable=$('#tablaDetalle').DataTable();
    var cell = datatable.cell($(this).closest('td'));
    var datosRenglon = datatable.row($(this).parents('tr')).data();
    Funcion.mostrarDialogoDeEspera('Guardando...');
    Funcion.peticionAjax({
        Url:API_SYS_PATH+'inventario/temporal/agregar',
        datos:{
            idSucursal:$('#idSucursal').val(),
            art_id:datosRenglon.art_id
        },
        success:function(){
            cell.data("<p>AGREGADO</p>").draw(false);
            Funcion.notificacionSuccess("Guardado con éxito...");
        },
        mensajeDeEspera:'Guardando en lista temporal'
    });

    BootstrapDialog.closeAll();
    return false;
});

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
$('#concepto').on('change',function(){
    limpiarTablas();
    if($('#concepto').val()!='3'){
        $('#fechaInicio').show();
        $('#fechaFin').show();
    }else{
        $('#fechaInicio').hide();
        $('#fechaFin').hide();
    }
});

function limpiarTablas(){
    $('#divCabecero').hide();
    $('#divCabecero2').hide();
    $('#divDetalle').hide();
    $('#divDetalle2').hide();

}

$('#tablaDetalle').find('tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = dt.row( tr );
    console.log('entro');
    if ( row.child.isShown() ) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
    }
    else {
        // Open this row
        row.child( format(row.data()) ).show();
        tr.addClass('shown');
    }
} );

$(document).ready(function() {
    var table=$('#tablaDetalle').DataTable({
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
            });
        }
    })});
$.fn.dataTable.ext.search.push(
    function( settings, data ) {

        var min = parseFloat( $('#min').val() );
        var max = parseFloat( $('#max').val() );
        var age = parseFloat( data[$('#idConcepto').val()] ) || 0; // use data for the age column
        return !!(( isNaN(min) && isNaN(max) ) ||
        ( isNaN(min) && age <= max ) ||
        ( min <= age && isNaN(max) ) ||
        ( min <= age && age <= max ));

    }
);




