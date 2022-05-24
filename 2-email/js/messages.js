import {checkingIfExistAlertMessage, checkingIfExistFieldsEmpty} from './checking.js';

const buttonSend = document.querySelector("#send");
const loading = document.querySelector(".loading");
const alertAllMessages = document.querySelectorAll(".alert");
const fieldEmail = document.querySelector("#email");
const fieldMessage = document.querySelector("#message");
const fieldSubject = document.querySelector("#subject");
/**
 * Function that determines if should show the error message
 * @param {*} param0 
 */
 function shouldShowErrorMessage({ evt, isEmptyField }) {
    const nodeAlert = evt.target.nextElementSibling;
    isEmptyField ? showAlertError(nodeAlert) : hideAlertError(nodeAlert)
}

/**
 * Function that show the error message
 * @param {*} nodeAlert 
 */
function showAlertError(nodeAlert) {

    nodeAlert.classList.add('alert__enabled')
    nodeAlert.classList.remove('alert__disabled')
}

/**
 * Function that hide the error message
 * @param {*} nodeAlert 
 */
function hideAlertError(nodeAlert) {
    nodeAlert.classList.add('alert__disabled');
    nodeAlert.classList.remove('alert__enabled');
}

/**
 * Function that determines if the button send should be active or not
 * @param {*} isSendForm 
 */
 function activeButtonSend(isSendForm) {
    if (isSendForm) {
        buttonSend.classList.add('cursor-not-allowed', 'opacity-50');
    } else {
        buttonSend.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}


/**
 * Function that send the form
 * @param {*} evt 
 */
 function sendForm(evt) {
    evt.preventDefault();
    const isFielsEmpty = checkingIfExistFieldsEmpty() 
    const isAlerts = checkingIfExistAlertMessage();

    if(isAlerts  === false && isFielsEmpty === false){
        showLoading();
        setTimeout(() => {
            showMessageSuccess();
        } , 2000);
        setTimeout(() => {
            resetForm();
        } , 5000);
    }
}


/**
 * Function that show the loading
 */
 function showLoading(){
    loading.style.display = "inline-block";
}

/**
 * Function that show the success message
 */
function showMessageSuccess(){
    const messageSuccess = document.querySelector(".success_sending");
    loading.style.display = "none";
    messageSuccess.style.display = "flex";
}


/**
 * Function that reset the form
 * @param {*} evt 
 */
 function resetForm(evt=null){
    evt != null && evt.preventDefault()

    Array.from(buttonSend.classList).includes('cursor-not-allowed') == false && activeButtonSend(true);
    alertAllMessages.forEach(alert => {
        alert.classList.remove('alert__enabled');
        alert.classList.add('alert__disabled');
    });

    const allFieldsForm = [fieldEmail, fieldMessage, fieldSubject];
    allFieldsForm.forEach(field => field.value = "");
    const messageSuccess = document.querySelector(".success_sending");
    messageSuccess.style.display = "none";
}


export {
    shouldShowErrorMessage,
    activeButtonSend,
    showAlertError,
    hideAlertError,
    sendForm,
    resetForm
}