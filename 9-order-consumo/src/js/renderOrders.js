import { convertObjectToArray } from './utils.js';
import { requestGet } from './requests.js';
import search from './search.js';
import { resetRows } from './modals.js';

let list = [];
const input = document.querySelector('#search');

export async function renderOrders () {
    const isData = await requestGet( 'orders' );
    if ( isData ) {
        list = convertObjectToArray( isData );
        const isLoaded =  await insertListItem( list, document.querySelector('#list-orders') );

        if ( isLoaded ) {
            input.addEventListener('keyup', async ({target}) => {
                const term = target.value ? target.value.toLowerCase() : '';
                const filtered = search( list, term );
                await insertListItem( filtered, document.querySelector('#list-orders') );
            });
        }
    }
}

function insertListItem( array, wrapperParent ) {
    resetRows( wrapperParent );
    return new Promise( resolve => {
        array.forEach(({key, customer}) => {
            wrapperParent.appendChild( createListItem( key, customer ) );
        });
        resolve(true);
    });
}

function createListItem(key, { name }) {
    const listItem = document.createElement('li');
    listItem.classList.add( 'item-order','py-2','px-6','cursor-pointer','hover:bg-amber-500','hover:text-gray-800','flex','justify-between','text-orange-500','font-bold','border-b','dark:border-gray-700' );
    listItem.dataset.key = key; 
    listItem.dataset.micromodalTrigger = "modal";
    listItem.innerHTML = `${key}  (${name})`;
    return listItem;
}

