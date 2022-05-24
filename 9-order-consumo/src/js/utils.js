const sanitizeObject = ( event ) => {
    const [ stringName, numberQuantity, numberPrice, tagCheckbox ] = [ ...event.target.parentElement.parentElement.children ];
    const name      =   stringName.textContent;
    const quantity  =   +numberQuantity.firstElementChild.value;
    const price     =   +numberPrice.textContent;
    const key       =   tagCheckbox.dataset.key;

    return { name, quantity, price, key };
}

const convertObjectToArray = ( object ) => {
    return Object.entries( object ).map( ([ key, value ]) => ({ key, ...value }));
}


function formatCurrencyGT( total ) {
    const {format} = Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' });
    return format( total );
}

function getPropertiesProduct ( row ) {
    const id = row.dataset.key;
    const [ name, quantity, price ] = row.children;
    return  {
        name : name.textContent,
        quantity : +quantity.firstChild.value,
        price : +price.textContent,
        to: row.parentElement.id,
        id
    }
}

function formatDate() {
    const optionsFormatDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('es-ES', optionsFormatDate);
}

function splitObjectToArray ( object ) {
    return Object.values( object );
}

function clearFields() {
    const listTextInput = Array.from( document.querySelectorAll('input[type="text"]') );
    const listCheckbox = Array.from( document.querySelectorAll('input[type="checkbox"]') );

    [...listTextInput, ...listCheckbox].flat().forEach( input => {
        if( input.type == "text" ){
            input.value = "";
        }
        if( input.type == "checkbox" ){
            input.checked = false;
        }
    } );

}

function createAlert( message ) {
    const parent = document.querySelector('body');
    const alert = document.createElement('div');

    alert.classList.add('bg-red-600', 'text-white', 'text-bold', 'text-center', 'p-4','fixed', 'top-0', 'left-0', 'right-0', 'z-10', 'w-full');
    alert.textContent = message;
    parent.appendChild(alert);

    setTimeout( () => {
        alert.remove();
    } , 3000);
}


export {
    sanitizeObject,
    convertObjectToArray,
    formatCurrencyGT,
    getPropertiesProduct,
    formatDate,
    splitObjectToArray,
    clearFields,
    createAlert
}
