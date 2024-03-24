const mongoose = require('mongoose');
const Deck = require('./Deck');
const Card = require('./Card');
const express = require('express');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/intellideck', { useUnifiedTopology: true });
//remove all data from the database
Deck.deleteMany({}).then(() => {
    console.log('Deleted all decks');
});


const populate_database = async () => {
    // Create a deck
    const deck = new Deck({
        name: 'Machine Learning Concepts',
        description: 'An example deck containing machine learning concepts',
        tags: ['machine learning', 'ai', 'neural networks', 'data science'],
    });

    // Save the deck
    await deck.save();

    // Create a card
    const card = new Card({
        question: 'What is the capital of France?',
        answer: 'Paris',
    });

    // Save the card
    await card.save();

    // Add the card to the deck
    deck.cards.push(card);

    // Save the deck again
    await deck.save();

    // Log the deck
    console.log(deck);


    // test /api/add_card
    const deck2 = new Deck({
        name: 'Countries in Asia',
        description: 'An example deck containing countries in Asia',
        tags: ['asia', 'countries', 'geography'],
    });

    // Save the deck
    await deck2.save();
    
}


populate_database();