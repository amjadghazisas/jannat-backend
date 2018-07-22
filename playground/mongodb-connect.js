const MongoClient = require('mongodb').MongoClient;

module.exports.connectToDB = (url,databaseName) => {

    
    //temp
    url = 'mongodb://localhost:27017/Jannat';
    databaseName = 'Jannat';

    //will also create data base Jannat if it doesnt exist
    MongoClient.connect(url,(err, client) => {

        const db = client.db(databaseName);
        if(err){

            return  console.log('unable to connect to mongodb server');
        }

        console.log('Connected to mongoDB server');

        return {client:client,db:db};        

    });


};

module.exports._closeConnection = (client) => {

    client.close();

};

//////////////////////////////////////Operations///////////////////////////////////////

module.exports.insert = (con, collectionName, document) => {

   con.db.collection(collectionName).insertOne(document,(err,result) => {

            if(err){

                return  console.log('Unsuccessful Insertion :(', err);
            }

            console.log('Successful Insertion :)', JSON.stringify(result.ops,undefined,2));
    });

    _closeConnection(con.client);

};

module.exports.fetch = (con, collectionName,queryObj) => {

    queryObj?queryObj=queryObj:queryObj={};

    con.db.collection(collectionName).find(queryObj).toArray().then((docs) => {
        
        console.log(JSON.stringify(docs,undefined,2));

        return docs;

    }, (err) => {

        console.log("Unable to fetch");
    });

    _closeConnection(con.client);
 
 };

 module.exports.fetchTotalCount = (con, collectionName) => {

    con.db.collection(collectionName).find().count().then((count) => {

        console.log(`Total records: $(count)`);
        return count;

    }, (err) => {

        console.log("Unable to fetch");
    });

    _closeConnection(con.client);
 
 };

 module.exports.deleteManyDocuments = (con, collectionName, queryObj) => {

    if(!queryObj){
        return;
    }

    con.db.collection(collectionName).deleteMany(queryObj).then((result) => {

        console.log(result);

    }, (err) => {
 
        console.log("Failed To Delete "+err);
    });

    _closeConnection(con.client);
 
 };

 module.exports.deleteOneDocument = (con, collectionName, queryObj) => {

    if(!queryObj){
        return;
    }

    con.db.collection(collectionName).deleteOne(queryObj).then((result) => {

        console.log(result);

    }, (err) => {
 
        console.log("Failed To Delete "+err);
    });

    _closeConnection(con.client);
 
 };

 module.exports.findOneDocumentAndDelete = (con, collectionName, queryObj) => {

    if(!queryObj){
        return;
    }

    con.db.collection(collectionName).findOneAndDelete(queryObj).then((result) => {

        console.log(result.value); //object that was deleted is provided here

    }, (err) => {
 
        console.log("Failed To Delete "+err);
    });

    _closeConnection(con.client);
 
 };