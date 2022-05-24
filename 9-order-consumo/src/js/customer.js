function isValidCustomer ( { customer } ) {
    const { name, date, total } = customer;
    return ((name !== undefined) && (date !== undefined) && (total !== 0)) ? true : false;
}


export {
    isValidCustomer,
}