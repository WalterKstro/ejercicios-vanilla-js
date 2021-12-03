/**
 * Function to count the number of results
 * @param {*} total 
 */
 function counterResultsNumber(total){
    const counterResults = document.getElementById('counter_result');
    counterResults.innerHTML = total;
}

/**
 * Function to show the message when there are no results
 */
function showEmptyFilterResultsMessage(){
    const parentNode = document.querySelector('#app_container');
    const isMessage = document.querySelector('.message');
    isMessage === null && createHtmlMessage(parentNode,"No hay resultados para la búsqueda");
}

/**
 * Function to hide the message when there are no results
 */
function hideEmptyFilterResultsMessage(){
    const message = document.querySelector('.message');
    message ? message.remove() : null; 
} 

/**
 * Function to create the html message
 * @param {*} parentNode 
 * @param {*} message 
 */
function createHtmlMessage(parentNode, message){
    const containerMessage = document.createElement('p');
    containerMessage.classList.add('message');
    containerMessage.textContent = message;
    parentNode.appendChild(containerMessage);
}


export {
    counterResultsNumber,
    showEmptyFilterResultsMessage,
    hideEmptyFilterResultsMessage,
    createHtmlMessage
}