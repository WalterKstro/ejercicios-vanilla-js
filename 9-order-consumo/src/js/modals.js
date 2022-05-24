import { requestGet } from './requests.js';
import { formatCurrencyGT } from './utils.js';

const modalContent = document.querySelector('#modal-content');

async function showModalOrder ({target}) {
    const isTarget = target.classList.contains('item-order');
    const listSpans = selectTargetSpans( modalContent.querySelectorAll('span') );
    if ( isTarget ) {
        MicroModal.init();
        const { key } = target.dataset;
        const { customer, order} = await requestGet( `orders/${key}` );
        const listflattted = Object.values( order ).flat();


        printDataCustomer( {...customer, key}, listSpans );
        createRow( listflattted, document.getElementById('order__items') );
        MicroModal.show('modal');
    }
}

function createRow( list, wrapperParent ) {
    resetRows( wrapperParent );
    
    list.forEach( ({ name, price, quantity }) => {
        const tr = document.createElement('tr');
        tr.classList.add( 'text-left','divide-x-2','border-b' );
        const tdName = document.createElement('td');
        const tdQuantity = document.createElement('td');
        const tdPrice = document.createElement('td');

        tdName.textContent = name;
        tdQuantity.textContent = quantity;
        tdPrice.textContent = formatCurrencyGT( price );
        tr.append( tdName, tdQuantity, tdPrice );

        wrapperParent.append( tr );
    });
}

function resetRows ( wrapperParent ) {
    while ( wrapperParent.firstChild ) {
        wrapperParent.removeChild( wrapperParent.firstChild );
    }
}

function selectTargetSpans ( list ) {
    const listSpans = Array.from( list ).filter( (span, index) => {
        if ( index % 2 ) return span
    });
    return listSpans;
}

function printDataCustomer ( object, list ) {
    list.forEach( callbackForEach.bind( this, object ) );
}

function callbackForEach( object, span ) {
    const { id } = span;

    ( id === 'total' ) 
        ? span.textContent = formatCurrencyGT( object[ id ] )
        : span.textContent = object[ id ]
}


export {
    resetRows,
    showModalOrder
}