import {isEmptyShopingCar, showMessageTotal,showMessageOfEmptyShopingCar,disabledButtonClearStore} from '../helpers/Helpers.js';
import {searchProduct,updateLocalStorage,isOnlyOneProduct, updateNofication} from '../store/Store.js';


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

    disabledButtonClearStore();
    
    // Remove one notificacion
    notificacion.setAttribute('title',`${updateNofication()}`);
}



export{
    deleteProduct,
};