$(function() {
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,true,'cargando','Seleccione una Sucursal');
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
    peticionAjaxDT('categoria/articulo/seleccionar',('#resultadosArticulo'),datosTabla1,columnas,'cargando');
    return false;
});
function buscarDeparamento(){
    $("#dep_id").empty();
    $("#cat_id").empty();
    cargarDropDownList(("#dep_id"),'dep_id','nombre',API_SYS_PATH+'categoria/departamento/seleccionar',$("#idSucursal").val(),false,'Cargando...','Seleccione un Departamento');
}
function buscarCategoria(){
    $("#cat_id").empty();
    var xa=["",""];
    var x1=$("#idSucursal").val();
    var x2=$("#dep_id").val();
     xa=[x1,x2];
    cargarDropDownList(("#cat_id"),'cat_id','nombre',API_SYS_PATH+'categoria/categoria/seleccionar2',xa,false,'Cargando...','Seleccione una Categoria');
}
