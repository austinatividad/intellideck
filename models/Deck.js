const mongoose = require('mongoose');

var DeckSchema = new mongoose.Schema({
    name: String,
    description: String,
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card', default : []}],
    tags: [String],
    created_at: { type: Date, default: Date.now },
    is_deleted: { type: Boolean, default: false },
    ai_prompt: { type: String, required: false}
})

module.exports = mongoose.model('Deck', DeckSchema);