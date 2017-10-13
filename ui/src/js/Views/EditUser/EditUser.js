var m = require("mithril"); 
import { Layout } from '../../Components/Layout/Layout';
import { ListUsers } from '../../Components/ListUsers/ListUsers';
import { FormUsersEdit } from '../../Components/FormUsers/FormUsersEdit';

export const EditUser = { 
oninit: () => {

},
view:(vnode) => {
return m(Layout,[
    m('.cont_relativo',[
        m('.cont_max',[
            m('a.btn_add_user',{ href:'/',oncreate:m.route.link },'VOLVER'),
        ])
    ]),
    m('.cont_relativo',[
    m('.cont_max',[
    m('.cont_back_blank',m(FormUsersEdit,{ idUser:vnode.attrs.id }))        
    ]), 
    ]), 
    
]);

}

}
