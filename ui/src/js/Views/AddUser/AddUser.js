var m = require("mithril"); 
import { Layout } from '../../Components/Layout/Layout';
import { ListUsers } from '../../Components/ListUsers/ListUsers';
import { FormUsersAdd } from '../../Components/FormUsers/FormUsersAdd';

export const AddUser = { 
oninit: () => {

},
view:() => {
return m(Layout,[
    m('.cont_relativo',[
        m('.cont_max',[
            m('a.btn_add_user',{ href:'/',oncreate:m.route.link },'VOLVER'),
        ])
    ]),
    m('.cont_relativo',[
    m('.cont_max',[
    m('.cont_back_blank',m(FormUsersAdd))        
    ]), 
    ]), 
    
]);

}

}

