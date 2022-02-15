import {optionsAlertInitial} from './js/Alert.js';
import Budget from './js/Budget.js';
import Helpers from './js/Helpers.js';
import {
    createNewExpense,
    deleteOneExpense,
    updateBudget
} from './js/Listeners.js';


const submitFormExpense = document.getElementById('add-expense');
const listOfExpenses = document.getElementById('list-expenses');
const buttonUpdateBudget = document.getElementById('new-budget');

let newBudget;

(async () => {

    if(Helpers.isBudget()){
        const {value} = await Swal.fire(optionsAlertInitial);
        newBudget = new Budget(+value);
    }else {
        const {budget, rest} = Helpers.convertToArrayOrObject(Helpers.DB.getItem('budget'));
        newBudget = new Budget();
        newBudget.setBudget = budget;
        newBudget.setRest = rest;
    }
    
    newBudget.saveBudget();
    newBudget.calculateRest();
    newBudget.showBudget(document.getElementById('rest'));
    newBudget.printPercentage(document.getElementById('percentage'));
    newBudget.showExpenses();

    /*Send params and the event to callback*/
    submitFormExpense.addEventListener('submit', createNewExpense.bind(this,newBudget));
    listOfExpenses.addEventListener('click', deleteOneExpense.bind(this,newBudget));
    buttonUpdateBudget.addEventListener('click', updateBudget.bind(this,newBudget));

})();

