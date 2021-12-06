const fieldEmail = document.querySelector("#email");
const fieldMessage = document.querySelector("#message");
const fieldSubject = document.querySelector("#subject");
const alertAllMessages = document.querySelectorAll(".alert");

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
    const allFieldsForm = [fieldEmail, fieldMessage, fieldSubject];
    const isEmptyField = allFieldsForm.some(field => field.value.length === 0);
    return isEmptyField;
}


export {
    isEmptyFieldForm,
    checkingIfExistFieldsEmpty,
    checkingIfExistAlertMessage
}