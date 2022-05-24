const optionsAlertInitial = {
    title: 'Ingrese su presupuesto semanal',
    input: 'text',
    allowOutsideClick: true,
    allowEscapeKey: true,
    inputPlaceholder: 'Ingrese su presupuesto semanal',
    confirmButtonText: 'Aceptar',
    inputValidator: validateForm
}

/**
 * Function to validate the form of alert initial
 * @param {*} value 
 * @returns String
 */
function validateForm(value){
    const expresionRegular = /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/;
    const isNumber = expresionRegular.test(value);
    if (isNumber === false){
        return 'El valor ingresado debe ser un número';
    }
}

const optionsAlertValidateValue = {
    position: 'center',
    icon: 'error',
    title: 'La cantidad debe ser un valor numérico válido',
    showConfirmButton: false,
    timer: 3000
}

const optionsAlertExpenseToGreatherRest = {
    position: 'center',
    icon: 'error',
    title: 'Presupuesto restante, no es suficiente',
    showConfirmButton: false,
    timer: 2500
}
export {
    optionsAlertInitial, 
    optionsAlertValidateValue,
    optionsAlertExpenseToGreatherRest
};