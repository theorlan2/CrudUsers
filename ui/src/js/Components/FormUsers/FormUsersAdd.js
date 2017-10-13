var m = require("mithril"); 
import './estilo.scss';
import { CrForms } from '../../Controllers/CrForms';


export const FormUsersAdd = { 
oninit: () => {

},
oncreate: () => {
    var Date0 = flatpickr("#input_fecha", {
        maxDate: "2010-12-30",        
        defaultDate: "1990-12-30"        
    });    
},
view:(vnode) => {
return m('.cont_form_add',[
m('.cont_center_form',[
    m('h1.titulo','Agregar Usuario'),
 m('.divisor_inputs'),
    m('p','Nombre:'),
    m('input.input_form',{ type:'text',id:'input_nom' }),
m('.divisor_inputs'),
    m('p','Correo:'),
    m('input.input_form',{ type:'text',id:'input_correo' }),
m('.divisor_inputs'),
    m('p','Clave:'),
    m('input.input_form',{ type:'password',id:'input_clave' }),
m('.divisor_inputs'),
    m('p','Fecha de Nacimiento:'),
    m('input.input_form',{ type:'text',id:'input_fecha' }),
m('.divisor_inputs'),
    m('p','Sexo:'),
    m('p',[m('label[for="input_sex_f"]','Femenino'), m('input.radio_form',{ type:'radio',name:'sexo',id:'input_sex_f',value:'F' })]),
    m('p',[m('label[for="input_sex_m"]','Masculino'),m('input.radio_form',{ type:'radio',name:'sexo',id:'input_sex_m',value:'M' })]),
m('.divisor_inputs'),
m('button.btn_add_user',{ onclick:CrForms.Add.validar },'GUARDAR'),
 ]),
])

}
}