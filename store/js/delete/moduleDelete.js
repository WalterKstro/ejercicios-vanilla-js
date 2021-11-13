import {isEmptyShopingCar, showMessageTotal,showMessageOfEmptyShopingCar} from '../helpers/helpers.js';

const bodyTable = document.querySelector('.tbody');

/**
 * Delete product from the store
 * @param {*} param0 
 */
 function deleteProduct({ target }) {
    const isClass = target.classList.contains('eliminar-carrito');
    const rowTable = target.parentElement.parentElement;
    if (isClass) {
        if (isOnlyOneProduct(rowTable)) {
            rowTable.remove();
        } else {
            const [, , , quantity] = rowTable.children;
            quantity.textContent = parseInt(quantity.textContent) - 1;
        }

    }
    const rowsOfTable = Array.from(bodyTable.children);
    isEmptyShopingCar(rowsOfTable) ? showMessageOfEmptyShopingCar() : showMessageTotal();
}


/**
 * Determine if the product is only one
 * @param {*} rowNode 
 * @returns 
 */
 function isOnlyOneProduct(rowNode) {
    const units = rowNode.children[3].textContent;
    return units === '1' ? true : false;
}


/**
 * Function to clean the store
 */
 function cleanStore() {
    while (bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }
    showMessageOfEmptyShopingCar();
}



export{
    deleteProduct,
    cleanStore
};