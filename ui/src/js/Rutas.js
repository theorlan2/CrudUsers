var m = require("mithril");
import { Home } from './Views/Home/Home';
import { Login } from './Views/Login/Login';
import { AddUser } from './Views/AddUser/AddUser';
import { EditUser } from './Views/EditUser/EditUser';
// Rutas 
export function init() {  
	m.route(document.getElementById('root'),"/",{
"/login":{
	onmatch: function() {
		if (!localStorage.getItem("auth-token")) return Login
		else m.route.set("/");
 }
},
"/": {
	onmatch: function() {
		if (!localStorage.getItem("auth-token")) m.route.set("/login")
		else return Home
	}
},
"/add": {
	onmatch: function() {
		if (!localStorage.getItem("auth-token")) m.route.set("/login")
		else return AddUser
	}
},
"/edit/:id": {
	onmatch: function() {
		if (!localStorage.getItem("auth-token")) m.route.set("/login")
		else return EditUser
	}
},
	});
}
