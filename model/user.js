const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, 
    },
    uniqueid: {
        type: String,
        required: true, 
        unique: true,
    },
    options: {
        type: [{ questionIndex: Number, answer: String }], // Change from [String] to an array of objects
        required: true, 
    },
    // Strengths: {
    //     type: [String],
    //     default: [], // Default to an empty array
    // },  
    // Weaknesses: {
    //     type: [String],
    //     default: [], // Default to an empty array
    // },
    // Improvements: {
    //     type: [String],
    //     default: [], // Default to an empty array
    // },
    // CareerSuggestions: {
    //     type: [String],
    //     default: [], // Default to an empty array
    // },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
