const bodyTable = document.querySelector('#list-card tbody');
const db = window.localStorage;

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

function apendRowsTable(){
    const arrayProducts = JSON.parse(db.getItem('products'));
    resetRowsTable();
    arrayProducts.forEach(objectProduct => {
        bodyTable.appendChild(createRowTable(objectProduct));
    })

}

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
    return row;
}

function validateImages(noun) {
    const expresionRegular = /.*\.(gif|jpe?g|bmp|png)$/igm;
    const isImage = expresionRegular.test(noun);    
    return isImage;
}

function resetRowsTable(){
    while(bodyTable.firstChild){
        bodyTable.firstChild.remove();
    }
}

export {
    saveProductOnLocalStorage,
    apendRowsTable
}