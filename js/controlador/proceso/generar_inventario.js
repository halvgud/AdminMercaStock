$(function() {
    cargarDropDownList(("#idSucursal"), 'idSucursal', 'nombre', API_SYS_PATH + 'sucursal/seleccionar', 12,false,'cargando','Seleccione una Sucursal');
    cargarDropDownList(("#concepto"), 'idConcepto', 'descripcion', API_SYS_PATH + 'concepto/seleccionar', 12,false,'cargando','Seleccione un Concepto');
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
    var columnas = { idSucursal : x1
        , dep_id : x2 };
    //console.log(columnas)
    cargarDropDownList(("#cat_id"),'cat_id','nombre',API_SYS_PATH+'categoria/seleccionar',columnas,true,'Cargando...','Seleccione una Categoria');
}
var tabla;
var tabla2;
function configuracionAzar(){

    var $contenido = $("<form></form>",{name:'formSucursal'});
    var $form_group = $("<div></div>",{class:'form-inline'});

    var espacio2=$("<label> &nbsp;&nbsp; </label>");
    $form_group.append(espacio2);
    label = $("<label></label>",{for:'cantidad',text:'Cantidad de Artículos:\u00a0'});
    var nombre = $("<input>",{id:'cantidad',name:'cantidad',value:'10',type:'number',class:'form-control', required:'required', width :'15%'});
    $form_group.append(label);
    $form_group.append(nombre);
    var espacio=$("<label> &nbsp;&nbsp;&nbsp; </label>");
    $form_group.append(espacio);
    var remover = $("<button></button>",{id:"can",name:"can",type:'button',class:'btn btn-outline btn-success',text:'Generar'});
    $form_group.append(remover);
    var espacio3=$("<br><br>");
    $form_group.append(espacio3);
    tabla = $("<table></table>",{id:'tabla1',name:'tabla1',class:'table table-condensed',style:''});
    $form_group.append(tabla);

    var $thead = $("<thead></thead>",{name:'thead'});
    tabla.append($thead);
    var th1=$("<th>Clave</th>");
    tabla.append(th1);
    var th1=$("<th>Descripci&oacute;n</th>");
    tabla.append(th1);
    var th1=$("<th>Existencia</th>");
    tabla.append(th1);
    var th1=$("<th>Edici&oacute;n</th>");
    tabla.append(th1);


    $contenido.append($form_group);
    $(remover).click(function(){
        inicializarTabla4();
        return false;
    });

    BootstrapDialog.show({
        title: 'Configuración de Búsqueda Azar',
        message:function(dialog) {
            return $contenido;
        },width:'200%',
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
                dialog.close();
                var idSucursalf=document.getElementById('idSucursal').value;
                var cat_idf=document.getElementById('cat_id').value;
                var cantidadf=document.getElementById('cantidad').value;
                tabla2=tabla;
                //var tbody = $("#tabla1 tbody");
                tabla.clone().find('tr').appendTo($("#resultados tbody"));
            }
        }]
    });
}
function configuracionMasVendidos(){

    var $contenido = $("<form></form>",{name:'formSucursal'});
    var $form_group = $("<div></div>",{class:'form-inline'});

    var espacio2=$("<label> &nbsp;&nbsp; </label>");
    $form_group.append(espacio2);
    label = $("<label></label>",{for:'cantidad',text:'Cantidad:\u00a0'});
    var nombre = $("<input>",{id:'cantidad',name:'cantidad',value:'10',type:'number',class:'form-control', required:'required', width :'10%'});
    $form_group.append(label);
    $form_group.append(nombre);
    br =$("");
    $form_group.append(br);
    ////////////////////////////////////////////////////////////////////////
    label = $("<label></label>",{for:'hora_inicio',text:'\u00a0Inicio:\u00a0'});
    $form_group.append(label);

    inputInicio =$("<input>",{ type:'text', id:'hora_inicio', name:'hora_inicio', class:'form-control' , onclick:'hola();', autocomplete:'off',width :'17%', readonly:'readonly'});
    $form_group.append(inputInicio);

    label = $("<label></label>",{for:'hora_fin',text:'\u00a0Fin:\u00a0'});
    $form_group.append(label);
    inputInicio =$("<input>",{ type:'text', id:'hora_fin', name:'hora_fin', class:'form-control' , onclick:'hola();', autocomplete:'off', width :'17%', readonly:'readonly'});
    $form_group.append(inputInicio);
    var espacio=$("<label> &nbsp;&nbsp;&nbsp; </label>");
    $form_group.append(espacio);
    var remover = $("<button></button>",{id:"can",name:"can",type:'button',class:'btn btn-outline btn-success',text:'Generar'});
    $form_group.append(remover);
    var espacio3=$("<br><br>");
    $form_group.append(espacio3);
    tabla = $("<table></table>",{id:'tabla1',name:'tabla1',class:'table table-condensed',style:''});
    $form_group.append(tabla);

    var $thead = $("<thead></thead>",{name:'thead'});
    tabla.append($thead);
    var th1=$("<th>Clave</th>");
    tabla.append(th1);
    var th1=$("<th>Descripci&oacute;n</th>");
    tabla.append(th1);
    var th1=$("<th>Existencia</th>");
    tabla.append(th1);
    var th1=$("<th>Edici&oacute;n</th>");
    tabla.append(th1);


    $contenido.append($form_group);
    $(remover).click(function(){
        inicializarTabla4();
        return false;
    });
    hola();
    BootstrapDialog.show({
        title: 'Configuración de Búsqueda Mas Vendidos',
        message:function(dialog) {
            return $contenido;
        },width:'200%',
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
                dialog.close();
                //var idSucursalf=document.getElementById('idSucursal').value;
                //var cat_idf=document.getElementById('cat_id').value;
                //var cantidadf=document.getElementById('cantidad').value;
                tabla2=tabla;
                tabla.clone().find('tr').appendTo($("#resultados tbody"));
            }
        }]
    });
}
function configuracionMasConflictivos(){

    var $contenido = $("<form></form>",{name:'formSucursal'});
    var $form_group = $("<div></div>",{class:'form-inline'});

    var espacio2=$("<label> &nbsp;&nbsp; </label>");
    $form_group.append(espacio2);
    label = $("<label></label>",{for:'cantidad',text:'Cantidad:\u00a0'});
    var nombre = $("<input>",{id:'cantidad',name:'cantidad',value:'10',type:'number',class:'form-control', required:'required', width :'10%'});
    $form_group.append(label);
    $form_group.append(nombre);
    br =$("");
    $form_group.append(br);
    ////////////////////////////////////////////////////////////////////////
    label = $("<label></label>",{for:'hora_inicio',text:'\u00a0Inicio:\u00a0'});
    $form_group.append(label);

    inputInicio =$("<input>",{ type:'text', id:'hora_inicio', name:'hora_inicio', class:'form-control' , onclick:'hola();', autocomplete:'off',width :'17%', readonly:'readonly'});
    $form_group.append(inputInicio);

    label = $("<label></label>",{for:'hora_fin',text:'\u00a0Fin:\u00a0'});
    $form_group.append(label);
    inputInicio =$("<input>",{ type:'text', id:'hora_fin', name:'hora_fin', class:'form-control' , onclick:'hola();', autocomplete:'off', width :'17%', readonly:'readonly'});
    $form_group.append(inputInicio);
    var espacio=$("<label> &nbsp;&nbsp;&nbsp; </label>");
    $form_group.append(espacio);
    var remover = $("<button></button>",{id:"can",name:"can",type:'button',class:'btn btn-outline btn-success',text:'Generar'});
    $form_group.append(remover);
    var espacio3=$("<br><br>");
    $form_group.append(espacio3);
    tabla = $("<table></table>",{id:'tabla1',name:'tabla1',class:'table table-condensed',style:''});
    $form_group.append(tabla);

    var $thead = $("<thead></thead>",{name:'thead'});
    tabla.append($thead);
    var th1=$("<th>Clave</th>");
    tabla.append(th1);
    var th1=$("<th>Descripci&oacute;n</th>");
    tabla.append(th1);
    var th1=$("<th>Existencia</th>");
    tabla.append(th1);
    var th1=$("<th>Edici&oacute;n</th>");
    tabla.append(th1);


    $contenido.append($form_group);
    $(remover).click(function(){
        inicializarTabla4();
        return false;
    });
    hola();
    BootstrapDialog.show({
        title: 'Configuración de Búsqueda Mas Conflictivos',
        message:function(dialog) {
            return $contenido;
        },width:'200%',
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
                dialog.close();
                //var idSucursalf=document.getElementById('idSucursal').value;
                //var cat_idf=document.getElementById('cat_id').value;
                //var cantidadf=document.getElementById('cantidad').value;
                tabla2=tabla;
                tabla.clone().find('tr').appendTo($("#resultados tbody"));
            }
        }]
    });
}
function configuracionIndividual(){

    var $contenido = $("<form></form>",{id:'formSucursal',name:'formSucursal'});
    var $form_group = $("<div></div>",{class:'form-inline'});

    var espacio2=$("<label> &nbsp;&nbsp; </label>");
    $form_group.append(espacio2);
    label = $("<label></label>",{for:'cantidad',text:'Clave o Descripción del Artículo:\u00a0'});
    var nombre = $("<input>",{id:'input',name:'input',value:'',type:'text',class:'form-control', required:'required'});
    $form_group.append(label);
    $form_group.append(nombre);
    var espacio=$("<label> &nbsp;&nbsp;&nbsp; </label>");
    $form_group.append(espacio);
    var remover = $("<button></button>",{id:"can",name:"can",type:'button',class:'btn btn-outline btn-success',text:'Generar'});
    $form_group.append(remover);
    var espacio3=$("<br><br>");
    $form_group.append(espacio3);
    tabla = $("<table></table>",{id:'tabla1',name:'tabla1',class:'table table-condensed',style:''});
    $form_group.append(tabla);

    var $thead = $("<thead></thead>",{name:'thead'});
    tabla.append($thead);
    var th1=$("<th>Clave</th>");
    tabla.append(th1);
    var th1=$("<th>Descripci&oacute;n</th>");
    tabla.append(th1);
    var th1=$("<th>Existencia</th>");
    tabla.append(th1);
    var th1=$("<th>Edici&oacute;n</th>");
    tabla.append(th1);


    $contenido.append($form_group);
    $(remover).click(function(){
        inicializarTabla4();
        return false;
    });

    BootstrapDialog.show({
        title: 'Configuración de Búsqueda Individual',
        message:function(dialog) {
            return $contenido;
        },width:'200%',
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
                dialog.close();
                tabla2=tabla;
                tabla.clone().find('tr').appendTo($("#resultados tbody"));
            }
        }]
    });
}
function inicializarTabla4(){
    if(document.getElementById('concepto').value==1) {
        var idSucursalf = document.getElementById('idSucursal').value;
        var cat_idf = document.getElementById('cat_id').value;
        var cantidadf = document.getElementById('cantidad').value;
        var datosTabla4 = {};
        datosTabla4['idSucursal'] = idSucursalf;
        datosTabla4['cat_id'] = cat_idf;
        datosTabla4['cantidad'] = cantidadf;
        cargarTabla2(datosTabla4, 10);

    }else if(document.getElementById('concepto').value==2) {
        var idSucursalf = document.getElementById('idSucursal').value;
        var cat_idf = document.getElementById('cat_id').value;
        var cantidadf = document.getElementById('cantidad').value;
        //var input = document.getElementById('input').value;

        var datosTabla4 = {};
        datosTabla4['idSucursal'] = idSucursalf;
        datosTabla4['cat_id'] = cat_idf;
        datosTabla4['cantidad'] = cantidadf;
        datosTabla4['fechaInicio']=document.getElementById('hora_inicio').value;
        datosTabla4['fechaFin']=document.getElementById('hora_fin').value;
        //datosTabla4['input']= input;
        cargarTabla2(datosTabla4, 10);
    }else if(document.getElementById('concepto').value==3) {
        var idSucursalf = document.getElementById('idSucursal').value;
        var cat_idf = document.getElementById('cat_id').value;
        var cantidadf = document.getElementById('cantidad').value;
        //var input = document.getElementById('input').value;

        var datosTabla4 = {};
        datosTabla4['idSucursal'] = idSucursalf;
        datosTabla4['cat_id'] = cat_idf;
        datosTabla4['cantidad'] = cantidadf;
        datosTabla4['fechaInicio']=document.getElementById('hora_inicio').value;
        datosTabla4['fechaFin']=document.getElementById('hora_fin').value;
        //datosTabla4['input']= input;
        cargarTabla2(datosTabla4, 10);
    }else if(document.getElementById('concepto').value==4) {
        var datosTabla4 = {};
        var input = document.getElementById('input').value;
        datosTabla4['input']= input;
        cargarTabla2(datosTabla4, 10);
    }
}

