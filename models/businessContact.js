let mongoose = require('mongoose');

//create a model class
let businessContactModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
    {
        collection: "businessContact"
    });

module.exports = mongoose.model('businessContact', businessContactModel);