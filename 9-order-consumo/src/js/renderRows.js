import { convertObjectToArray } from './utils.js';
import { requestGet } from "./requests.js";


const requests = async () => {
    return await Promise.all( [
        requestGet( 'menu/plates' ),
        requestGet( 'menu/drinks' ),
        requestGet( 'menu/desserts' ),
    ]);
}


export const renderRows = async () => {
    const [ plates, drinks, desserts ] = await requests();
    const arrayPlates = convertObjectToArray( plates );
    const arrayDrinks = convertObjectToArray( drinks );
    const arrayDesserts = convertObjectToArray( desserts );

    createRow( arrayPlates, document.querySelector('#tbody_plates') );
    createRow( arrayDrinks, document.querySelector('#tbody_drinks') );
    createRow( arrayDesserts, document.querySelector('#tbody_desserts') );

}

function createRow ( array, wrapperParent ) {
    array.forEach( ({ name, price, key }) => {
        const tr = document.createElement('tr');
        tr.classList.add( 'text-orange-400','font-bold','border-b','bg-gray-800','border-gray-700' );
        tr.dataset.key = key;
        const tdName = drawDefault( name );
        const tdQuantity = drawInput( "text" );
        const tdPrice = drawDefault( price );
        const tdCheckbox = drawInput( "checkbox" );

        tr.append( tdName, tdQuantity, tdPrice, tdCheckbox );
        wrapperParent.append( tr );
    });
}

function drawDefault( content ) {
    const td = document.createElement('td');
    td.classList.add( 'px-6','py-3' )
    td.textContent = content;
    return td;
}
function drawInput( type ) {
    const td = document.createElement('td');
    td.classList.add( 'px-6','py-3' )
    const input = document.createElement('input');
    input.type = type;
    
    ( type === 'text' ) && input.classList.add( 'py-2','px-5','text-slate-700','outline-none' );
    
    td.append( input );
    return td;
}



export {
    createRow
}