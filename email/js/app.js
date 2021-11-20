/**
 * Desabilitar botton de envio de formulario, hasta que se haya completado el formulario
 * Validar todos los campos del formulario, y si todos los campos son correctos, habilitar el boton de envio. Esto se hace en el evento onblur de cada campo.
 * En el evento onblur de cada campo, se valida que el campo no este vacio, y si es asi, se muestra un mensaje de error.
 * Una vez que se haya completado el formulario, se habilitara el boton de envio. y se ejecutara la funcion de envio del formulario. mostrando un loading  y finalizando con un mensaje de exito.
 * Luego se debe de resetear el formulario automaticamente.
 * Agregar botton de resetear formulario.
 * 
 */



const buttonReset = document.querySelector("#resetBtn");
const form = document.querySelector("#form");
const fieldEmail = document.querySelector("#email");
const fieldMessgae = document.querySelector("#message");
const fieldSubject = document.querySelector("#subject");
const alertMessage = document.querySelector("#alert_message");
const buttonSend = document.querySelector("#send");
const alertAllMessages = document.querySelectorAll(".alert");

/**
 * Function load the listeners
 */
function loadListeners() {
    fieldEmail.addEventListener("blur", validateFieldsForm);
    fieldMessgae.addEventListener("blur", validateFieldsForm);
    fieldSubject.addEventListener("blur", validateFieldsForm);
    buttonSend.addEventListener("click", sendForm);
    buttonReset.addEventListener("click", resetForm);
}

document.addEventListener("DOMContentLoaded", loadListeners);


/**
 * Function validate that all fields are not empty
 * @param {*} evt 
 */
function validateFieldsForm(evt) {
    const isEmptyField = isEmptyFieldForm(evt);

    if (isEmptyField) {
        shouldShowErrorMessage({ evt, isEmptyField })
        activeButtonSend(true);
    } else {
        shouldShowErrorMessage({ evt, isEmptyField });

        const fieldIsEmail = evt.target.hasAttribute('data-email');
        fieldIsEmail && validateEmail(evt.target.value)

        checkingIfExistFieldsEmpty() || checkingIfExistAlertMessage() ? activeButtonSend(true) : activeButtonSend(false);

    }
}

/**
 * Function validate that if the field is empty
 * @param {*} param0 
 * @returns 
 */
function isEmptyFieldForm({ target }) {
    const dataInput = target.value.toLowerCase().trim();
    return dataInput.length === 0 ? true : false;
}

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
 * Function that validate if the email is correct
 * @param {*} email 
 */
function validateEmail(email) {
    const expresionRegular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = expresionRegular.test(email.toLowerCase());
    alertMessage.textContent = "Email no es válido";
    !isValidEmail ? showAlertError(alertMessage) : hideAlertError(alertMessage);
}

/**
 * Function that check if exist alert message in the DOM
 * @returns 
 */
function checkingIfExistAlertMessage() {
    const arrayNodeAlerts = Array.from(alertAllMessages);
    const isSendForm = arrayNodeAlerts.some(nodeAlert => nodeAlert.classList.contains('alert__enabled'));
    return isSendForm;
}

/**
 * Function that check if exist fields empty in the DOM
 * @returns 
 */
function checkingIfExistFieldsEmpty() {
    const allFieldsForm = [fieldEmail, fieldMessgae, fieldSubject];
    const isEmptyField = allFieldsForm.some(field => field.value.length === 0);
    return isEmptyField;
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
    const loading = document.querySelector(".loading");
    loading.style.display = "inline-block";
}

/**
 * Function that show the success message
 */
function showMessageSuccess(){
    const loading = document.querySelector(".loading");
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

    const allFieldsForm = [fieldEmail, fieldMessgae, fieldSubject];
    allFieldsForm.forEach(field => field.value = "");
    const messageSuccess = document.querySelector(".success_sending");
    messageSuccess.style.display = "none";
}