import { getAllData } from "../fetchAPI/getAll.js";

const tableBody = document.querySelector('#results tbody');
const typeError = document.querySelector('#error');


/**
 * Function to load all data from API
 */
function functionLoadData(){
    getAllData("https://my-json-server.typicode.com/WalterKstro/json-server/cars")
    .then(data => {
        data.forEach(objectCar => {
            createTableRow(objectCar);
        });
    })
    .catch(error => {
        typeError.textContent = "Error en obtener los datos. Intente más tarde";
    })
}

/**
 * Function to create a table row
 * @param {*} carObject 
 */
function createTableRow(carObject){
    const tableRow = document.createElement('tr');

    for (const key in carObject) {
        const tableDescription = document.createElement('td');
        tableDescription.textContent = carObject[key];
        tableRow.appendChild(tableDescription)
    }

    tableBody.appendChild(tableRow);
}

export default functionLoadData;