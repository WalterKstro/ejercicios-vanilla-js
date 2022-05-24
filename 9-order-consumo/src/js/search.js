function search( list, term ) {
    if( list != undefined ) {
        const results = list.filter( ({customer}) => {
            return customer.name.toLowerCase().includes( term );
        });
        
        return (results.length == 0) ? list : results;
    }
}

export default search;
