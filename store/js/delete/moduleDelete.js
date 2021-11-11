import calculateTotal from '../calculate/calculateTotal.js';

const bodyTable = document.querySelector('.tbody');

/**
 * Delete product from the store
 * @param {*} param0 
 */
 function deleteProduct({ target }) {
    const isClass = target.classList.contains('eliminar-carrito');
    const row = target.parentElement.parentElement;
    if (isClass) {
        if (isOnlyOneProduct(row)) {
            row.remove();
        } else {

            const [, , , quantity] = row.children;
            quantity.textContent = parseInt(quantity.textContent) - 1;
        }

    }
    const rows = Array.from(bodyTable.children);
    calculateTotal(rows);
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
    const rows = Array.from(bodyTable.children);
    calculateTotal(rows);
}



export{
    deleteProduct,
    cleanStore
};