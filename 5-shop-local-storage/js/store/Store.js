import {showMessageOfEmptyShopingCar,disabledButtonClearStore} from '../helpers/Helpers.js';


const bodyTable = document.querySelector('#list-card tbody');
const db = window.localStorage;
const notificacion = document.querySelector('.shoping');

/**
 * Function to add a product to the store
 * @param {*} objectProduct 
 */
function saveProductOnLocalStorage(objectProduct){
    /* Add property id*/
    objectProduct = {...objectProduct, id: Date.now()};
    const arrayProducts = JSON.parse(db.getItem('products'));
    
    if(arrayProducts){
        const {index, isNew} = isNewProduct(arrayProducts, objectProduct);
        if(isNew){
            db.setItem('products', JSON.stringify([...arrayProducts, objectProduct]));
        }else{
            /* Update quantity of one product */
            arrayProducts[index].quantity = Number(arrayProducts[index].quantity) + 1;
            db.setItem('products', JSON.stringify(arrayProducts));
        }
        
    }else{
        db.setItem('products', JSON.stringify([objectProduct]));
    }
}

/**
 * Function to check if the product is new
 * @param {*} arrayProducts 
 * @param {*} param1 
 * @returns object with index and isNew
 */
function isNewProduct(arrayProducts, {title}) {
    
    const indexOfProduct = arrayProducts.findIndex(callBackOfIsNewProduct.bind(this,title));
    return indexOfProduct === -1 ? {index:indexOfProduct, isNew:true} : {index:indexOfProduct, isNew:false};

}

/**
 * Function callBack of isNewProduct
 * @returns true if the product is not new
 */
function callBackOfIsNewProduct(){
    const [title, objectProduct] = arguments;
    return title.toLowerCase() === objectProduct.title.toLowerCase();
}

/**
 * Function to add rows to the table
 */
function apendRowsTable(){
    const arrayProducts = JSON.parse(db.getItem('products'));
    resetRowsTable();
    if(arrayProducts != null){
        arrayProducts.forEach(objectProduct => {
            bodyTable.appendChild(createRowTable(objectProduct));
        })
    }

}

/**
 * Function to create a row of the table
 * @param {*} objectProduct 
 * @returns 
 */
function createRowTable(objectProduct){
    const row = document.createElement('tr');
    row.setAttribute('id', objectProduct.id);
    // delete the id of the productOject
    delete objectProduct.id;

    for (const value of Object.values(objectProduct)) {
        if(validateImages(value)){
            const column = document.createElement('td');
            const image = document.createElement('img');
            image.src = `./img/${value}`;
            image.classList.add('u-full-width');
            column.appendChild(image);
            row.appendChild(column);
        }else{
            const column = document.createElement('td');
            column.textContent = value;
            row.appendChild(column);
        }
    }
    const btnDeleteProduct = createButtonDelete();
    row.appendChild(btnDeleteProduct);

    return row;
}

/**
 * Function to validate if the image is a image
 * @param {*} noun 
 * @returns 
 */
function validateImages(noun) {
    const expresionRegular = /.*\.(gif|jpe?g|bmp|png)$/igm;
    const isImage = expresionRegular.test(noun);    
    return isImage;
}

/**
 * Function to reset the table
 */
function resetRowsTable(){
    while(bodyTable.firstChild){
        bodyTable.firstChild.remove();
    }
}

/**
 * Function create button delete
 * @returns 
 */
 function createButtonDelete() {
    const column = document.createElement('td');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('eliminar-carrito');
    btnDelete.textContent = '🗑️';
    column.appendChild(btnDelete);
    return column;
}

/**
 * Function to search the index of the product
 * @param {*} id 
 * @returns 
 */
function searchProduct(id){
    const arrayProducts = JSON.parse(db.getItem('products'));
    const indexOfProduct = arrayProducts.findIndex(objectProduct => objectProduct.id === id);
    return indexOfProduct;
}


/**
 * Function to update the localStorage
 * @param {*} param0 
 */
function updateLocalStorage({state, index}){
    let arrayProducts = JSON.parse(db.getItem('products'));
    if(state){
        arrayProducts.splice(index, 1);
        db.setItem('products', JSON.stringify(arrayProducts));
    }else{
        const objectProduct = arrayProducts[index];
        objectProduct.quantity -= 1;
        db.setItem('products', JSON.stringify(arrayProducts));
    }
    apendRowsTable();
    
}

/**
 * Determine if the product is only one
 * @param {*} rowNode 
 * @returns 
 */
 function isOnlyOneProduct(indexOfProduct) {
    const arrayProducts = JSON.parse(db.getItem('products'));
    const objectProduct = arrayProducts[indexOfProduct];
    return objectProduct.quantity === 1 ? true : false;
}

/**
 * Function to update the notificacion
 * @returns 
 */
function updateNofication(){
    const arrayProducts = JSON.parse(db.getItem('products'));
    return arrayProducts != null ? Number(arrayProducts.length) : 0;
}


/**
 * Function to clean the store
 */
 function cleanStore() {
    db.clear();
    resetRowsTable();
    showMessageOfEmptyShopingCar();
    
    disabledButtonClearStore();

    // Set to zero the notificacion
    notificacion.setAttribute('title',`${updateNofication()}`);
}


export {
    saveProductOnLocalStorage,
    apendRowsTable,
    searchProduct,
    updateLocalStorage,
    isOnlyOneProduct,
    updateNofication,
    cleanStore
}