const mongoose = require('mongoose');
 
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: {
        A: { text: String, category: String },
        B: { text: String, category: String },
        C: { text: String, category: String },
        D: { text: String, category: String }
    } 
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
  