
var m = require("mithril"); 
import './estilo.scss';
import { Layout } from '../../Components/Layout/Layout';
import { ListUsers } from '../../Components/ListUsers/ListUsers';

export const Home = { 
oninit: () => {

},
view:() => {
return m(Layout,[
    m('.cont_relativo',[
        m('.cont_max',[
            m('a.btn_add_user',{ href:'/add',oncreate:m.route.link },'AGREGAR USUARIO'),
        ])
    ]),
    m('.cont_relativo',[
    m('.cont_max',[
    m('.cont_back_blank',m(ListUsers))        
    ]), 
    ]), 
    
]);

}

}

