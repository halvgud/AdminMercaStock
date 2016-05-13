$(function() {
    var
        $online = $('.online'),
        $offline = $('.offline');
    Offline.on('confirmed-up', function () {
        $offline.fadeOut(function () {
            $online.fadeIn();
        });
    });
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,false,'cargando','Seleccione una Sucursal');
});
$("#articulo").submit(function() {
    var form1 = $("#articulo").find("select,input").serializeArray();
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
    cargarDropDownList(("#cat_id"),'cat_id','nombre',API_SYS_PATH+'categoria/seleccionar',columnas,false,'Cargando...','Seleccione una Categoria');
}
