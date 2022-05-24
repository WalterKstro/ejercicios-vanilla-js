import {textContentButtons} from './getList.js';
import {alertDelete} from './alerts.js';

function deleteOneRegister(table){
    table.addEventListener('click', (event) => {
        const {textContent} = event.target;
        const id = event.target.parentElement.parentElement.children[0].textContent;
        if(textContent == textContentButtons) {
            alertDelete(id);
        }
    })
}


export default deleteOneRegister;