function agregarTDaTR (tr,element){
    var td = $("<td class='text-center'></td>");
    $(td).append(element);
    $(tr).append(td);
}
var contador=0;
var remover2;
function remover(row){
    $('#'+row).remove();
}
function cargarTabla2(arregloConInputs,idTransaccion) {
    var tbody = $("#tabla1 tbody").empty();
    var datosTabla1 = {};
    var datosTabla2 = {};
    arregloConInputs['idTransaccion']=idTransaccion;
    if(document.getElementById('concepto').value==1) {
        var form1 = $("#resultados").find('input[data1]').serializeArray();
        form1.forEach(function(input) {
            datosTabla1[input.name] = input.value;
        });
    }
    if(document.getElementById('concepto').value==2) {
        var form1 = $("#resultados").find('input[data1]').serializeArray();
        //var form2 = $("#formSucursal").find('input').serializeArray();
        form1.forEach(function(input) {
            datosTabla1[input.name] = input.value;
        });
    }
    if(document.getElementById('concepto').value==3) {
        var form1 = $("#resultados").find('input[data1]').serializeArray();
        //var form2 = $("#formSucursal").find('input').serializeArray();
        form1.forEach(function(input) {
            datosTabla1[input.name] = input.value;
        });
    }
    if(document.getElementById('concepto').value==4) {
        var form1 = $("#resultados").find('input[data1]').serializeArray();
        //var form2 = $("#formSucursal").find('input').serializeArray();
        form1.forEach(function(input) {
            datosTabla1[input.name] = input.value;
        });
    }

    //console.log(datosTabla1);
    if(document.getElementById('concepto').value==1) {
        arregloConInputs['articulos'] = datosTabla1;
    }
    if(document.getElementById('concepto').value==2) {
        arregloConInputs['articulos'] = datosTabla1;
    }
    if(document.getElementById('concepto').value==3) {
        arregloConInputs['articulos'] = datosTabla1;
    }
    if(document.getElementById('concepto').value==4) {
        arregloConInputs['articulos'] = datosTabla1;
    }


    exitoso = function(result){
        if(result.estado!=undefined){
            if(result.estado =='warning'){
                notificacionWarning(result.success);
                return;
            }
        }
        var find = false;
        result.data.forEach( function(element, index) {
            find = true;
            contador++;
            var row = $("<tr></tr>",{id:contador,name:'row'+contador});
            var td = $("<td></td>");

            var claveArt = $("<input>",{name:"clave"+contador,id:"clave"+contador,class:'form-control',value:element['clave'],style:'width:85%;',readonly:'readonly' });
            td.append(claveArt);
            row.append(td);
            var descArt = $("<input>",{name:"descripcion",id:"descripcion"+contador,class:'form-control',value:element['descripcion'],readonly:'readonly' });
            td = $("<td></td>");
            td.append(descArt);
            row.append(td);
            var idArt = $("<input>",{type:'hidden',id:"art_id"+contador,name:"art_id"+contador,class:'art form-control',value:element['art_id'],data1:'true'});
            td.append(idArt);
            row.append(td);
            var exisArt = $("<input>",{id:"existencia"+contador,name:"existencia"+contador,type:'number',class:'form-control', value:element['existencia'],style:'width:65%;',readonly:'readonly'});
            td = $("<td></td>");
            td.append(exisArt);
            row.append(td);
            var icono = $("<i></i>",{class:'fa fa-minus-square'});
             remover2 = $("<button></button>",{id:"cantidad"+contador,name:"cantidad"+contador,type:'button',class:'btn btn-outline btn-danger',readonly:'readonly',onclick:'remover('+contador+');'});
            $(remover2).click(function(){
                $(row).remove();
                contador--;
            });
            remover2.append(icono);
             td = $("<td></td>");
            td.append(remover2);
            //console.log(contador)
            row.append(td);
             //console.log(row);
            tabla.append(row);
        });

        if(find){
            tabla.show();
        }

    };
    fallo = function(datos){
        console.log(datos);
    };
    //console.log(JSON.stringify(arregloConInputs));
    if(document.getElementById('concepto').value==1) {
        peticionAjax(API_SYS_PATH + 'inventario/seleccionarAzar', arregloConInputs, exitoso, fallo);
    }else if(document.getElementById('concepto').value==2) {
        peticionAjax(API_SYS_PATH + 'inventario/seleccionarMasVendidos', arregloConInputs, exitoso, fallo);
    }else if(document.getElementById('concepto').value==3) {
        peticionAjax(API_SYS_PATH + 'inventario/seleccionarMasConflictivos', arregloConInputs, exitoso, fallo);
    }else if(document.getElementById('concepto').value==4) {
        peticionAjax(API_SYS_PATH + 'inventario/seleccionarIndividual', arregloConInputs, exitoso, fallo);
    }
return false;
}


