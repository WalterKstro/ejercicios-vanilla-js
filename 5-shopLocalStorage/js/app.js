import {deleteProduct} from './delete/Delete.js';
import {showMessageOfEmptyShopingCar,isEmptyShopingCar,showMessageTotal,disabledButtonClearStore} from './helpers/Helpers.js';
import addProduct from './add/Add.js';
import {apendRowsTable,cleanStore,updateNofication} from './store/Store.js';

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
    
    disabledButtonClearStore();
}

loadListeners();

