import Helpers from "./Helpers.js";

class Budget{
    budget;
    rest;
    percentage;
    constructor(budget){
        this.arrayExpenses = this.getExpenses();
        this.budget = budget;
        this.rest = budget;
        this.percentage = 0;
    }

    get getBudget(){
        return this.budget;
    }
    get getRest(){
        return Helpers.DB.getItem('budget').rest;
    }

    set setBudget(value){
        this.budget = value;
    }
    set setRest(value){
        this.rest = value;
    }
    set setPercentage(value){
        this.percentage = value;
    }

    /**
     * Method to get the expenses
     * @returns {Array}
     */
    getExpenses(){
        const arrayExpenses = Helpers.DB.getItem('expenses');
        return arrayExpenses ? JSON.parse(arrayExpenses) : [];
    }

    /**
     * Method to show the expenses in the DOM
     */
    showExpenses(){
        this.resetList();
        const expensesList = document.getElementById('list-expenses');
        this.arrayExpenses = this.getExpenses();
        for (const {description,value,id} of this.arrayExpenses) {
            const li = document.createElement('li');
            li.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
            li.setAttribute('id',id);
            li.innerHTML = `${description}  <span class="badge bg-primary text-white">${this.applyFormatCurrency(value)}</span>`;
            expensesList.appendChild(li);
        }
    }

    /**
     * Method to reset the list
     */
    resetList(){
        const expensesList = document.getElementById('list-expenses');
        while(expensesList.firstChild){
            expensesList.firstChild.remove();
        }
    }
    
    /**
     * Method to show the budget and the rest in the DOM
     * @param {node} nodeHTML 
     */
    showBudget(nodeHTML){
        const {budget,rest} = Helpers.convertToArrayOrObject(Helpers.DB.getItem('budget'));

        if(nodeHTML.hasAttribute('data-total')){
            nodeHTML.textContent = this.applyFormatCurrency(budget);
        }else{
            nodeHTML.textContent = this.applyFormatCurrency(rest);
        }   
    }

    /**
     * Method to save the budget
     */
    saveBudget(){
        Helpers.DB.setItem('budget', JSON.stringify({budget:this.budget,rest:this.rest,percentage:this.percentage}));
    }
    /**
     * Method to apply the format currency
     * @param {value} value 
     * @returns 
     */
    applyFormatCurrency(value){
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
        return formatter.format(value);
    }

    /**
     * Method to calculate the rest of the budget
     */
    calculateRest(){
        const arrayExpenses = this.getExpenses();
        let {budget,rest,percentage} = Helpers.convertToArrayOrObject(Helpers.DB.getItem('budget'));
        const subtotal = arrayExpenses.reduce((total,current) => total + current.value,0);

        rest = budget - subtotal;
        percentage = Math.round(100 - (subtotal / budget) * 100);
        Helpers.coloredPercentage(percentage);

        Helpers.DB.setItem('budget', Helpers.convertToJSON({budget,rest,percentage}));
    }
    printPercentage(nodeHtml){
        let {percentage} = Helpers.convertToArrayOrObject(Helpers.DB.getItem('budget'));
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${percentage}%`;
        nodeHtml.textContent = `${percentage}%`;
    }

    /**
     * Method to delete an expense
     * @param {*} index 
     */
    deleteExpense(index){
        const arrayExpenses = this.getExpenses();
        const numberIndex = arrayExpenses.findIndex(({id}) => id == index);
        const {value} = arrayExpenses[numberIndex];

        arrayExpenses.splice(numberIndex,1);
        Helpers.DB.setItem('expenses', Helpers.convertToJSON(arrayExpenses));
        this.showExpenses();
        this.returnExpense(value);
        this.printPercentage(document.getElementById('percentage'));
    }
    
    /**
     * Method to return the expense
     * @param {*} value 
     */
    returnExpense(value){
        let {budget,rest,percentage} = Helpers.convertToArrayOrObject(Helpers.DB.getItem('budget'));
        rest+=value;
        Helpers.DB.setItem('budget', JSON.stringify({budget,rest,percentage}));
        this.showBudget(document.getElementById('rest'));
        this.calculateRest();
    }
}

export default Budget;