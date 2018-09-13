//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect');
    }
    console.log('connected to mongodb');
    const db=client.db('TodoApp');
/*
    db.collection('Users').deleteMany({name: "Marko"}).then((result)=>{
        console.log(result);
    });
    */
 /*   db.collection('Users').deleteOne({name: "Milutin"}).then((result)=>{
        console.log(result);
    });
*/
    db.collection('Users').findOneAndDelete({name: "Milutin"}).then((result)=>{
        console.log(result);
    });





    // client.close();
});