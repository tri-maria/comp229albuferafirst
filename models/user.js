//require modules for user models

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            required: 'username is required'
        },
        password:
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },
        email:
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        displayName: {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
        },
        created:
        {
            type: Date,
            default: Date.now

        },
        update:
        {
            type: Date,
            default: Date.now

        },
    },
    {
        collection: "users"
    }
);
//configure options for user model
let options = ({ missingPasswordError: 'Wrong / Missing Password' });

User.plugin(passportLocalMongoose, options);

User.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports.user = mongoose.model('User', User);
