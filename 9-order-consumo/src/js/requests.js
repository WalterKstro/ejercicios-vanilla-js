const requestGet = async ( endpoint )  =>   {
    const request   =   await fetch( `https://demos-free-default-rtdb.firebaseio.com/${endpoint}.json` );
    return await request.json();
}

const requestPost = async ( endpoint, data ) => {
    const request   =   await fetch( `https://demos-free-default-rtdb.firebaseio.com/${endpoint}.json`, {
        method: 'POST',
        body: JSON.stringify( data ),
        headers: {'Content-Type': 'application/json'}
    });
    return await request.json();
}

export {
    requestGet,
    requestPost,
}
