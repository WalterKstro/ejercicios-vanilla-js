import {deleteProduct,cleanStore} from './delete/moduleDelete.js';
import {showMessageOfEmptyShopingCar} from './helpers/helpers.js';
import addProduct from './add/moduleAdd.js';

const buttonCleanStore = document.querySelector('#vaciar-carrito');
const gridOfCourses = document.querySelector('#list-courses');
const bodyTable = document.querySelector('.tbody');

function loadListeners() {
    const rowsOfTable = Array.from(bodyTable.children);

    gridOfCourses.addEventListener('click', addProduct);
    bodyTable.addEventListener('click', deleteProduct);
    buttonCleanStore.addEventListener('click', cleanStore);

    showMessageOfEmptyShopingCar();
}

loadListeners();

