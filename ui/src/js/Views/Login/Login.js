
var m = require("mithril"); 
import { Layout } from '../../Components/Layout/Layout';
import { CrLogin } from '../../Controllers/CrLogin';

export const Login = { 
oninit: () => {

},
view:() => {
return m('.cont_principal.login_page',[
m('.cont_logo_app',[
    m('h1','CRUD USERS APP'),
]),

    m(".cont_center",
    [
      m("h3", 
        "LOGIN"
      ),
      m(".cont_login_signup",
        [
          m(".cont_input_login",
            [
              m("p", 
                "Correo:"
              ),
              m("input.input_txt[name='correo'][id='input_correo'][type='text']"),
              m("p.p_error",{ style:CrLogin.Login.EmailValido ? 'display:none' : 'display:block' }, 
                "Verifica el correo"
              )
            ]
          ),
          m(".cont_input_login",
            [
              m("p", 
                "Clave:"
              ),
              m("input.input_txt[name='clave'][id='input_pass'][type='password']"),
              m("p.p_error",{ style:CrLogin.Login.PassValido ? 'display:none' : 'display:block' }, 
                "Verifique la clave"
              )
            ]
          ),
          m(".cont_btn", 
            m("button.btn_login", { onclick:CrLogin.Login.validar } , 
              "ENTRAR"
            )
          ),
         CrLogin.Login.LoginErro ? m('.cont_error_login',[
              m('p','Verifique el correo y usuario insertados.')
          ]) : '',
        
        ]
      ),
      m(".cont_loading", 
        m("svg[enable-background='new 0 0 40 40'][height='40px'][id='loader-1'][version='1.1'][viewBox='0 0 40 40'][width='40px'][x='0px'][xml:space='preserve'][xmlns='http://www.w3.org/2000/svg'][xmlns:xlink='http://www.w3.org/1999/xlink'][y='0px']",
          [
            m("path[d='M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z'][fill='#000'][opacity='0.2']"),
            m("path[d='M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z'][fill='#000']", 
              m("animateTransform[attributeName='transform'][attributeType='xml'][dur='0.5s'][from='0 20 20'][repeatCount='indefinite'][to='360 20 20'][type='rotate']")
            )
          ]
        )
      )
    ]
  )
]);

 }

}

