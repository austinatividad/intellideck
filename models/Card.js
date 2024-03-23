const mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
    question: String,
    answer: String,
});

module.exports = mongoose.model('Card', CardSchema);