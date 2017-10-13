let m = require("mithril"); 
let validator = require('validator');

// Controlador Login
export const CrForms = { 
Add:{
valido:true,
  validar:()=>{
      CrForms.Add.valido = true;
let nom = document.getElementById('input_nom')
, correo = document.getElementById('input_correo')
, pass = document.getElementById('input_clave')
, fecha = document.getElementById('input_fecha')
, sex_f = document.getElementById('input_sex_f')
, sex_m = document.getElementById('input_sex_m');

if(nom.value == ''){
    alert('Debe Digitar el nombre');
    nom.focus();
    CrForms.Add.valido = false;
}else if(correo.value == '' ){
    alert('Debe Digitar el Correo');
    correo.focus();
    CrForms.Add.valido = false;
}else if(!validator.isEmail(correo.value)  ){
    alert('El Correo insertado no esta correcto');
    correo.focus();
    CrForms.Add.valido = false;
}else if(pass.value == ''){
    alert('Debe Digitar la clave');
    pass.focus();
    CrForms.Add.valido = false;
}else if(pass.value.lenght() < 6){
    alert('La clave es muy corta');
    pass.focus();
    CrForms.Add.valido = false;
}else if(fecha.value == ''){
    alert('Debe selecionar su fecha de Nacimiento');
    fecha.focus();
    CrForms.Add.valido = false;
}else if(sex_f.value == false && sex_m.value == false){
    alert('Debe Selecionar el Sexo');
    CrForms.Add.valido = false;
}

if(CrForms.Add.valido){
    CrForms.Add.ExisteCorreo();
}


},
ExisteCorreo:()=>{
    let correo = document.getElementById('input_correo');
 
    m.request({
        method: "GET",
        url: "api/v1/email?email="+correo.value,
        headers:{
            'X-Requested-With': XMLHttpRequest
        }
    })
    .then(function(data) {
        if(data.susses){
            alert('Ya existe una cuenta con este correo');
            correo.focus();
        }else{
            CrForms.Add.Guardar(); 
        }
    });
    
    
  },

  Guardar:()=>{
    let nom = document.getElementById('input_nom')
    , correo = document.getElementById('input_correo')
    , pass = document.getElementById('input_clave')
    , fecha = document.getElementById('input_fecha')
    , sex_f = document.getElementById('input_sex_f')
    , sex_m = document.getElementById('input_sex_m');
let sex;          
if(sex_f.checked) {
    sex = 'F';
}
if(sex_m.checked) {
    sex = 'M';
}

    let Form = new FormData();
Form.append('nombre',nom.value);
Form.append('correo',correo.value);
Form.append('pass',pass.value);
Form.append('cumple',fecha.value);
Form.append('sexo',sex);

m.request({
    method: "POST",
    url: "api/v1/user",
    data: Form,
    headers:{
        'X-Requested-With': XMLHttpRequest
    }
})
.then(function(data) {
    if(data.susses){
m.route.set('/');
}else{
    alert('Error Guardando el Usuario...');
    m.route.set('/');
    }
});


  }

},
// Form Editar Usuario
Edit:{
    valido:true,
    validar:()=>{
        CrForms.Edit.valido = true;
  let nom = document.getElementById('input_nom')
  , id = document.getElementById('input_id')
  , correo = document.getElementById('input_correo')
  , fecha = document.getElementById('input_fecha')
  , sex_f = document.getElementById('input_sex_f')
  , sex_m = document.getElementById('input_sex_m');
  
  if(nom.value == ''){
      alert('Debe Digitar el nombre');
      nom.focus();
      CrForms.Edit.valido = false;
  }else if(correo.value == '' ){
      alert('Debe Digitar el Correo');
      correo.focus();
      CrForms.Edit.valido = false;
  }else if(!validator.isEmail(correo.value)  ){
      alert('El Correo insertado no esta correcto');
      correo.focus();
      CrForms.Edit.valido = false;
  }else if(fecha.value == ''){
      alert('Debe selecionar su fecha de Nacimiento');
      fecha.focus();
      CrForms.Edit.valido = false;
  }else if(sex_f.value == false && sex_m.value == false){
      alert('Debe Selecionar el Sexo');
      CrForms.Edit.valido = false;
  }
  
  if(CrForms.Edit.valido){
      CrForms.Edit.Guardar(id.value);
   }
  
  },
  
    Guardar:()=>{
        
      let nom = document.getElementById('input_nom')
      , id = document.getElementById('input_id')
      , correo = document.getElementById('input_correo')
      , fecha = document.getElementById('input_fecha')
      , sex_f = document.getElementById('input_sex_f')
      , sex_m = document.getElementById('input_sex_m');
  let sex;          
  if(sex_f.checked) {
      sex = 'F';
  }
  if(sex_m.checked) {
      sex = 'M';
  }
  
      let Form = new FormData();
  Form.append('id',id.value);
  Form.append('nombre',nom.value);
  Form.append('correo',correo.value);
  Form.append('cumple',fecha.value);
  Form.append('sexo',sex);
  Form.append('_method','PUT'); // Para recivir el Metodo PUT
  
  m.request({
      method: "POST",
      url: "api/v1/user",
      data: Form,
      headers:{
          'X-Requested-With': XMLHttpRequest
      }
  })
  .then(function(data) {
      if(data.susses){
  m.route.set('/');
      }else{
   alert('Error Guardando los cambios en el Usuario...');
      }
  });
  
  
    }
},
// Eliminar Usuario
Delete:{
    confirm:(e)=>{
 
         if(confirm('Esta Seguro que desea eliminar este usuario?')){
            CrForms.Delete.Eliminar(e.target.title);
        } 
    },
    Eliminar:(id)=>{

        let Form = new FormData();
        Form.append('id',id);
        Form.append('token',localStorage.getItem("auth-token"));
        Form.append('_method','DELETE'); // Para recivir el Metodo DELETE
        
        m.request({
            method: "POST",
            url: "api/v1/user",
            data: Form,
            headers:{
                'X-Requested-With': XMLHttpRequest
            }
        })
        .then(function(data) {
            if(data.susses){
                window.location.reload();
            }
            if(data.token == false){
                alert('La Session se a cerrado, vuelve a logearte..');
                localStorage.setItem("auth-token",'');
                m.route.set('/login');                
            }
        });
        
    }
}



}