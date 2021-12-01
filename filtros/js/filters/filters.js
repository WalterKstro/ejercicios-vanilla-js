import { getAllData} from "../fetchAPI/getAll.js";
import {resetTableRows,createTableRow,filterYears} from "../load/load.js";

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
function applyFilter(evt){
 getAllData(url)   
 .then(saveCopyData)

  const key = evt.target.id;
  const value = evt.target.value != "" ? evt.target.value : "";
  
  const index = paramsFilter.findIndex(objectFilter => objectFilter.key == key);
  index === -1 ? paramsFilter.push({key, value}) : paramsFilter[index].value = value;

    setTimeout(() => {
        paramsFilter.forEach(param => {
      
            if(param.key=='brand'){
                copyData = copyData.filter(car => {
                    return car[param.key].includes(param.value);
                });
            }
            if(param.key=='year'){
                copyData = copyData.filter(car => {
                    return String(car[param.key]).includes(param.value);
                });
            }

            if(param.key=='price-min'){
                copyData = copyData.filter(car => {
                    return String(car[param.key]).includes(param.value);
                });
            }
            if(param.key=='price-max'){
                copyData = copyData.filter(car => {
                    return String(car[param.key]).includes(param.value);
                });
            }
            if(param.key=='doors'){
                copyData = copyData.filter(car => {
                    return String(car[param.key]).includes(param.value);
                });
            }
            if(param.key=='color'){
                copyData = copyData.filter(car => {
                    return car[param.key].includes(param.value);
                });
            }
            
            if(param.key=='transmission'){
                copyData = copyData.filter(car => {
                    return car[param.key].includes(param.value);
                });
            }
            
        });
        
        resetTableRows();       
        copyData.forEach(objectCar => {
            createTableRow(objectCar);
            filterYears(objectCar);
        });
        
        counterResultsNumber(copyData.length);
    } , 1000);
}


function counterResultsNumber(total){
    const counterResults = document.getElementById('counter_result');
    counterResults.innerHTML = total;
}
 
export {
    applyFilter,
    counterResultsNumber
}