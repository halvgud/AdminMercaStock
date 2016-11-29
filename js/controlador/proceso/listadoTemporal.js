$(function() {
    Funcion.cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'cargando', 'Seleccione una Sucursal');
    var idSuc=$('#idSucursal');
    idSuc.change(function() {
        if (idSuc.val()!=""){
            $("#resultados").find("tbody").empty();
            Funcion.peticionAjaxDT({
                RestUrl:'inventario/temporal/seleccionar',
                DT:("#resultados"),
                datos:{
                    idSucursal: idSuc.val(),
                    edicion:"edicion"
                },
                arregloColumnas:[
                    { data : "idInventarioTemporal" },
                    {data : 'art_id'},
                    { data : "clave"},
                    { data : "descripcion" },
                    {data : 'existencia'},
                    {data: 'edicion'}
                ], 'select': {
                    'style': 'multi'
                },
                ocultarWarning:true,
                columnDefs:[{
                    'targets':[0,1],
                    visible:false
                }
                ],
                rowCallBack:function( row, data ) {
                    if (data.edicion === "edicion") {
                        $(row).find('td:eq(-1)').html("<button class='btn btn-warning'>Remover</button>");
                    }else
                    {
                        $(row).find('td:eq(-1)').html("<b>"+data.edicion+"</b>");
                    }
                }
            });
        }
    });
});
//var contador=0  ;
var dialogoProveedor;
$('#agregarArticuloLista').click(function(){
    var descripcionArticulo=$('#descripcionArticulo');
    if(descripcionArticulo.val()!=""){
        descripcionArticulo.click();
    }else{

    }
    return false;
});
$('#descripcionArticulo').click(function(){
    var $contenido = $("<form></form>", { name: 'formSucursal'});
    //var $form_group = $("<div></div>", { class: 'form-inline'});
    var tabla1 = $("<table></table>", { id: 'tabla1', name: 'tabla1', class: 'table table-condensed text-center',style:'width:100%'});

    var thead = $("<thead></thead>", {
        name: 'thead'
    });
    //tabla.append($thead);
    var tr=$("<tr></tr>");
    var th1=$("<th></th>").append('id');
    var th2=$("<th></th>").append('clave');
    var th3=$("<th></th>").append('descripcion');
    var th4=$("<th></th>").append('existencia');
    var th5=$("<th></th>").append('agregar');
    tr.append(th1);
    tr.append(th2);
    tr.append(th3);
    tr.append(th4);
    tr.append(th5);
    thead.append(tr);
    tabla1.append(thead);
   // $form_group.append(tabla1);
    $contenido.append(tabla1);


    dialogoProveedor=BootstrapDialog.show({
        title: 'Articulos',
        message: function() {
            return $contenido;
        },
        closable: false,
        type: BootstrapDialog.TYPE_WARNING,
        onshown: function() {
            cargarTablaModalPopup();
        },
        buttons: [{
            id: 'btn-1',
            label: 'Cancelar',
            cssClass: 'btn-primary',
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
   /* $('#tabla1').find('tbody').on( 'click', 'button', function () {
        var tabla1=$('#tabla1').DataTable();
        var tabla2=$('#resultados').DataTable();
        var cell = tabla1.cell($(this).closest('td'));
        var datosRenglon = tabla1.row($(this).parents('tr')).data();
        //cell.data("<p>AGREGADO</p>").draw(false);
        tabla2.row.add( {
            "id":       "Tiger Nixon",
            "position":   "System Architect",
            "salary":     "$3,120",
            "start_date": "2011/04/25",
            "office":     "Edinburgh",
            "extn":       "5421"
        } ).draw();
    });*/
});
function cargarTablaModalPopup(){
    $("#tabla1").find("tbody").empty();
    Funcion.peticionAjaxDT({
        RestUrl:'articulo/seleccionar',
        DT:("#tabla1"),
        datos : {
            idSucursal: $('#idSucursal').val(),
            cat_id:'%',
            dep_id:'%',
            edicion:'edicion'
        },
        arregloColumnas:[
            { data : 'art_id'},
            { data : "clave" },
            { data : "descripcion"},
            { data : "existencia" },
            {data : 'edicion'}
        ], 'select': {
            'style': 'multi'
        },columnDefs:{
            targets:[0],
            visible:false
        },
        rowCallBack:function( row, data ) {
            if (data.edicion === "edicion") {
                $(row).find('td:eq(-1)').html("<button class='btn btn-info'>Seleccionar</button>");
            }else
            {
                $(row).find('td:eq(-1)').html("<b>"+data.edicion+"</b>");
            }
        },
        success:function(){
            $('#tabla1').find('tbody').on( 'click', 'button', function () {
                alert('kek');
                var datatable = $('#tabla1').DataTable();
                var resultados = $('#resultados').DataTable();
                var datosRenglon = datatable.row($(this).parents('tr')).data();
                //$('#nombreProveedor').val(datosRenglon.nombre);
                //contador++;
                resultados.row.add( {
                    "idInventarioTemporal":       "0",
                    "art_id":   datosRenglon.art_id,
                    "clave":     datosRenglon.clave,
                    "descripcion": datosRenglon.descripcion,
                    "existencia":     datosRenglon.existencia,
                    "edicion":       "edicion"
                } ).draw();
                dialogoProveedor.close();
                return false;
            });
            return false;
        }
    });
}