const mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
    definition: String,
    term: String,
});

module.exports = mongoose.model('Card', CardSchema);