import {functionLoadData} from './load/load.js';
import {applyFilter} from './filters/filters.js';

/**
 * Variables globales for the filters
 */
const brandCar = document.querySelector('#brand');
const yearCar = document.querySelector('#year');
const priceMin = document.querySelector('#price-min');
const priceMax = document.querySelector('#price-max');
const doors = document.querySelector('#doors');
const color = document.querySelector('#color');
const transmission = document.querySelector('#transmission');

window.addEventListener('DOMContentLoaded', functionLoadData);

function loadListenerSelects(){
    brandCar.addEventListener('change', applyFilter);
    yearCar.addEventListener('change', applyFilter);
    priceMin.addEventListener('change', applyFilter);
    priceMax.addEventListener('change', applyFilter);
    doors.addEventListener('change', applyFilter);
    color.addEventListener('change', applyFilter);
    transmission.addEventListener('change', applyFilter);
}
loadListenerSelects();

