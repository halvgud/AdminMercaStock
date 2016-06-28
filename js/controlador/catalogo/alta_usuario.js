var contador = 0;
var contador2 = 0;

$(function() {
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', null);
    cargarDropDownList(("#sexo"), 'idSexo', 'descripcion', API_SYS_PATH + 'sexo/seleccionar', 12);
    cargarDropDownList(("#idNivelAutorizacion"), 'idNivelAutorizacion', 'descripcion', API_SYS_PATH + 'nivel_autorizacion/seleccionar', $("#idUsuario").val());
    $("#descripcion").enterKey(function() {
        e.preventDefault();
       // buscar();
    });
    $("#clave").enterKey(function(e) {
        e.preventDefault();
      //  buscar();
    });
    $("#buscarUsuario").submit(function(e) {
        e.preventDefault();
      //  buscar();
    });
});

/*function reactivarBtnU() {
    if (contador2 == 1) {
        $("#btnGuardar").prop("disabled", false);
        contador2 = 0;
    }
    /*var tempVal = $('#password').val();
    if (/^[0-9]{1,4}$/.test(+tempVal))
        alert('we cool');
    else
        alert('we not');
}*/

$("#guardarUsuario").submit(function() {
    var guardarUsuario = $('#guardarUsuario');
    $("#btnGuardar").prop("disabled", true);
    var form1 = guardarUsuario.find("select,input").serializeArray();
    var datosTabla1 = {};
    form1.forEach(function(input) {
        datosTabla1[input.name] = input.value;
    });
    if ($("#password").val() != $("#repetirpassword").val()) {
        notificacionWarning('Las contraseñas no concuerdan');
        $("#password").val('');
        $("#repetirpassword").val('');
        contador2 = 1;
        return false;
    }
    if($("#password").val().length<4 || $("#repetirpassword").val().length<4){
        $("#password").val('');
        $("#repetirpassword").val('');
        contador2 = 1;
        notificacionWarning('Las contraseñas deben tener 4 digitos');
        return false;
    }
    var tempVal = $('#password').val();
    var tempVal2 = $('#repetirpassword').val();
    if (!/^[0-9]{1,4}$/.test(+tempVal)||!/^[0-9]{1,4}$/.test(+tempVal2))
    {
        $("#password").val('');
        $("#repetirpassword").val('');
        contador2 = 1;
        notificacionWarning('Las contraseñas solo deben contener números');
        return false;
    }

    exitoso = function(datos) {
        notificacionSuccess(datos.success);
        $("#guardarUsuario")[0].reset();
        contador = 0;
        $("#btnGuardar").prop("disabled", false);
        return false;
    };
    fallo = function(datos) {
        $("#btnGuardar").prop("disabled", false);
        return false;
    };
    peticionAjax(API_SYS_PATH + 'usuario/insertar', datosTabla1, exitoso, fallo, "Guardando Usuario...");

    return false;
});

function inicializarTabla() {
    var datosTabla1 = {};
    datosTabla1['usuario'] = usuario;
    console.warn(datosTabla1);
    cargarTabla(datosTabla1, 10);
}
$('#buscarYModificar').click(function() {
    inicializarTabla();
});

function agregarTDaTR(tr, element) {
    var td = $("<td class='text-center'></td>");
    $(td).append(element);
    $(tr).append(td);
}

