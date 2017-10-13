var m = require("mithril"); 
import './estilo.scss';
import { CrData } from '../../Controllers/CrData';
import { CrForms } from '../../Controllers/CrForms';

export const ListUsers = { 
oninit: () => {
  CrData.UsersList.getUsers();
},
oncreate:() => {

    $(document).ready(function() {
      setTimeout(()=>{
        $('#example').DataTable( {
          "language": {
            "url": "ui/js/esp.json"
          }
        });
      },200 ); 
    })
},
view:(vnode) => {
return m("table.table_list[cellspacing='0'][id='example'][width='100%']",
[
  m("thead", 
    m("tr",
      [
        m("th", 
          "Nombre"
        ),
        m("th", 
          "Correo"
        ),
        m("th", 
          "Fecha de Nacimiento"
        ),
        m("th", 
          "Sexo"
        ),
        m("th", 
          "Opciones"
        ),
      ]
    )
  ),
  m("tfoot", 
    m("tr",
      [
        m("th", 
          "Name"
        ),
        m("th", 
          "Position"
        ),
        m("th", 
          "Office"
        ),
        m("th", 
          "Age"
        ),
        m("th", 
          "Opciones"
        ),
      ]
    )
  ),
  m("tbody",
    [
CrData.UsersList.Data.map(function(item){
return  m("tr",
    [
      m("td", 
      item.name
      ),
      m("td", 
        item.email
      ),
      m("td", 
        item.birthday
      ),
      m("td", 
        item.gender
      ),
      m("td", 
    m('a.btn_optiones',{href:'/edit/'+item.id, oncreate:m.route.link },'Editar'),
      m('a.btn_borrar',{href:'#eliminar',title:item.id,onclick:CrForms.Delete.confirm },'Borrar') 
      ),

    ]
  )

})
    ]
  )
]
)

 }
}