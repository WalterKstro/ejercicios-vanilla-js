export const textContentButtons = 'Eliminar';

function getAll(){
    cleanRowsInTable();
    let DB;
    const connectionDatabase = indexedDB.open("db-crm", 1);
    
    connectionDatabase.onsuccess = (event) => {
        DB = connectionDatabase.result;
        const transaction = DB.transaction(['tb-customers'], 'readwrite');
        const createObjectStore = transaction.objectStore('tb-customers');
    
        createObjectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;

            if(cursor){
                drawHTML(cursor.value);
                cursor.continue();
            }
        }
    };
}

function drawHTML(objectRegister){
    const tr = document.createElement('tr');
    tr.setAttribute('contenteditable','true');
    
    for(const key in objectRegister){
        const td = document.createElement('td');
        td.textContent = objectRegister[key];
        td.classList.add('border','px-2','py-1');
        tr.appendChild(td);
    }

    tr.appendChild(createButtonActions());
    insertHTMLToDOM(tr);
}
function insertHTMLToDOM(nodoHTML){
    const table = document.querySelector('#list-registers');
    table.appendChild(nodoHTML);
}

function createButtonActions(){
    const td = document.createElement('td');
    td.setAttribute('contenteditable',"false");
    td.classList.add('border','px-2','py-1');
    const button = document.createElement('button');
    button.textContent = textContentButtons;
    button.classList.add('bg-transparent','hover:bg-blue-500','text-blue-700','hover:text-white','p-1','border','border-blue-500','hover:border-transparent','rounded');
    td.appendChild(button);

    return td;
}

function cleanRowsInTable(){
    const table = document.querySelector('#list-registers');
    table.innerHTML = '';
}

export default getAll;