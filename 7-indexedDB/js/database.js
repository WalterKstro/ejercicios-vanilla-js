function connectingToDataBase(){
    const request = indexedDB.open("db-crm", 1);
    let DB;
        request.onupgradeneeded = function(event) {
            DB = request.result;
            const table = DB.createObjectStore('tb-customers',{
                keyPath: 'id',
                autoIncrement: true
            })
    
            table.createIndex("id","id",{unique: true});
            table.createIndex("name","name",{unique: false});
            table.createIndex("email","email",{unique: true});
            table.createIndex("company","company",{unique: false});
            table.createIndex("phone","phone",{unique: false});
        }
        request.onsuccess = function(event) {
            DB = request.result;
        }
        request.onerror = function(event) {
            console.log('Error in creating database');
        }
}
export default connectingToDataBase;