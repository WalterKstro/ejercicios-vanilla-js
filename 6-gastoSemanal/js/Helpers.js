class Helpers{
    static DB = window.localStorage;

    /**
     * Methos to validate the quantity of the expenses
     * @param {*} value 
     * @returns 
     */
    static validateQuantity(value){
        const expresionRegular = /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/;
        return expresionRegular.test(value);
    }
    /**
     * Method to clear fields of form
     * @param {*} fields 
     */
    static clearFields(fields){
        const [description, value] = fields;
        description.value = '';
        value.value = '';
    }
    /**
     * Method to determine if exist a budget
     * @returns 
     */
    static isBudget(){
        const arrayBudget = JSON.parse(window.localStorage.getItem('budget'));
        return (arrayBudget === null) ? true : false;
    }
/**
 * Method to convert to JSON
 * @param {*} array 
 * @returns 
 */
    static convertToJSON(array){
        return JSON.stringify(array);
    }
    /**
     * Method to convert to array or object
     * @param {*} json 
     * @returns 
     */
    static convertToArrayOrObject(json){
        return JSON.parse(json);
    }
    /**
     * Method to determine if exist the value is more small than the budget
     * @param {*} value 
     * @returns 
     */
    static isSmallerThatBudget(value){    
        const {rest} = Helpers.convertToArrayOrObject(Helpers.DB.getItem('budget'));
        return (value <= rest) ? true : false;
    }
    /**
     * Method to colore the percentage
     * @param {*} percentage 
     */
    static coloredPercentage(percentage){
       const progressBar = document.getElementById('progress-bar');
       const states = [{'bg-danger':[0,30]},{'bg-warning':[31,60]},{'bg-success':[61,100]}];
       const classRemove = [...progressBar.classList].find(classItem => classItem.includes('bg-'));

       for (const value of states) {
           const [bgState] = Object.keys(value);
           const [ranges] = Object.values(value);
           const [min,max] = ranges;

              if(percentage >= min && percentage <= max){
                  progressBar.classList.remove(classRemove);
                  progressBar.classList.add(bgState);
              }
       }
    }

}

export default Helpers;