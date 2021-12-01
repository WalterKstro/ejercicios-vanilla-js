import { getAllData} from "../fetchAPI/getAll.js";
import { counterResultsNumber, createHtmlMessage } from "../filters/filters.js";

const tableBody = document.querySelector('#results tbody');
const typeError = document.querySelector('#error');
const years = new Set();
const url = "https://my-json-server.typicode.com/WalterKstro/json-server/cars";


/**
 * Function to load all data from API
 */
function functionLoadData() {

    getAllData(url)
        .then(data => {
            resetTableRows();       
			data.forEach(objectCar => {
                createTableRow(objectCar);
                filterYears(objectCar);
            });  
            counterResultsNumber(data.length);
        })
        .catch(error => {
            const parentNode = document.querySelector('#app_container');
            createHtmlMessage(parentNode,"Error en obtener los datos, intente mas tarde");
        })
        .finally(() => {
            fillYearsOfSelect();
        });
		
	}
	


/**
 * Function to create a table row
 * @param {*} carObject 
 */
function createTableRow(carObject) {
    const tableRow = document.createElement('tr');

    for (const key in carObject) {
        const tableDescription = document.createElement('td');
        tableDescription.textContent = carObject[key];
        tableRow.appendChild(tableDescription)
    }

    tableBody.appendChild(tableRow);
}


/**
 * Function to delete year repeated
 * @param {*} param0 
 */
function filterYears({year}) {
    years.add(year);
}

/**
 * Function to fill select years
 */
function fillYearsOfSelect() {
    const selectYears = document.querySelector('#year');
    for (const year of orderDescYears()) {
        const option = document.createElement('option');
        option.textContent = year;
        selectYears.appendChild(option);
    }
}

/**
 * Function to order years of DESC
 * @returns 
 */
function orderDescYears() {
    return Array.from(years).sort(orderYears);
}
/**
 * Callback order years
 * @param {*} prevYear 
 * @param {*} nextYear 
 * @returns 
 */
function orderYears(prevYear, nextYear) {
    return nextYear - prevYear;
}


function resetTableRows(){
    while(tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild);
    }
}
export {
    functionLoadData,
    resetTableRows,
    createTableRow,
    filterYears,
};