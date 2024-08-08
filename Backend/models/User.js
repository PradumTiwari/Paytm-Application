const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        notnull: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,  // Make sure required is not accidentally set here
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,  // Make sure required is not accidentally set here
        trim: true,
        maxLength: 50
    }
});


const User=mongoose.model('User',userSchema);


module.exports=User;