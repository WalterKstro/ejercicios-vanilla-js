import { requestPost } from './requests.js';
import { showModalOrder } from './modals.js';
import { formatCurrencyGT,
         getPropertiesProduct,
         formatDate,
         splitObjectToArray,
         clearFields,
         createAlert } from './utils.js';
import { renderOrders } from './renderOrders.js';
import { subTotal } from './bill.js';
import { isValidCustomer, } from './customer.js';


let global = {
    order: {
        plates: [],
        drinks: [],
        desserts: []
    },
    customer: {
        name: undefined,
        total: 0,
        date: undefined 
    }
};

const [ plates, drinks, desserts]   =   Array.from( document.querySelectorAll('tbody') );
const buttonSendOrder               =   document.querySelector('#send-order');
const inputCustomer                 =   document.querySelector('#customer');
const listOrders                    =   document.querySelector('#list-orders');


function executeAddEventListenerOrder () {
    renderCurrentDate();

    plates.addEventListener('click', selectProduct);
    drinks.addEventListener('click', selectProduct);
    desserts.addEventListener('click', selectProduct);
    
    buttonSendOrder.addEventListener('click', sendOrder);
    inputCustomer.addEventListener('keyup', setCustomer);
    listOrders.addEventListener('click', showModalOrder);
}

async function sendOrder () {
    if (isValidOrder() && isValidCustomer( global )) {
        const { name } = await requestPost( 'orders', global );
        clearFields();
        renderOrders();
        resetOrder();
    }else {
        createAlert('Existen campos vacios');
    }
    
}

function setCustomer({ target }) {
    const { value } = target;
    global.customer.name = value;
}

function selectProduct ( { target } ) {
    const { type, checked } = target;
    const row = target.parentElement.parentElement;

    if ( type === 'checkbox' && checked ) {
        sendProduct( getPropertiesProduct( row ) );
    }

    if ( type === 'checkbox' && !checked ) {
        disabledSelection( row );
    }
}


function disabledSelection( row ) {
    const identityFirebase = row.dataset.key;
    const id = row.parentElement.id;

    const { quantity, price } = getPropertiesProduct( row );

    if ( id == plates.id && quantity > 0 ) {
        global.order.plates = global.order.plates.filter( plate  => plate.id !== identityFirebase);
        global.customer.total -= (quantity * price);
    }
    if ( id == drinks.id && quantity > 0 ) {
        global.order.drinks = global.order.drinks.filter( drink => drink.id !== identityFirebase);
        global.customer.total -= (quantity * price);
    }
    if ( id == desserts.id && quantity > 0 ) {
        global.order.desserts = global.order.desserts.filter( drink => drink.id !== identityFirebase);
        global.customer.total -= (quantity * price);
    }

    renderBill( formatCurrencyGT( global.customer.total ) );
}

function sendProduct ( { name, quantity, price, to, id } ) {
    
    if( to == plates.id ){
        global.order.plates.push( { name,quantity,price,id } );
        global.customer.total += subTotal( quantity, price);
    }
    
    if ( to == drinks.id ) {
        global.order.drinks.push( { name,quantity,price,id } );
        global.customer.total += subTotal( quantity, price);
    }
    
    if ( to == desserts.id ){
        global.order.desserts.push( { name,quantity,price,id } );
        global.customer.total += subTotal( quantity, price);
    }

    renderBill( formatCurrencyGT( global.customer.total ) );
}


function renderBill ( total ) {
    const bill = document.querySelector('#bill');
    bill.textContent = total;
}


function renderCurrentDate(){
    const dateElement = document.querySelector('#date');
    global.customer.date = formatDate();
    dateElement.textContent = formatDate();
}


function isValidOrder (  ) {
    const arrayOrders = splitObjectToArray( global.order );

    for (const order of arrayOrders) {
        if (order.length > 0) return true;
    }

    return false;
}

function resetOrder () {
    global = {
        order: {
            plates: [],
            drinks: [],
            desserts: []
        },
        customer: {
            name: undefined,
            total: 0,
            date: formatDate()
        }
    }
}

export {
    executeAddEventListenerOrder,
}