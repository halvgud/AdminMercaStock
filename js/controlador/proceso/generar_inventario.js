$(function() {

    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,false,'cargando','Seleccione una Sucursal');
    cargarDropDownList(("#concepto"), 'idConcepto', 'descripcion', API_SYS_PATH + 'concepto/seleccionar', 12,false,'cargando','Seleccione un Concepto');
});
$("#inventario").submit(function() {
    var form1 = $("#inventario").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var datos= (datosTabla1);
    var columnas = [{ data : "clave" },
        { data : "descripcion" },
        { data : "margen1" },
        { data : "precio1" },
        { data : "existencia" }];
    console.log(datosTabla1);
    peticionAjaxDT('articulo/seleccionar',('#resultadosArticulo'),datosTabla1,columnas,'cargando');
    return false;
});
function buscarDeparamento(){
    $("#dep_id").empty();
    $("#cat_id").empty();
    cargarDropDownList(("#dep_id"),'dep_id','nombre',API_SYS_PATH+'departamento/seleccionar',$("#idSucursal").val(),true,'Cargando...','Seleccione un Departamento');
}
function buscarCategoria(){
    $("#cat_id").empty();
    var xa=["",""];
    var x1=$("#idSucursal").val();
    var x2=$("#dep_id").val();
    xa=[x1,x2];
    var columnas = [{ idSucursal : x1 },
        { idGenerico : x2 }];
    cargarDropDownList(("#cat_id"),'cat_id','nombre',API_SYS_PATH+'categoria/seleccionar',columnas,true,'Cargando...','Seleccione una Categoria');
}
function configuracionAzar(){

    var $contenido = $("<form></form>",{name:'formSucursal'});
    var $form_group = $("<div></div>",{class:'form-inline'});

    /********CANTIDAD********/
        //$form_group = $("<div></div>",{class:'form-group'});

    label = $("<label></label>",{for:'cantidad',text:'Cantidad de Artículos:'});
    var espacio2=$("<label> &nbsp;&nbsp; </label>");
    $form_group.append(espacio2);
    var nombre = $("<input>",{name:'cantidad',value:'10',type:'number',class:'form-control', required:'required', width :'15%'});
    $form_group.append(label);
    $form_group.append(nombre);
    var espacio=$("<label> &nbsp;&nbsp;&nbsp; </label>");
    $form_group.append(espacio);
    var remover = $("<button></button>",{id:"can",name:"can",type:'button',class:'btn btn-outline btn-success',text:'Generar'});
    $form_group.append(remover);
    $contenido.append($form_group);
    $(remover).click(function(){
        alert('ñ.ñ');
    });

    BootstrapDialog.show({
        title: 'Configuración de Búsqueda Azar',
        message:function(dialog) {
            return $contenido;
        },
        closable: false,
        type: BootstrapDialog.TYPE_WARNING,
        onshown:function(){
        },

        buttons: [{
            id: 'btn-1',
            label: 'Cancelar',
            cssClass: 'btn-primary',
            action: function(dialog) {
                dialog.close();
            }
        },{
            id: 'btn-2',
            label: 'Terminar',
            cssClass: 'btn-danger',
            submit:function(dialog){

                return false;
            },
            action: function(dialog) {

            }
        }]
    });
}