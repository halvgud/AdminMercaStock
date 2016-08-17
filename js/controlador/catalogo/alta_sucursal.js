var contador = 0;
var contador2 = 0;

$("#password").keydown(function(){
    if (contador2 == 1) {
        $("#btnGuardar").prop("disabled", false);
        contador2 = 0;
    }
});


$("#guardarSucursal").submit(function() {
    var guardarSucursal = $('#guardarSucursal');
    $("#btnGuardar").prop("disabled", true);
    var form1 = guardarSucursal.find("select,input").serializeArray();
    var datosTabla2 = {};
    form1.forEach(function(input) {
        datosTabla2[input.name] = input.value;
    });
    var password = $("#password");
    var repetirpassword=$("#repetirpassword");
    if (password.val() != repetirpassword.val()) {
        Funcion.notificacionWarning('Las contraseñas no concuerdan');
        password.val('');
        repetirpassword.val('');
        contador2 = 1;
        return false;
    }
    var exitoso = function(datos) {
        Funcion.notificacionSuccess(datos.success);
        $("#guardarSucursal")[0].reset();
        contador = 0;
        $("#btnGuardar").prop("disabled", false);
        return false;
    };
    var fallo = function(/*datos*/) {
        $("#btnGuardar").prop("disabled", false);
        return false;
    };
    Funcion.peticionAjax({Url:API_SYS_PATH + 'sucursal/insertar',datos: datosTabla2, success:exitoso,error: fallo,mensajeDeEspera: "Guardando Sucursal..."});
    return false;
});

function inicializarTabla2() {
    var datosTabla2 = {};
    datosTabla2['idSucursal'] = idSucursal;
    console.warn(datosTabla2);
    cargarTabla(datosTabla2, 10);
}

$('#buscarYModificar').click(function() {
    inicializarTabla2();
});

function agregarTDaTR(tr, element) {
    var td = $("<td class='text-center'></td>");
    $(td).append(element);
    $(tr).append(td);
}