$("#send").submit(function() {
    var form1 = $("#resultados").find("input[data1]").serializeArray();
    var datosTabla1 = {};
    var subArreglo=[];
    form1.forEach(function(input) {
        if((input.name).indexOf("art_id") !=-1){
             subArreglo.push(input.value);
        }
    });
    datosTabla1['art_id']=subArreglo;
    datosTabla1['idSucursal']=$('#idSucursal').val();
    datosTabla1['idUsuario']=document.getElementById('idUsuario').value;
    exitoso = function(datos){
        notificacionSuccess(datos.success);
        return false;
    };
    fallo = function(datos){
        return false;
    };
    peticionAjax(API_SYS_PATH+'inventario/insertar',datosTabla1,exitoso,fallo,"Enviando datos...");
    return false;
});
$("#inventario").submit(function(){
   if(document.getElementById('concepto').value==1&&document.getElementById('cat_id').value!=""&&document.getElementById('dep_id').value!=""){
       configuracionAzar();
       return false;
   }
    if(document.getElementById('concepto').value==2&&document.getElementById('cat_id').value!=""&&document.getElementById('dep_id').value!=""){
        configuracionMasVendidos();
        return false;
    }
    if(document.getElementById('concepto').value==3&&document.getElementById('cat_id').value!=""&&document.getElementById('dep_id').value!=""){
        configuracionMasConflictivos();
        return false;
    }
    if(document.getElementById('concepto').value==4){
        configuracionIndividual();
        return false;
    }
    notificacionWarning("Faltan parametros para la busqueda");
    return false;
});
jQuery(function(){
    $.datetimepicker.setLocale('es');

    jQuery('#hora_inicio').datetimepicker({

        theme:'dark',
        format:'Y-m-d',
        onShow:function( ct ){
            this.setOptions({
                maxDate:jQuery('#hora_fin').val()?jQuery('#hora_fin').val():false
            })
        },
        timepicker:false
    });
    jQuery('#hora_fin').datetimepicker({
        theme:'dark',
        format:'Y-m-d ',
        onShow:function( ct ){
            this.setOptions({
                minDate:jQuery('#hora_inicio').val()?jQuery('#hora_inicio').val():false
            })
        },
        timepicker:false
    });
});
//jQuery(function(){
  function hola(){
    $.datetimepicker.setLocale('es');

    jQuery('#hora_inicio').datetimepicker({

        theme:'dark',
        format:'Y-m-d',
        onShow:function( ct ){
            this.setOptions({
                maxDate:jQuery('#hora_fin').val()?jQuery('#hora_fin').val():false
            })
        },
        timepicker:false
    });
    jQuery('#hora_fin').datetimepicker({
        theme:'dark',
        format:'Y-m-d ',
        onShow:function( ct ){
            this.setOptions({
                minDate:jQuery('#hora_inicio').val()?jQuery('#hora_inicio').val():false
            })
        },
        timepicker:false
    });
}/*)*/;