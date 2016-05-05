$(function() {
    cargarDropDownList(("#sucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,true);
});

function buscarDepartamento(){
    var id=document.getElementById('sucursal').value;
    document.getElementById('oculto').value=id;
    alert(id);
    $.ajax({
        url : ".php",
        type: "POST",
        data : "name=Denniss",
        success: function(data)
        {
            //data - response from server
            $('#response_div').html(data);
        }
    });
    cargarDropDownList(("#departamento"), 'dep_id', 'nombre', API_SYS_PATH + 'categoria/departamento/seleccionar2', 12, true);
}


$("#categoria").submit(function(){
    var datosTabla1 = {};
    console.warn(datosTabla1);
    cargarTabla(datosTabla1, 10);

    function cargarTabla(arregloConInputs, idTransaccion) {
        arregloConInputs['idTransaccion'] = idTransaccion;

        var resultadoSucursal = $("#categoria");
        var form1 = resultadoSucursal.find("select").serializeArray();
        var datosTabla1 = {};
        form1.forEach(function(input) {
            datosTabla1[input.name] = input.value;
        });

        var tbody = $("#resultadosCategoria tbody").empty();
        exitoso = function (result) {

            if (result.estado != undefined) {
                if (result.estado == 'warning') {
                    notificacionWarning(result.success);
                    return;
                }
            }
            var find = false;
            result.data.forEach(function (element, index) {
                find = true;
                var tr = $("<tr></tr>");

                var idDepartamento = element['cat_id'];
                var idLocal=element['cat_id_Local'];
                var idSucursal=element['idSucursal'];
                var nombre = element['nombre'];
                var status = element['dep_id'];

                agregarTDaTR(tr, idDepartamento);
                agregarTDaTR(tr,idLocal);
                agregarTDaTR(tr,idSucursal);
                agregarTDaTR(tr, nombre);
                agregarTDaTR(tr, status);
                $(tbody).append(tr);
            });
            console.log(find);
            if (find)
                $('#resultadosCategoria').show();
        };
        fallo = function (datos) {
            console.log(datos);
        };
        peticionAjax(API_SYS_PATH + 'categoria/categoria/seleccionar', datosTabla1, exitoso, fallo);
    }

    function agregarTDaTR(tr, element) {
        var td = $("<td align='center'></td>");
        $(td).append(element);
        $(tr).append(td);
    }
    return false;
});