function cargarTabla(arregloConInputs, idTransaccion) {
    arregloConInputs['idTransaccion'] = idTransaccion;
    var resultados = $("#resultados");
    resultados.hide();
    var tbody = resultados.find("tbody").empty();
    /**
     * @param {{estado:string}} result
     * @param {{success:string}} result
     */
    var exitoso = function(result) {
        if (typeof(result.estado) != 'undefined') {
            if (result.estado == 'warning') {
                Funcion.notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.data.forEach(function(element/*, index*/) {
            find = true;
            var tr = $("<tr></tr>");

            var idSucursal = element['idSucursal'];
            var nombre = element['nombre'];
            var usuario = element['usuario'];
            var password = element['password'];
            var domicilio = element['domicilio'];
            var contacto = element['contacto'];
            var estado = element['idEstado'] == '1' ? 'ACTIVO' : 'INACTIVO';

            var editar = $("<button></button>", {
                class: 'btn btn-primary'
            });
            var icono_editar = $("<i></i>", {
                class: 'fa fa-pencil-square-o'
            });
            editar.append(icono_editar);
            editar.append(" Editar");
            $(editar).click(function() {
                editarSucursal(element, tr);
            });
            agregarTDaTR(tr, idSucursal);
            agregarTDaTR(tr, nombre);
            agregarTDaTR(tr, usuario);
            agregarTDaTR(tr, domicilio);
            agregarTDaTR(tr, contacto);
            agregarTDaTR(tr, estado);
            agregarTDaTR(tr, editar);
            $(tbody).append(tr);
        });

        if (find) {
            $('#resultados').show();
        }
    };
    var fallo = function(datos) {
        console.log(datos);
    };
    arregloConInputs['banderaSucursal']='1';
    Funcion.peticionAjax({Url:API_SYS_PATH + 'sucursal/seleccionar', datos:arregloConInputs,success: exitoso, error:fallo,mensajeDeEspera: 'Cargando Lista de Sucursales...'});
}

function editarSucursal(element, tr) {
    var $contenido = $("<form></form>", {
        name: 'formSucursal'
    });
    var $form_group = $("<div></div>", {
        class: 'form-group'
    });
    label = $("<label></label>", {
        for: 'idSucursal',
        text: 'ID Sucursal'
    });
    var idSucursal = $("<input>", {
        name: 'idSucursal',
        value: element['idSucursal'],
        class: 'form-control',
        required: 'required',
        readonly: 'readonly'
    });
    $form_group.append(label);
    $form_group.append(idSucursal);
    $contenido.append($form_group);
    /********NOMBRE********/
    label = $("<label></label>", {
        for: 'nombre',
        text: 'Nombre'
    });
    var nombre = $("<input>", {
        name: 'nombre',
        value: element['nombre'],
        type: 'text',
        class: 'form-control',
        required: 'required'
    });
    $form_group.append(label);
    $form_group.append(nombre);
    $contenido.append($form_group);
    /********USUARIO********/
    var label = $("<label></label>", {
        for: 'usuario',
        text: 'Usuario'
    });
    var usuario = $("<input>", {
        name: 'usuario',
        value: element['usuario'],
        type: 'text',
        class: 'form-control',
        required: 'required'
    });
    $form_group.append(label);
    $form_group.append(usuario);
    $contenido.append($form_group);
    /********CONTRASEÑA********/
    label = $("<label></label>", {
        for: 'password',
        text: 'Password'
    });
    var password = $("<input>", {
        name: 'password',
        value: element['password'],
        type: 'password',
        class: 'form-control',
        required: 'required'
    });
    $form_group.append(label);
    $form_group.append(password);
    $contenido.append($form_group);
    /********REPETIR CONTRASEÑA********/
    label = $("<label></label>", {
        for: 'repetirpassword',
        text: 'Repetir password'
    });
    var repetirpassword = $("<input>", {
        name: 'repetirpassword',
        value: element['password'],
        type: 'password',
        class: 'form-control',
        required: 'required'
    });
    $form_group.append(label);
    $form_group.append(repetirpassword);
    $contenido.append($form_group);
    /********APELLIDO********/
    label = $("<label></label>", {
        for: 'domicilio',
        text: 'Domicilio'
    });
    var domicilio = $("<input>", {
        name: 'domicilio',
        value: element['domicilio'],
        type: 'text',
        class: 'form-control',
        required: 'required'
    });
    $form_group.append(label);
    $form_group.append(domicilio);
    $contenido.append($form_group);
    /********CONTACTO********/
    label = $("<label></label>", {
        for: 'contacto',
        text: 'Contacto'
    });
    var contacto = $("<input>", {
        name: 'contacto',
        value: element['contacto'],
        type: 'text',
        class: 'form-control',
        required: 'required'
    });
    $form_group.append(label);
    $form_group.append(contacto);
    $contenido.append($form_group);
    /*********ESTADO**********/
    $form_group = $("<div></div>", {
        class: 'form-group'
    });
    label = $("<label></label>", {
        for: 'myonoffswitch',
        text: 'Estado'
    });
    var divcontenedor = $("<div></div>", {
        class: 'onoffswitch'
    });
    var inputEstado = "";
    if (element['idEstado'] == '1') {
        inputEstado = $("<input>", {
            type: 'checkbox',
            checked: 'checked',
            name: 'onoffswitch',
            class: 'onoffswitch-checkbox',
            id: 'myonoffswitch'
        });
    } else {
        inputEstado = $("<input>", {
            type: 'checkbox',
            name: 'onoffswitch',
            class: 'onoffswitch-checkbox',
            id: 'myonoffswitch'
        });
    }
    var labelEstado = $("<label></label>", {
        class: 'onoffswitch-label',
        for: 'myonoffswitch'
    });
    var span1 = $("<span></span>", {
        class: 'onoffswitch-inner'
    });
    var span2 = $("<span></span>", {
        class: 'onoffswitch-switch'
    });
    $(labelEstado).append(span1);
    $(labelEstado).append(span2);
    $($form_group).append(label);
    $(divcontenedor).append(inputEstado);
    $(divcontenedor).append(labelEstado);
    $form_group.append(divcontenedor);
    $contenido.append($form_group);

    BootstrapDialog.show({
        title: 'Esta a punto de modificar los siguientes datos',
        message: function(/*dialog*/) {
            return $contenido;
        },
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
            label: 'Aceptar',
            cssClass: 'btn-danger',
            submit: function(/*dialog*/) {

                return false;
            },
            action: function(dialog) {
                var datos = {};
                if ($(password).val() != $(repetirpassword).val()) {

                    Funcion.notificacionWarning('Las contraseñas no concuerdan');
                    $(password).val('');
                    $(repetirpassword).val('');
                    return false;
                }
                datos.idSucursal = $(idSucursal).val();
                datos.usuario = $(usuario).val();
                datos.password = $(password).val();
                datos.nombre = $(nombre).val();
                datos.domicilio = $(domicilio).val();
                datos.contacto = $(contacto).val();
                datos.idEstado = ($(inputEstado).prop('checked') == true ? '1' : '0');
                if (datos.usuario == '' || datos.password == '' || datos.nombre == '' || datos.domicilio == '' || datos.contacto == '' ||
                    datos.idEstado == '') {
                    Funcion.notificacionWarning('Ningún campo debe de ir vacío, favor de validar la información');
                    return false;
                }
                console.log(datos);
                var exitoso = function(datos) {
                    Funcion.notificacionSuccess(datos.success);
                    $(tr).remove();
                    dialog.close();
                    inicializarTabla2();
                };
                var fallo = function(datos) {
                };
                Funcion.peticionAjax({Url:API_SYS_PATH + 'sucursal/actualizar', datos:datos,success: exitoso, error:fallo,mensajeDeEspera: 'Guardando cambios...'});
                return false;
            }
        }]
    });
}