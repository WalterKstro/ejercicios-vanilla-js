import {deleteProduct} from './delete/moduleDelete.js';
import {showMessageOfEmptyShopingCar,isEmptyShopingCar,showMessageTotal} from './helpers/helpers.js';
import addProduct from './add/moduleAdd.js';
import {apendRowsTable,cleanStore,updateNofication} from './store/store.js';

const buttonCleanStore = document.querySelector('#vaciar-carrito');
const gridOfCourses = document.querySelector('#list-courses');
const bodyTable = document.querySelector('.tbody');
const notificacion = document.querySelector('.shoping');

function loadListeners() {
    apendRowsTable();

    gridOfCourses.addEventListener('click', addProduct);
    bodyTable.addEventListener('click', deleteProduct);
    buttonCleanStore.addEventListener('click', cleanStore);

    isEmptyShopingCar() ? showMessageOfEmptyShopingCar() : showMessageTotal();
    
    // Set to zero the notificacion
    notificacion.setAttribute('title',`${updateNofication()}`);
}

loadListeners();

