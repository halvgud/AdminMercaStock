$(function() {
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12, false, 'Buscando Sucursal...', 'Seleccione una Sucursal');
});

function buscarDepartamento() {
    $("#dep_id").empty();
    cargarDropDownList(("#dep_id"), 'dep_id', 'nombre', API_SYS_PATH + 'departamento/seleccionar', $("#idSucursal").val(), true, 'Buscando Departamento...', 'Seleccione un Departamento');
}

$("#categoria").submit(function() {
    var form1 = $("#categoria").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var datos = (datosTabla1);
    var columnas = [{
        data: "cat_id"
    }, {
        data: "cat_id_Local"
    }, {
        data: "idSucursal"
    }, {
        data: "nombre"
    }, {
        data: "dep_id"
    }];
    var arreglo = {};
    arreglo['idGenerico'] = datosTabla1;
    arreglo['dt'] = true;
    peticionAjaxDT('categoria/seleccionar', ('#resultadosCategoria'), arreglo, columnas, 'Buscando Categorias..');
    return false;
});