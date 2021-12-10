const messageTotal = document.querySelector('#total');
import calculateTotal from '../calculate/calculateTotal.js';

const bodyTable = document.querySelector('.tbody');
const db = window.localStorage;

/**
 * Function to determinate if the shopping car is empty
 * @param {*} arrayRows 
 * @returns 
 */
function isEmptyShopingCar(){
    const arrayProducts = JSON.parse(db.getItem('products'));
    if(arrayProducts === null){
        return true;
    }
    return false;
}

/**
 * Function to show a message if the shopping car is empty
 */
function showMessageOfEmptyShopingCar() {
    
    if(isEmptyShopingCar()){
        const message = document.createElement('p');
        message.classList.add('message','msg_empty');
        message.textContent = 'No hay productos en el carrito';
        message.style.textAlign = 'center';
        message.style.fontWeight = 'bold';
        messageTotal.appendChild(message);
        
    }
}

/**
 * Function to show a message of total of the shopping car
 */
function showMessageTotal(){
    const oldMessage = document.querySelector('.msg_empty');
    
    oldMessage != null && oldMessage.remove();

    const rowsOfTable = Array.from(bodyTable.children);
    const isNodeTotal = document.querySelector('.msg_total');

    if(isNodeTotal){
        isNodeTotal.textContent = `Total: ${calculateTotal(rowsOfTable)}`;
    }else {
        const total = document.createElement('p');
        total.classList.add('message','msg_total');
        total.textContent = `Total: ${calculateTotal(rowsOfTable)}`;
        total.style.textAlign = 'center';
        total.style.fontWeight = 'bold';
        messageTotal.appendChild(total);
    }
}



export {
    isEmptyShopingCar,
    showMessageOfEmptyShopingCar,
    showMessageTotal,
}