import {isEmptyShopingCar, showMessageTotal,showMessageOfEmptyShopingCar} from '../helpers/helpers.js';
import {searchProduct,updateLocalStorage,isOnlyOneProduct, updateNofication} from '../store/store.js';

const bodyTable = document.querySelector('.tbody');
const notificacion = document.querySelector('.shoping');        

/**
 * Delete product from the store
 * @param {*} param0 
 */
 function deleteProduct({ target }) {
     
    const isClass = target.classList.contains('eliminar-carrito');

    if (isClass) {
        // get the id of the product
        const numberIdProduct = Number(target.parentNode.parentNode.getAttribute('id'));
        let indexOfProduct = searchProduct(numberIdProduct);

        if(isOnlyOneProduct(indexOfProduct)) {
            updateLocalStorage({state:true, index:indexOfProduct});
        }else{
            updateLocalStorage({state:false, index:indexOfProduct});
        }
        
        isEmptyShopingCar() ? showMessageOfEmptyShopingCar() : showMessageTotal();
    }
    
    // Remove one notificacion
    notificacion.setAttribute('title',`${updateNofication()}`);
}




/**
 * Function to clean the store
 */
 function cleanStore() {
    while (bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }
    showMessageOfEmptyShopingCar();

    // Set to zero the notificacion
    notificacion.setAttribute('title',`0`);
}



export{
    deleteProduct,
    cleanStore
};