import {validateFieldsForm} from './validate.js';
import {sendForm, resetForm} from './messages.js';

const buttonReset = document.querySelector("#resetBtn");
const fieldEmail = document.querySelector("#email");
const fieldMessage = document.querySelector("#message");
const fieldSubject = document.querySelector("#subject");
const buttonSend = document.querySelector("#send");

/**
 * Function load the listeners
 */
function loadListeners() {
    fieldEmail.addEventListener("blur", validateFieldsForm);
    fieldMessage.addEventListener("blur", validateFieldsForm);
    fieldSubject.addEventListener("blur", validateFieldsForm);
    buttonSend.addEventListener("click", sendForm);
    buttonReset.addEventListener("click", resetForm);
}

document.addEventListener("DOMContentLoaded", loadListeners);













