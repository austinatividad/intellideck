const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Deck = require("./models/Deck");
const Card = require("./models/Card");
const fetch = require("node-fetch");
const app = express();

//db setup
mongoose.connect("mongodb://localhost:27017/intellideck");
console.log("Connected to MongoDB");
// Routes
const PORT = 9090;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes:

app.get("/api/get_decks", async (req, res) => {
  const decks = await Deck.find({})
    .sort({ created_at: -1 })
    .populate("cards")
    .exec();
  res.json(decks);
});

app.get("/api/get_deck", async (req, res) => {
  const deck = await Deck.findById(req.query.deck_id).populate("cards").exec();
  res.json(deck);
});

app.get("/api/add_card/", async (req, res) => {
  console.log("DECK ID: " + req.query._id);

  const deck = await Deck.findById(req.query._id);
  const card = new Card({
    definition: req.query.definition,
    term: req.query.term,
  });
  await card.save();
  deck.cards.push(card);
  await deck.save();
  console.log("Card added to deck");
  res.json({ message: "Card added to deck" });
});

app.get("/api/add_deck/", async (req, res) => {
  const deck = new Deck({
    name: req.query.name,
    description: req.query.description,
    tags: req.query.tags,
    ai_prompt: req.query.ai_prompt,
  });
  await deck.save();
  console.log(deck._id);
  console.log("Deck created successfully");
  res.json(deck._id);
});

//helper function for generating flashcards

app.get("/api/generate_cards", async (req, res) => {
  const text_input = req.query.text;
  console.log(text_input);

  const request = {
    messages: ` You are a flashcard generator. Do not explain. Do not include the term in the definition. Add 5 newlines at the end of your response. Your task is to create a LIST containing 12 JSON objects that follow the following format: { "definition": "insert definition here", "term": "insert term here" } You are tasked to create flashcards based on User: ${text_input} `,
  };

  const url = "http://localhost:8766/v1/chat/completions";

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const data = await result.json();

  const flashcards = data.choices[0].message.content;

  try {
    //parse the list of json objects
    const final = JSON.parse(flashcards);
    res.json(final);
  } catch (e) {
    console.log("Error parsing JSON");
    res.json({ error: "Error parsing JSON" });
  }

  console.log(flashcards);
});
