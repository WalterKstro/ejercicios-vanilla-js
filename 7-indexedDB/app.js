import saveCustomer from "./js/save.js";
import connectingToDataBase from "./js/database.js";
import getAll from "./js/getList.js";
import deleteOneRegister from './js/delete.js';
import updateRegister from './js/update.js';

(async function(){
    const table = document.querySelector('#list-registers');
    
    window.addEventListener('DOMContentLoaded', (event) => {
        connectingToDataBase();
        
        const locationUrl = window.location.pathname;
        
        if(locationUrl == '/new.html'){
            saveCustomer();
        }else{
            getAll();
            
            deleteOneRegister(table);
            updateRegister(table);
        }
        
    });


})();