function cargarTabla(arregloConInputs, idTransaccion) {
    arregloConInputs['idTransaccion'] = idTransaccion;
    $("#resultados").hide();
    var tbody = $("#resultados tbody").empty();
    exitoso = function(result) {
        if (result.estado != undefined) {
            if (result.estado == 'warning') {
                notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.forEach(function(element, index) {
            find = true;
            var tr = $("<tr></tr>");
            var usuario = element['usuario'];
            var descripcionRol = element['descripcion'];
            var estado = element['idEstado'] == '1' ? 'ACTIVO' : 'INACTIVO';
            var descripcionSucursal = element['descripcionSucursal'];
            var editar = $("<button></button>", {
                class: 'btn btn-primary'
            });
            var icono_editar = $("<i></i>", {
                class: 'fa fa-pencil-square-o'
            });
            editar.append(icono_editar);
            editar.append(" Editar");
            $(editar).click(function() {
                editarUsuario(element, tr);
            });
            agregarTDaTR(tr, usuario);
            agregarTDaTR(tr, descripcionRol);
            agregarTDaTR(tr, estado);
            agregarTDaTR(tr,descripcionSucursal);
            agregarTDaTR(tr, editar);
            $(tbody).append(tr);
        });
        if (find) {
            $('#resultados').show();
        }
    };
    fallo = function(datos) {
        console.log(datos);
    };
    peticionAjax(API_SYS_PATH + 'usuario/seleccionar', arregloConInputs, exitoso, fallo, 'Cargando Lista de usuarios');
}

function editarUsuario(element, tr) {
    var $contenido = $("<div></div>");
    var $form_group = $("<div></div>", {
        class: 'form-group'
    });
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
        readonly: 'readonly'
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
        text: 'repetir password'
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
    /********APELLIDO********/
    label = $("<label></label>", {
        for: 'apellido',
        text: 'Apellido'
    });
    var apellido = $("<input>", {
        name: 'apellido',
        value: element['apellido'],
        type: 'text',
        class: 'form-control',
        required: 'required'
    });
    $form_group.append(label);
    $form_group.append(apellido);
    $contenido.append($form_group);
    /********CONTACTO********/
    label = $("<label></label>", {for: 'contacto',text: 'Contacto'});
    var contacto = $("<input>", {name: 'contacto',value: element['contacto'],type: 'text',class: 'form-control',
        required: 'required'});
    $form_group.append(label);
    $form_group.append(contacto);
    $contenido.append($form_group);
    /********SEXO********/
    label = $("<label></label>", {for: 'sexo',text: 'Sexo'});
    var optionSexo = $("<option></option>", {name: 'empty',text: 'Seleccione sexo',value: '',required: 'required'});
    var sexo = $("<select></select>", {name: 'sexo',id: 'sexo',class: 'form-control'});
    $(sexo).append(optionSexo);
    $(sexo).val('');
    $form_group.append(label);
    $form_group.append(sexo);
    $contenido.append($form_group);
    /********SUCURSAL********/
    label = $("<label></label>", {for: 'idSucursal',text: 'Sucursal'});
    var optionSucursal = $("<option></option>", {name: 'empty',text: 'Seleccione Sucursal',value: '',
        required: 'required'});
    var sucursal = $("<select></select>", {name: 'idSucursal',id: 'idSucursal',class: 'form-control'});
    $(sucursal).append(optionSucursal);
    $(sucursal).val('');
    $form_group.append(label);
    $form_group.append(sucursal);
    $contenido.append($form_group);
    /********NIVEL AUTORIZACION********/
    label = $("<label></label>", {for: 'idnivelAutorizacion',text: 'nivel de Autorización'});
    var optionAutorizacion = $("<option></option>", {name: 'empty',text: 'Seleccione un nivel de autorización',
        value: '',required: 'required'});
    var idNivelAutorizacion = $("<select></select>", {name: 'idnivelAutorizacion',id: 'idnivelAutorizacion',
        class: 'form-control'});
    $(idNivelAutorizacion).append(optionAutorizacion);
    $(idNivelAutorizacion).val('');
    $form_group.append(label);
    $form_group.append(idNivelAutorizacion);
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
        inputEstado = $("<input>", {type: 'checkbox',checked: 'checked',name: 'onoffswitch',class: 'onoffswitch-checkbox',
            id: 'myonoffswitch'});
    } else {
        inputEstado = $("<input>", {type: 'checkbox',name: 'onoffswitch',class: 'onoffswitch-checkbox',id: 'myonoffswitch'
        });
    }
    var labelEstado = $("<label></label>", {class: 'onoffswitch-label',for: 'myonoffswitch'});
    var span1 = $("<span></span>", {class: 'onoffswitch-inner'});
    var span2 = $("<span></span>", {class: 'onoffswitch-switch'});
    $(labelEstado).append(span1);
    $(labelEstado).append(span2);
    $($form_group).append(label);
    $(divcontenedor).append(inputEstado);
    $(divcontenedor).append(labelEstado);
    $form_group.append(divcontenedor);
    $contenido.append($form_group);

    BootstrapDialog.show({
        title: 'Esta a punto de modificar los siguientes datos',
        message: function(dialog) {
            return $contenido;
        },
        type: BootstrapDialog.TYPE_WARNING,
        onshown: function() {
            cargarDropDownList((idNivelAutorizacion), 'idNivelAutorizacion', 'descripcion', API_SYS_PATH + 'nivel_autorizacion/seleccionar', $("#idUsuario").val(), undefined, undefined, undefined, element['idNivelAutorizacion']);
            cargarDropDownList((sucursal), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar',undefined, undefined, undefined, undefined, element['idSucursal']);
            cargarDropDownList((sexo), 'idSexo', 'descripcion', API_SYS_PATH + 'sexo/seleccionar', undefined, undefined, undefined, undefined, element['sexo']);
        },
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
            action: function(dialog) {
                var datos = {};
                if ($(password).val() != $(repetirpassword).val()) {
                    notificacionWarning('Las contraseñas no concuerdan');
                    $(password).val('');
                    $(repetirpassword).val('');
                    return false;
                }
                datos.usuario = $(usuario).val();
                datos.password = $(password).val();
                datos.nombre = $(nombre).val();
                datos.apellido = $(apellido).val();
                datos.sexo = $(sexo).val();
                datos.contacto = $(contacto).val();
                datos.idSucursal = $(sucursal).val();
                datos.idEstado = ($(inputEstado).prop('checked') == true ? '1' : '0');
                datos.idNivelAutorizacion = $(idNivelAutorizacion).val();
                if (datos.usuario == '' || datos.password == '' || datos.nombre == '' || datos.apellido == '' || datos.sexo == '' || datos.contacto == '' ||
                    datos.idSucursal == '' || datos.idEstado == '' || datos.idNivelAutorizacion == '') {
                    notificacionWarning('Ningún campo debe de ir vacío, favor de validar la información');
                    return false;
                }
                exitoso = function(datos) {
                    notificacionSuccess(datos.success);
                    $(tr).remove();
                    dialog.close();
                    inicializarTabla();
                };
                fallo = function(datos) {
                };
                peticionAjax(API_SYS_PATH + 'usuario/actualizar', datos, exitoso, fallo, 'Guardando cambios...');
            }
        }]
    });
}