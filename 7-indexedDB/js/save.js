import loaderValidatesOfFieldsForms, {validateIfExistOneFieldEmptySubmit} from "./validate.js";
import {alertSave,alertValidateForm} from "./alerts.js";

const formCustomer = document.querySelector('#form-customer');


function saveCustomer(){
    let DB;
    const connectionDatabase = indexedDB.open("db-crm", 1);
    
    connectionDatabase.onsuccess = (event) => {
        DB = connectionDatabase.result;
    }
    connectionDatabase.onerror = (event) => {
        console.log('Error in creating database');
    }
    
    loaderValidatesOfFieldsForms();
    
    formCustomer.addEventListener('submit', event => {
        event.preventDefault();
        const formIsValid = validateIfExistOneFieldEmptySubmit(event);
        
        if(formIsValid){
            const [name,email,phone,company] = formCustomer.elements;
            
            const transaction = DB.transaction(['tb-customers'], 'readwrite');
            const createObjectStore = transaction.objectStore('tb-customers');
            createObjectStore.add({
                id: Date.now(),
                name: name.value,
                email: email.value,
                phone: phone.value,
                company : company.value
            });

            alertSave();

        }else{
            alertValidateForm();
        }

        clearFieldsForm();
    });
}

function clearFieldsForm(){
    formCustomer.reset();
}
export default saveCustomer;