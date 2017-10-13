var m = require("mithril"); 
import './estilo.scss';
import { CrLogin } from '../../Controllers/CrLogin';



export const Header = { 
oninit: () => {

},
view:(vnode) => {
return m('.header',[
    m('.cont_max',[
        m('.cont_logo_header',[
            m('h4','CRUD USERS')
        ]),
        m('.user_btns',[
            m('a.btn_close_session',{ href:'#',onclick:CrLogin.Logout.salir },'CERRAR SESION'),
        ]),
    ])
 ])
 }

}

