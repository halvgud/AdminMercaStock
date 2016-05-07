$(function() {
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,true,'Cargando...','Seleccione una Sucursal');
});

function buscarDepartamento(){
 /*   var id=document.getElementById('sucursal').value;
    document.getElementById('oculto').value=id;
    //alert(id);
    $.ajax({
        url : "http://localhost/APIMercaStock/public/categoria.php",
        type: "POST",
        data : "valor="+id,
        //dataType:'json',
        success: function(data)
        {
            alert("si se envio"+data.valor.value);
            cargarDropDownList(("#departamento"), 'dep_id', 'nombre', API_SYS_PATH + 'categoria/departamento/seleccionar2', 12, true);
            //data - response from server
            //$('#response_div').html(data);
        }
    });
*/  $("#dep_id").empty();
    cargarDropDownList(("#dep_id"),'dep_id','nombre',API_SYS_PATH+'categoria/departamento/seleccionar',$("#idSucursal").val(),false,'Cargando...','Seleccione un Departamento');

}


$("#categoria").submit(function(){
    var form1 = $("#categoria").find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    var datos= (datosTabla1);
    var columnas = [{ data : "cat_id" },
        { data : "cat_id_Local" },
        { data : "idSucursal" },
        { data : "nombre" },
        { data : "dep_id" }];
    peticionAjaxDT('categoria/categoria/seleccionar',('#resultadosCategoria'),datosTabla1,columnas,'cargando');
    return false;
    /*
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
        console.log(datosTabla1);
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
      //  peticionAjax(API_SYS_PATH + 'categoria/categoria/seleccionar', datosTabla1, exitoso, fallo);
        peticionAjax(API_SYS_PATH + 'categoria/categoria/seleccionar', datosTabla1, exitoso, fallo,"cargando categorias...");
    }

    function agregarTDaTR(tr, element) {
        var td = $("<td align='center'></td>");
        $(td).append(element);
        $(tr).append(td);
    }
    return false;
    */
});