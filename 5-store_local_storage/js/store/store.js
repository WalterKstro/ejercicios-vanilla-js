const db = window.localStorage;

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

function isNewProduct(arrayProducts, {title}) {
    
    const indexOfProduct = arrayProducts.findIndex(callBackOfIsNewProduct.bind(this,title));
    return indexOfProduct === -1 ? {index:indexOfProduct, isNew:true} : {index:indexOfProduct, isNew:false};

}

function callBackOfIsNewProduct(){
    const [title, objectProduct] = arguments;
    return title.toLowerCase() === objectProduct.title.toLowerCase();
}



export {
    saveProductOnLocalStorage
}