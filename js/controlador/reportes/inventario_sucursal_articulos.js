
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

$("#inventario").submit(function(){
    Funcion.mostrarDialogoDeEspera("Cargando listas...");
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
    var arregloBoton={Boton:true,PosicionColor:7};
    tablaCabecero= Funcion.peticionAjaxDT({
        RestUrl:'inventario/reporte/cabecero',
        DT:('#tabla'),
        datos:datosTabla1,
        arregloColumnas:columnas,
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
                if($('#concepto').val()==1){
                    e.stopPropagation();
                    var Id = $(this).closest('td').children('span').attr('id');
                    var Val =$('#tabla').find('.input-sm').val();
                    var z = $(this).closest('td').children('span');
                    var datosTabla = {};
                    console.log(Val);
                    datosTabla['idInventarioExterno']=data.idInventarioExterno;
                    datosTabla['nombre']=Val;
                    console.log(datosTabla);
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
        ocultarBusqueda:undefined,
        columnDefs:[{
            targets:[0,2],
            visible:false
        }],
        funcionDeColor:arregloBoton});
    $('#total').show();
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

function llamarclic() {
    var table = $('#tabla');
    var datatable = table.DataTable();
        table.find('tbody').on('click','button.btn-info',function(){
            var datosRenglon = datatable.row($(this).parents('tr')).data();
            tablaCabecero.$('tr.selected').removeClass('selected');
            Funcion.mostrarDialogoDeEspera("Cargando...");
            var datosTabla={};
            var concepto = $('#concepto');
            var idSucursal = $('#idSucursal');
            var fechaIni=$('#fechaInicio').val();
            var fechaFin=$('#fechaFin').val();
            console.log(concepto.val());
            switch(concepto.val()){
                case '1':
                    datosTabla['idSucursal']=idSucursal.val();
                    datosTabla['fecha']=datosRenglon.fecha;
                    datosTabla['busqueda']='%';
                    datosTabla['idConcepto']=1;
                    break;
                case '2':
                    datosTabla['idSucursal']=idSucursal.val();
                    datosTabla['fechaIni']=fechaIni;
                    datosTabla['fechaFin']=fechaFin;
                    datosTabla['busqueda']=datosRenglon.idSucursal;
                    datosTabla['idConcepto']=2;
                    break;
                case 3:
                default:

            }
            console.log(datosTabla);
            dt=Funcion.peticionAjaxDT({
                RestUrl: 'inventario/reporte/detalle',
                DT: ('#tablaDetalle'),
                datos: datosTabla,
                arregloColumnas: [
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
                ],
                loading: null,
                funcionDeColor: {
                    Boton: false,
                    PosicionColor:8,
                    PosicionOrden:2
                },
                columnDefs:[{
                    targets:[0,2,3,6],
                    visible:false
                }],
                initComplete:function(){
                var div = $('#tablaDetalle_wrapper');
                    switch(concepto.val()){
                        case '1':
                            div.find("#tablaDetalle_filter")
                                .prepend("<label for='idDepartamento'>Departamento:</label>" +
                                    "<select id='idDepartamento' name='idDepartamento' class='form-control' required></select>");

                            Funcion.cargarDropDownList(
                                ("#idDepartamento"),
                                'dep_id',
                                'nombre',
                                API_SYS_PATH + 'departamento/seleccionar',
                                $("#idSucursal").val(),
                                false,
                                'Buscando Departamentos...',
                                'TODOS');
                            this.api().column(2).each(function() {
                                var column = this;
                                $('#idDepartamento').on('change', function() {

                                    var val = $(this).val();
                                    console.log(val);
                                    column.search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });
                            });
                            break;
                        case '2':
                            div.find("#tablaDetalle_filter")
                                .prepend("<label for='idCategoria'>Categoria</label> " +
                                    "<select id='idCategoria' name='idCategoria' class='form-control' required></select>");
                            var idSucursal = $("#idSucursal").val();
                            var columnas = {
                                idSucursal:idSucursal,
                                dep_id: datosRenglon.idSucursal
                            };
                            if(idSucursal!='') {
                                Funcion.cargarDropDownList(("#idCategoria"), 'cat_id', 'nombre', API_SYS_PATH + 'categoria/seleccionar', columnas, false, 'Buscando Categorias...', 'Seleccione una Categoria');
                            }
                            this.api().column(2).each(function() {
                                var column = this;
                                $('#idCategoria').on('change', function() {

                                    var val = $(this).val();
                                    console.log(val);
                                    column.search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });
                            });
                            break;
                        case 3:
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
                    BootstrapDialog.closeAll();
                },

                drawCallback:function(settings){
                    var api = this.api();
                    var rows = api.rows( {page:'current'} ).nodes();
                    var last=null;
                    api.column(3, {page:'current'} ).data().each( function ( group, i ) {
                        if ( last !== group ) {
                            $(rows).eq( i ).before(
                                '<tr class="even selected"><td colspan="11">'+group+'</td></tr>'
                            );
                            last = group;
                        }
                    } );
                }
            });
            $('#divDetalle').show();
            return false;
    });
        table.find('tbody').on('click','button.btn-danger',function(){
            var datosRenglon = datatable.row($(this).parents('tr')).data();
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
                            case 1:
                                arregloJson['idSucursal']=datosRenglon.idSucursal;
                                arregloJson['fechaSolicitud']=datosRenglon.fecha;
                                arregloJson['idConcepto']=1;
                                break;
                            case 2:
                                arregloJson['idSucursal']=$('#idSucursal').val();
                                arregloJson['dep_id']=datosRenglon.idSucursal;
                                arregloJson['idConcepto']=2;
                                break;
                            case 3:
                                break;
                            default:

                        }
                        console.log(arregloJson);
                        console.log(datosRenglon);
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
        success:function(resultado){
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

function limpiarTablas(){
    $('#total').hide();
    $('#divDetalle').hide();
    $('#detalle').hide();
}

$(document).ready(function() {
    var table=$('#tablaDetalle').DataTable({
        initComplete: function () {
            this.api().columns().every(function () {
                var column = this;
                console.log(column);
            });
        }
    })});
$.fn.dataTable.ext.search.push(
    function( settings, data ) {

        var min = parseFloat( $('#min').val() );
        var max = parseFloat( $('#max').val() );
        var age = parseFloat( data[$('#idConcepto').val()] ) || 0; // use data for the age column
        //console.log(age + "--"+min+"--"+max);
        return !!(( isNaN(min) && isNaN(max) ) ||
        ( isNaN(min) && age <= max ) ||
        ( min <= age && isNaN(max) ) ||
        ( min <= age && age <= max ));

    }
);




