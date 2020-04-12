const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    lastCnx : {
        type : Date,
        default : new Date()
    },
    status: {
        type: String,
        enum: ['enabled', 'disabled', 'deleted'],
        default: 'enabled'
    }
}, { 
    timestamps: true 
});

// userSchema.plugin(uniqueValidator);

const User= mongoose.model('user', userSchema);

module.exports = User;