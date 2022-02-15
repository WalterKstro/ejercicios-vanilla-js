function updateRegister(table){
    table.addEventListener('focusout', (event) => {

        if(!event.target.classList.contains('rounded')) {
            const [ id,name,email,phone,company ] = [...event.target.children];
            const newObject = {
                id: +id.textContent,
                name: name.textContent,
                email: email.textContent,
                phone: phone.textContent,
                company: company.textContent
            }
            processUpdategOnIndexedDB(newObject);
        }

    })
}

function processUpdategOnIndexedDB(newObject){
    
    const connectionDatabase = indexedDB.open("db-crm", 1);

    connectionDatabase.onsuccess = (event) => {
        const DB = connectionDatabase.result;
        const transaction = DB.transaction(['tb-customers'], 'readwrite');
        const createObjectStore = transaction.objectStore('tb-customers');
        createObjectStore.put(newObject);
        transaction.oncomplete = (event) => {
            Swal.fire({
                title: 'Se ha actualizado correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

}


export default updateRegister;