$(function() {
    Funcion.cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', true, false, 'Buscando Sucursal...', 'Seleccione una Sucursal');
});

$('#idSucursal').on('change',function(){
    $("#dep_id").empty();
    var idSucursal = $('#idSucursal');
    if(idSucursal.val()!='') {
        Funcion.cargarDropDownList(("#dep_id"),
            'dep_id',
            'nombre',
            API_SYS_PATH + 'departamento/seleccionar',
            idSucursal.val(),
            true,
            'Buscando Departamento...',
            'Seleccione un Departamento');
    }else{
        $('#resultadosCategoria').empty();
    }
});


$("#categoria").submit(function() {
    var form1 = $("#categoria").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });

    var arreglo = {};
    arreglo['idGenerico'] = datosTabla1;
    arreglo['dt'] = true;
    Funcion.peticionAjaxDT({
        RestUrl:'categoria/seleccionar',
        DT:('#resultadosCategoria'),
        datos:arreglo,
        arregloColumnas:[
            {data: "cat_id"},
            {data: "cat_id_Local"},
            {data: "idSucursal"},
            {data: "nombre"},
            {data: "dep_id"}
        ],
        loading: 'Buscando Categorias..'
    });
    return false;
});