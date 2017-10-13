let m = require("mithril"); 
let validator = require('validator');

// Controlador Login
export const CrLogin = { 

Login:{
    LoginErro:false,
    EmailValido:true,
    PassValido:true,
    validar:()=> {
        var pass = document.getElementById('input_pass').value
        , correo = document.getElementById('input_correo').value;
        
        if(!validator.isEmail(correo) || correo == '' ){
            CrLogin.Login.EmailValido = false;           
        }
           if(pass == ''){
            CrLogin.Login.PassValido = false;
            }

            if(CrLogin.Login.PassValido && CrLogin.Login.EmailValido){
                CrLogin.Login.fetch();
            }
    },
    fetch:()=>{
        var pass = document.getElementById('input_pass').value
        , correo = document.getElementById('input_correo').value;
        document.querySelector('.cont_center').style.opacity = 0;
        document.querySelector('.cont_loading').style.opacity = 1;
        var Form = new FormData();           
        Form.append('correo',correo);
        Form.append('pass',pass);
        setTimeout(()=>{
            m.request({
                method: "POST",
                url: "api/v1/auth",
                data: Form,
                headers:{
                    'X-Requested-With': XMLHttpRequest
                }
            })
            .then(function(data) {
                if(data.susses){
                    localStorage.setItem("auth-token",data.token)
                    m.route.set('home');
                }else{
                    document.querySelector('.cont_loading').style.opacity = 0;
                    document.querySelector('.cont_center').style.opacity = 1;                        
                    }
            })
        },500);
    }
},
Logout:{
    salir:()=>{
        m.request({
            method: "POST",
            url: "api/v1/logout",
            headers:{
                'X-Requested-With': XMLHttpRequest
            }
        })
        .then(function(data) {
            localStorage.removeItem("auth-token");
            m.route.set('/login');
        })
    }
}



}