import Helpers from "./Helpers.js";
import {optionsAlertExpenseToGreatherRest} from "./Alert.js";

class Expenses{
    
    constructor(description, value){
        this.description = description;
        this.value = value;
        this.id = Date.now();
    }

    get getDescription(){
        return this.description;
    }
    get getValue(){
        return this.value;
    }
    /**
     * Method to save the expense
     */
    saveExpenses(){
        const arrayExpenses = Helpers.convertToArrayOrObject(Helpers.DB.getItem('expenses'));

        if(arrayExpenses && Helpers.isSmallerThatBudget(this.value)){
            arrayExpenses.push({description:this.description, value:this.value, id:this.id});
            Helpers.DB.setItem('expenses', Helpers.convertToJSON(arrayExpenses));
        }else if(Helpers.isSmallerThatBudget(this.value)){
            Helpers.DB.setItem('expenses', Helpers.convertToJSON(
                    [{description:this.description, value:this.value, id:this.id}]
                ));
        }else{
            Swal.fire(optionsAlertExpenseToGreatherRest);
        }
    }

    /**
     * Method to validate the value of the expense
     * @param {*} value 
     * @returns 
     */
    static validateValue(value){
        const expresionRegular = /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/;
        return expresionRegular.test(value);
    }


}

export default Expenses;