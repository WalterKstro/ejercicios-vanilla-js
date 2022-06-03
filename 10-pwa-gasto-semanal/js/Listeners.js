import {
    optionsAlertInitial,
    optionsAlertValidateValue
} from './Alert.js';
import Helpers from './Helpers.js';
import Expense from './Expense.js';

/**
 * Function to create a new expense
 * @param {*} evt 
 */
 function createNewExpense(){
    const [newBudget,evt] = [...arguments].splice(0,2);
    evt.preventDefault();
    const [description, value] = [...evt.target.elements].splice(0,2);

    if(Expense.validateValue(+value.value)){
        const expense = new Expense(description.value, +value.value);
        expense.saveExpenses();
        newBudget.calculateRest();
        newBudget.showExpenses();
        newBudget.showBudget(document.getElementById('rest'));
        newBudget.printPercentage(document.getElementById('percentage'));

        Helpers.clearFields(evt.target.elements);
        
    }else{
        Swal.fire(optionsAlertValidateValue);
    }
}

/**
 * Function to delete one expense
 */
function deleteOneExpense(){
    const [newBudget,evt] = [...arguments].splice(0,2);
    const isClassTarget = evt.target.classList.contains('list-group-item');
    isClassTarget && newBudget.deleteExpense(evt.target.id);
}

/**
 * Function to update the budget
 */
async function updateBudget(){
    const [newBudget,evt] = [...arguments].splice(0,2);
    const {value} = await Swal.fire(optionsAlertInitial);
    if(value){
        newBudget.setBudget = +value;
        newBudget.setRest = +value;
        newBudget.saveBudget();
        newBudget.calculateRest();
        newBudget.showBudget(document.getElementById('rest'));
        newBudget.printPercentage(document.getElementById('percentage'));
    }
}

export {
    createNewExpense,
    deleteOneExpense,
    updateBudget,
}