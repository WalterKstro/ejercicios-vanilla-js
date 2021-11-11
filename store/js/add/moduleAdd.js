
import calculateTotal from '../calculate/calculateTotal.js';

const listOfProducts = document.querySelector('#list-card tbody');
const bodyTable = document.querySelector('.tbody');

/**
 * Function to add product to the store
 * @param {*} event 
 */
 function addProduct({ target }) {
    const isClass = target.classList.contains('agregar-carrito');
    if (isClass) {
        const nodeCard = target.parentNode.parentNode;
        const productObject = createObject(nodeCard);
        const row = createRowTable(productObject);

        if (isNewProduct(productObject)) {
            listOfProducts.appendChild(row);
        } else {
            addOneUnit(productObject);
        }

    }
    const rows = Array.from(bodyTable.children);
    calculateTotal(rows);
}

/**
 * Function create row of the table
 * @param {*} columns 
 * @returns 
 */
 function createRowTable(columns) {
    const row = document.createElement('tr');
    for (const key in columns) {
        const column = document.createElement('td');
        if (columns[key].includes('jpg')) {
            const image = document.createElement('img');
            image.src = `img/${columns[key]}`;
            image.classList.add('u-full-width');
            column.appendChild(image);
        } else {
            column.textContent = columns[key];
        }
        row.appendChild(column);
    }
    const btnDeleteProduct = createButtonDelete();
    row.appendChild(btnDeleteProduct);
    return row;
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
        price: usPrice.textContent,
        quantity: '1'
    }
}


/**
 * Function to determine if the product is new
 * @param {*} product 
 * @returns 
 */
 function isNewProduct(product) {
    const arrayProducttList = Array.from(listOfProducts.children);
    let isNewProduct = true;

    arrayProducttList.forEach(rowProduct => {
        const [, title, ,] = rowProduct.children;

        if (title.textContent.localeCompare(product.title) === 0) {
            isNewProduct = false;
        }

    });


    return isNewProduct;
}


/**
 * Function to add one unit to the store
 * @param {*} product 
 */
 function addOneUnit(product) {
    const arrayProducttList = Array.from(listOfProducts.children);
    arrayProducttList.forEach(row => {
        const [, title, , quantity] = row.children;
        if (title.textContent.localeCompare(product.title) === 0) {
            quantity.textContent = parseInt(quantity.textContent) + 1;
        }
    })
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

export default addProduct;