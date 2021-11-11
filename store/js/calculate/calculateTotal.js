/**
 * Calculates the total of the subtotals
 * @param {*} rows 
 */
function calculateTotal(rows) {
    const tagTotal = document.querySelector('#total');
    const total = calculateSubTotal(rows).reduce((previousSubtotal, total) => previousSubtotal + total,0);
    tagTotal.textContent = `$ ${total}`;
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

export default calculateTotal;