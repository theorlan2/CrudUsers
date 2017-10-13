var m = require("mithril"); 
import './estilo.scss';
import { CrForms } from '../../Controllers/CrForms';
import { CrData } from '../../Controllers/CrData';

export const FormUsersEdit = { 
oninit: (vnode) => { 
   CrData.User.getUser(vnode.attrs.idUser)
},
oncreate: () => {
    setTimeout(()=>{
        var Date1 = flatpickr("#input_fecha", {
            maxDate: "2010-12-30",        
            defaultDate: CrData.User.Data[0].birthday        
        });    
            },200);
        
},
view:(vnode) => {
return m('.cont_form_add',[
m('.cont_center_form',[
    m('h1.titulo','Editar Usuario'),    
 m('.divisor_inputs'),
 CrData.User.Obtenido ? CrData.User.Data.map((item)=>{
 return   m('.cont_inputs',[
     m('input',{ type:'hidden',id:'input_id',value:item.id }),
 m('p','Nombre:'),
    m('input.input_form',{ type:'text',id:'input_nom',value:item.name }),
m('.divisor_inputs'),
    m('p','Correo:'),
    m('input.input_form',{ type:'text',id:'input_correo',value:item.email }),
m('.divisor_inputs'),
    m('p','Fecha de Nacimiento:'),
    m('input.input_form',{ type:'text',id:'input_fecha',value:item.birthday }),
m('.divisor_inputs'),
    m('p','Sexo:'),
    m('p',[m('label[for="input_sex_f"]','Femenino'), m('input.radio_form',{ type:'radio',name:'sexo',id:'input_sex_f',value:'F',checked:item.gender == 'F' ? true : false  })]),
    m('p',[m('label[for="input_sex_m"]','Masculino'),m('input.radio_form',{ type:'radio',name:'sexo',id:'input_sex_m',value:'M',checked:item.gender == 'M' ? true : false })]),
m('.divisor_inputs'),
]) 
}) : '',
m('button.btn_form_cancel',{ onclick:function(){ m.route.set('/') } },'CANCELAR'),
m('button.btn_add_user',{ onclick:CrForms.Edit.validar },'GUARDAR'),
 ]),
])

}
}