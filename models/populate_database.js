const mongoose = require('mongoose');
const Deck = require('./Deck');
const Card = require('./Card');
const express = require('express');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/intellideck', { useUnifiedTopology: true });
//remove all data from the database
Deck.deleteMany({});

Card.deleteMany({});

const populate_database = async () => {
    // Create a deck
    const deck = new Deck({
        name: 'Test Deck',
        description: 'A deck for testing',
        tags: ['test', 'example'],
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
        name: 'Test Deck 2',
        description: 'A deck for testing the word length limit so that this thing will definitely get truncated after a while please do please it should work right??? lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
        tags: ['test', 'example', 'joe biden', 'rawr xd uwu meow nya, neko uwu chan'],
    });

    // Save the deck
    await deck2.save();
    
}


populate_database();