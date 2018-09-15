var {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b9b9fab5a300d12f04b9eec';
let userId= '5b9b792c28c64632dceba4b6';

if(!ObjectID.isValid(id)){
    console.log('Id not valid');
}

User.findById(userId).then((user)=>{

    if(!user){
        return console.log('user not found');
    }

    console.log('User by id',user);

}).catch((e)=>{
    console.log(e);
});

/*

Todo.find({
    _id: id
}).then((todos)=> {
    console.log('Todos', todos);
});

Todo.findOne({
   _id: id
}).then((todo)=>{
    console.log('Todo', todo);
});

Todo.findById(id).then((todo)=>{
   if(!todo){
       return console.log('Id not found');

   }
   console.log('Todo by id',todo);
}).catch((e)=>console.log(e));
*/





