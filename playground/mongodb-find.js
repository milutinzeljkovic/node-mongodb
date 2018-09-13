//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect');
    }
    console.log('connected to mongodb');
    const db=client.db('TodoApp');

    db.collection('Users').find({name: 'Marko'}).toArray().then((users)=>{
        console.log('Users');
        console.log(JSON.stringify(users,undefined,2));

    },(err)=>{
        console.log('Unable to fetch users',err);
    });




   // client.close();
});