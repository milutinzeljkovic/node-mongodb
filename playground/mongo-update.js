//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect');
    }
    console.log('connected to mongodb');
    const db=client.db('TodoApp');

 /*   db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b9a8a2b8b0563cd8a3af1bc')
    }, {
        $set:{
            completed: true
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });
*/
    db.collection('Users').findOneAndUpdate({
        name: 'Milutin'
    }, {
        $set:{
            name: 'Milutin Zeljkovic'
        },
        $inc:{
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });




    // client.close();
});