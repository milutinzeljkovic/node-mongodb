var express= require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');
var {authenticate} = require('./middleware/authenticate');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {ObjectID} = require('mongodb');

var app = express();


app.use(bodyParser.json());


app.patch('/todos/:id',(req,res)=>{
   var body = _.pick(req.body,['text','completed','completedAt']);
    var id= req.params.id;
   if(!ObjectID.isValid(id)){
       return res.status(404).send();
   }
   if(_.isBoolean(body.completed) && body.completed){
       body.comletedAt= new Date().getTime();
   }else{
       body.comletedAt=null;
       body.completed=false;
   }
   Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
       if(!todo){
           return res.status(404).send();
       }
       res.send(todo);
   }).catch((e)=>{
       res.status(400).send();
   });

});

app.post('/todos',(req,res)=>{
   let todo = new Todo({
       text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    let user= new User(body);
    user.save().then(()=>{
        return user.generateAuthToken();
       // res.send(doc);
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })

});

app.post('/users/login',(req,res)=>{
   var body = _.pick(req.body,['email','password']);
   User.findByCredentials(body.email,body.password).then((user)=>{
     return user.generateAuthToken().then((token)=>{
         res.header('x-auth',token).send(user);
     });
   }).catch((e)=>{
       res.status(400).send();
   });
});


app.get('/todos',(req,res)=>{
   Todo.find().then((todos)=>{
       res.send(todos);
   },(e)=>{
       res.status(400).send(e);
   });
});


app.get('/todos/:id',(req,res)=>{
   var id = req.params.id;
   if(!ObjectID.isValid(id)){
      return res.status(404).send();
   }
   Todo.findById(id).then((todo)=>{
       if(!todo){
          return res.status(404).send();
       }
       res.send({todo});
   }).catch((e)=>{
       res.status(400).send();
   });



});
app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });

});

app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
});



app.listen(3000,()=>{
    console.log('Started on port 3000');
});

