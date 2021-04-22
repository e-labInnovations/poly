import HomePage from "./pages/Home.js"
import AddItem from './pages/AddItem.js'


const Router = document.querySelector('ion-router');

Router.addEventListener('ionRouteDidChange', (e) => {
    let routeTo = e.detail.to;
    let routerFrom = e.detail.from;
    
    
})

let enableDarkMode = localStorage.getItem('enableDarkMode')==="true"?true:false;
if (enableDarkMode) {
  document.querySelector('body').classList.add('dark')
}