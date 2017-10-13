let m = require("mithril"); 
let validator = require('validator');

//  Data
export const CrData = { 

    UsersList:{
        Data:[],
 getUsers:()=>{
    m.request({
        method: "GET",
        url: "api/v1/users",
        headers:{
            'X-Requested-With': XMLHttpRequest
        }
    })
    .then(function(data) {
CrData.UsersList.Data = data.data
    })
 },

},
//Datos de un Usuario
User:{
        Data:[],
        Obtenido:false,
 getUser:(id)=>{
     CrData.User.Obtenido = false;
    m.request({
        method: "GET",
        url: "api/v1/user/"+id,
        headers:{
            'X-Requested-With': XMLHttpRequest
        }
    })
    .then(function(data) {
        CrData.User.Obtenido = true;        
CrData.User.Data = data.data
console.log(CrData.User.Data);
    })
 },

}



}