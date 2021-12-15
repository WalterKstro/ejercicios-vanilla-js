const db = window.localStorage;
/**
 * Calculates the total of the subtotals
 * @param {*} rows 
 */
function calculateTotal() {
    const total = calculateSubTotal().reduce((previousSubtotal, total) => previousSubtotal + total,0);
    return applyFormatCurrency(total);
}


/**
 * Calculates the subtotal of the rows
 * @param {*} rows 
 * @returns 
 */
function calculateSubTotal(){
    let arraySubtotals = 0;
    const arrayProducts = JSON.parse(db.getItem('products'));
    if(arrayProducts != null){
        arraySubtotals = arrayProducts.map(objectProduct => {
            return Number(objectProduct.quantity) * objectProduct.price;
        });
    }
    return arraySubtotals;
}

/**
 * Function to apply the format currency
 * @param {*} value 
 * @returns 
 */
function applyFormatCurrency(value){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
}
export default calculateTotal;