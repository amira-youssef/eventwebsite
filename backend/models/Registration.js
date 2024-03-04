const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    
    eventID: {
        type: String, 
        required:true,
    },
    userID: {
        type: String, 
        required:true,
    },
   
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration; 