import {isEmptyFieldForm, checkingIfExistFieldsEmpty, checkingIfExistAlertMessage} from './checking.js';
import {shouldShowErrorMessage, activeButtonSend, hideAlertError, showAlertError} from './messages.js';

const alertMessage = document.querySelector("#alert_message");

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
 * Function that validate if the email is correct
 * @param {*} email 
 */
 function validateEmail(email) {
    const expresionRegular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = expresionRegular.test(email.toLowerCase());
    alertMessage.textContent = "Email no es válido";
    !isValidEmail ? showAlertError(alertMessage) : hideAlertError(alertMessage);
}


export {
    validateFieldsForm
}