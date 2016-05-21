$(function() {
    arreglo={};
    arreglo['bandera']=true;
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar',arreglo, 12,false);

    });

function inicializarTabla3(){
    var datosTabla3 = {};
    datosTabla3['idSucursal'] = document.getElementById('idSucursal').value;
    console.warn(datosTabla3);
    cargarTabla3(datosTabla3,10);
}
$('#parametro').submit(function(){
    inicializarTabla3();
    return false;
});

function agregarTDaTR (tr,element){
    var td = $("<td class='text-center'></td>");
    $(td).append(element);
    $(tr).append(td);
}
function cargarTabla3(arregloConInputs,idTransaccion) {
    arregloConInputs['idTransaccion']=idTransaccion;
    $("#resultados").hide();
    var tbody = $("#resultados tbody").empty();
    exitoso = function(result){
        if(result.estado!=undefined){
            if(result.estado =='warning'){
                notificacionWarning(result.success);
                return;
            }
        }
        console.log(result);
        var find = false;
        result.data.forEach( function(element, index) {
            find = true;
            var tr = $("<tr></tr>");

            var idSucursal = element['idSucursal'];
            var accion = element['accion'];
            var parametro = element['parametro'];
            var valor = element['valor'];
            var comentario = element['comentario'];
            var usuario = element['usuario'];
            var fechaActualizacion = element['fechaActualizacion'];

            var editar = $("<button></button>",{class:'btn btn-primary'});
            var icono_editar = $("<i></i>",{class:'fa fa-pencil-square-o'});
            editar.append(icono_editar);
            editar.append(" Editar");
            $(editar).click(function(){
                editarParametros(element,tr);
            })
            agregarTDaTR(tr,accion);
            agregarTDaTR(tr,parametro);
            agregarTDaTR(tr,valor);
            agregarTDaTR(tr,comentario);
            agregarTDaTR(tr,usuario);
            agregarTDaTR(tr,fechaActualizacion);
            agregarTDaTR(tr,editar);
            $(tbody).append(tr);
        });

        if(find){
            $('#resultados').show();
        }

    };
    fallo = function(datos){
        console.log(datos);
    };
    peticionAjax(API_SYS_PATH+'parametros/seleccionar',arregloConInputs,exitoso,fallo,'Cargando lista de Parametros');
}
function editarParametros(element,tr){
    var user = document.getElementById('nombreUsuario');
    var $contenido = $("<form></form>",{name:'formSucursal'});
    var $form_group = $("<div></div>",{class:'form-group'});

    var idSucursal = $("<input>",{name:'idSucursal',value:element['idSucursal'],class:'form-control', required:'required', readonly:'readonly'});
    $form_group.append(idSucursal);
    $form_group.append(idSucursal);
    $contenido.append($form_group);

    label = $("<label></label>",{for:'accion',text:'Acción'})
    var accion = $("<input>",{name:'accion',value:element['accion'],class:'form-control', required:'required', readonly:'readonly'});
    $form_group.append(label);
    $form_group.append(accion);
    $contenido.append($form_group);
    /********NOMBRE********/
        //$form_group = $("<div></div>",{class:'form-group'});
    label = $("<label></label>",{for:'parametro',text:'Parámetro'});
    var parametro = $("<input>",{name:'parametro',value:element['parametro'],class:'form-control', required:'required', readonly:'readonly'});
    $form_group.append(label);
    $form_group.append(parametro);
    $contenido.append($form_group);
    /********USUARIO********/
    var label = $("<label></label>",{for:'valor',text:'Valor'});
    var valor = $("<input>",{name:'valor',value:element['valor'],type:'text',class:'form-control', required: 'required'});
    $form_group.append(label);
    $form_group.append(valor);
    $contenido.append($form_group);
    /********CONTRASEÑA********/
        //$form_group = $("<div></div>",{class:'form-group'});
    label = $("<label></label>",{for:'comentario',text:'Comentario'});
    var comentario = $("<textarea></textarea>",{name:'comentario',value:element['comentario'],class:'form-control', required:'required',text:element['comentario']});
    $form_group.append(label);
    $form_group.append(comentario);
    $contenido.append($form_group);
    /********REPETIR CONTRASEÑA********/
        //$form_group = $("<div></div>",{class:'form-group'});
    label = $("<label></label>",{for:'usuario',text:'Usuario'});
    var usuario = $("<input>",{name:'usuario',value:element['usuario'],class:'form-control', required:'required',readonly:'readonly'});
    $form_group.append(label);
    $form_group.append(usuario);
    $contenido.append($form_group);

    /********APELLIDO********/
        //$form_group = $("<div></div>",{class:'form-group'});
    label = $("<label></label>",{for:'fechaActualizacion',text:'Fecha de Actualización'});
    var fechaActualizacion = $("<input>",{name:'fechaActualizacion',value:element['fechaActualizacion'],type:'text',class:'form-control', required:'required',readonly:'readonly'});
    $form_group.append(label);
    $form_group.append(fechaActualizacion);
    $contenido.append($form_group);
    $contenido.append($form_group);

    BootstrapDialog.show({
        title: 'Esta a punto de modificar los siguientes datos',
        message:function(dialog) {
            return $contenido;
        },
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
            label: 'Aceptar',
            cssClass: 'btn-danger',
            submit:function(dialog){

                return false;
            },
            action: function(dialog) {
                var datos = {};

                datos.idSucursal =$(idSucursal).val();
                datos.accion = $(accion).val();
                datos.parametro= $(parametro).val();
                datos.valor=$(valor).val();
                datos.comentario=$(comentario).val();
                datos.usuario=user.value;
                datos.fechaActualizacion=$(fechaActualizacion).val();
                console.log(datos);
                if(datos.valor==''||datos.comentario==''||datos.usuario==''||datos.fechaActualizacion==''){
                    notificacionWarning('Ningún campo debe de ir vacío, favor de validar la información');
                    return false;
                }

                console.log(datos);
                exitoso = function(datos){

                    notificacionSuccess(datos.success);
                    $(tr).remove();
                    dialog.close();
                    inicializarTabla3();
                };
                fallo = function(datos){
                    // notificacionError(datos.error);
                };
                peticionAjax(API_SYS_PATH+'parametros/actualizar',datos,exitoso,fallo,'Guardando cambios...');
                return false;
            }
        }]
    });
}