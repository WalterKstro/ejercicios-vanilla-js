import getAll from './getList.js';

function alertSave(){
    Swal.fire({
        title: 'Se ha guardado el cliente',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
    });
}

function alertValidateForm(){
    Swal.fire({
        title: 'Existen campos vacios',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
    });
}

function alertDelete(id){
    Swal.fire({
        title: '¿Esta seguro de borrar el registro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            processDeletingOnIndexedDB(+id);
        }
      })
}


function processDeletingOnIndexedDB( id ){

    const connectionDatabase = indexedDB.open("db-crm", 1);
    connectionDatabase.onsuccess = (event) => {
        const DB = connectionDatabase.result;
        const transaction = DB.transaction(['tb-customers'], 'readwrite');
        const createObjectStore = transaction.objectStore('tb-customers');
        createObjectStore.delete(id);

        transaction.oncomplete = (event) => {
            getAll();
        }
    };
}

export {
    alertSave,
    alertValidateForm,
    alertDelete
}