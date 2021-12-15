import {showMessageTotal,disabledButtonClearStore} from '../helpers/Helpers.js';
import {saveProductOnLocalStorage,apendRowsTable,updateNofication} from '../store/Store.js';


const notificacion = document.querySelector('.shoping');

/**
 * Function to add product to the store
 * @param {*} event 
 */
 function addProduct({ target }) {
    const isClass = target.classList.contains('agregar-carrito');
    
    if (isClass) {
        const nodeCard = target.parentNode.parentNode;
        const productObject = createObject(nodeCard);
        saveProductOnLocalStorage(productObject);
        apendRowsTable();
    }
    
    showMessageTotal();
    disabledButtonClearStore();
    
    // Change the number of notifications positive
    notificacion.setAttribute('title',`${updateNofication()}`);
}


/**
 * Function create object with the product
 * @param {*} nodeParent 
 * @returns 
 */
 function createObject(nodeParent) {
    const [image, info] = nodeParent.children;
    const [title, , , price] = info.children;
    const [usPrice] = price.children;
    return {
        image: image.src.substring(image.src.lastIndexOf('/') + 1),
        title: title.textContent,
        price: Number(usPrice.textContent.substring(1)),
        quantity: 1
    }
}

export default addProduct;