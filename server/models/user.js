var mongoose = require('mongoose');


var User=mongoose.model('Users_email',{

    email: {
        type: String,
        minLength: 1,
        trim: true,
        required: true
    }
});

module.exports={User};