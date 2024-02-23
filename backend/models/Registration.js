const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    event: {
        type: String, 
        required:true,
    },
    eventID: {
        type: String, 
        required:true,
    },
    userID: {
        type: String, 
        required:true,
    },
    date: {
        type: String, 
        required:true,
    },

});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration; 