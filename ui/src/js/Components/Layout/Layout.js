
var m = require("mithril"); 
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
 
export const Layout = { 
oninit: () => {

},
view:(vnode) => {
return m('.cont_principal',[
m(Header),
vnode.children,
m(Footer),
])

}
}

