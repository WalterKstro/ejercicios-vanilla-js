/**
 * Function to request all data from API
 * @param {*} url 
 * @returns 
 */
async function getAllData(url) {
    const data = await fetch(url);
    const parseJson = await data.json()
    return parseJson;
}

export {
    getAllData
}