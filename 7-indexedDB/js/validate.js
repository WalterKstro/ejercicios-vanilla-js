function loaderValidatesOfFieldsForms(){
    const [fieldName,fieldEmail,fieldPhone,fieldCompany,submitButton] = document.querySelector("#form-customer").elements;

    fieldName.addEventListener( 'blur', validateField );
    fieldEmail.addEventListener( 'blur', validateField );
    fieldPhone.addEventListener( 'blur', validateField );
    fieldCompany.addEventListener( 'blur', validateField );
}

function validateField(event){
    const objectErrorField = validateIsEmptyField(event);
    
    if(objectErrorField){
        showMessageError({objectErrorField,event});
    }else {
        hiddenMessageError(event);
        const specialFieldValidation = event.target.name;

        if(specialFieldValidation == 'email'){
            const objectErrorField = validateFieldEmail(event.target.value);
            (objectErrorField) && showMessageError({objectErrorField,event});
        }

        if(specialFieldValidation == 'phone'){
            const objectErrorField = validateFieldPhone(event.target.value);
            (objectErrorField) && showMessageError({objectErrorField,event});
        }
    }
}

function validateIsEmptyField({target}){
    // clear all error message, if exist
    target.nextElementSibling && target.nextElementSibling.remove();
    const {value} = target;
    
    if ((value == '') || (value == null) || (value == undefined)){
        return {message: `Campo ${target.name} es obrigatório`}   
    }
    return false;
}

function showMessageError({objectErrorField,event}){
    const target = event.target;
    target.parentNode.appendChild(createElementHtml(objectErrorField.message));
}
function hiddenMessageError(event){
    const nodeParent = event.target.parentNode;
    const nodeSpan = nodeParent.querySelector('span');
    nodeSpan && nodeSpan.remove();
}

function createElementHtml(message){
    const tagSpan = document.createElement('span');
    tagSpan.classList.add('text-red-500','px-2','py-1','text-xs','font-bold');
    tagSpan.textContent = message;
    return tagSpan;
}

function validateFieldEmail(email) {
    const expresionRegular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = expresionRegular.test(email.toLowerCase());

    return (isValidEmail) ? false : {message: 'Email es inválido'}
}

function validateFieldPhone(phone){
    const expresionRegular = /^[1-9]+[0-9]*$/;
    const isValidPhone = expresionRegular.test(phone.toLowerCase());

    return (isValidPhone) ? false : {message: 'Teléfono es inválido'}
}

export function validateIfExistOneFieldEmptySubmit({target}){
    const arrayFields = [...target.elements].slice(0, -1);
    let formIsValid = true;
    
    arrayFields.forEach(({value}) => {
        (value == '') && (formIsValid = false);
    });

    return formIsValid;
}

export default loaderValidatesOfFieldsForms;
