/**
 * Calculates the total of the subtotals
 * @param {*} rows 
 */
function calculateTotal(rows) {
    const total = calculateSubTotal(rows).reduce((previousSubtotal, total) => previousSubtotal + total,0);
    return applyFormatCurrency(total);
}


/**
 * Calculates the subtotal of the rows
 * @param {*} rows 
 * @returns 
 */
function calculateSubTotal(rows){
    const subtotals = rows.map(row => {
        const [, ,price, units,] = Array.from(row.children);
        return price.textContent.substring(1) * units.textContent;
    });
    return subtotals;
}
function applyFormatCurrency(value){
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
}
export default calculateTotal;