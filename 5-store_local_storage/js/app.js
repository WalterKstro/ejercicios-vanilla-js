import {deleteProduct,cleanStore} from './delete/moduleDelete.js';
import {showMessageOfEmptyShopingCar,isEmptyShopingCar,showMessageTotal} from './helpers/helpers.js';
import addProduct from './add/moduleAdd.js';
import {apendRowsTable} from './store/store.js';

const buttonCleanStore = document.querySelector('#vaciar-carrito');
const gridOfCourses = document.querySelector('#list-courses');
const bodyTable = document.querySelector('.tbody');

function loadListeners() {
    apendRowsTable();

    gridOfCourses.addEventListener('click', addProduct);
    bodyTable.addEventListener('click', deleteProduct);
    buttonCleanStore.addEventListener('click', cleanStore);

    isEmptyShopingCar() ? showMessageOfEmptyShopingCar() : showMessageTotal();
    

}

loadListeners();

