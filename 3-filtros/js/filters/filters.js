import { getAllData} from "../fetchAPI/getAll.js";
import {resetTableRows,createTableRow,filterYears} from "../load/load.js";
import {counterResultsNumber,showEmptyFilterResultsMessage,hideEmptyFilterResultsMessage} from '../messages/messages.js';

const url = "https://my-json-server.typicode.com/WalterKstro/json-server/cars";
let paramsFilter = [];
let copyData = [];

/**
 * Function to save the copy of the data
 * @param {*} data 
 */
function saveCopyData(data){
    copyData = data;
}

/**
 * Function to filter the data
 * @param {*} evt 
 */
function applyFilter({target}){
 getAllData(url)   
 .then(saveCopyData)

  const key = target.id;
  const value = target.value != "" ? target.value : "";
  
  const index = paramsFilter.findIndex(objectFilter => objectFilter.key == key);
  index === -1 ? paramsFilter.push({key, value}) : paramsFilter[index].value = value;
  
    setTimeout(() => {
        paramsFilter.forEach(param => {            
            copyData = applyFilteres(param);
        });
        
        resetTableRows();       
        copyData.forEach(objectCar => {
            createTableRow(objectCar);
            filterYears(objectCar);
        });
        
        counterResultsNumber(copyData.length);
        copyData.length === 0 ? showEmptyFilterResultsMessage() : hideEmptyFilterResultsMessage();
    } , 500);
}


/**
 * Function to apply the filters
 * @param {*} param0 
 * @returns 
 */
function applyFilteres({key, value}){

    if(key.includes('price')){
        const keyPrice = key.split('_')[0];
        if(key.includes('min')){
            return copyData.filter(car => {
                console.log(car[keyPrice]);
                return car[keyPrice] >= value;
            });
        }else {
            return copyData.filter(car => {
                return value==='' ? car : car[keyPrice] <= value;
            });
        }
    }else {
        return copyData.filter(car => {
            return String(car[key]).includes(value);
        });
    }

}

export {
    applyFilter
}

