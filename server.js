const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Deck = require("./models/Deck");
const Card = require("./models/Card");
const LLMController = require("./controllers/LLMController");
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

app.get("/api/get_collection/:_id", async (req, res) => {
  const deck = await Deck.findById(req.params._id).populate("cards").exec();
  res.json(deck);
});

app.get("/api/add_card/", async (req, res) => {
  const deck = await Deck.findById(req.params.deck_id);
  const card = new Card({
    question: req.params.question,
    answer: req.params.answer,
  });
  await card.save();
  deck.cards.push(card);
  await deck.save();
  res.json(deck);
});

app.get("/api/add_deck/", async (req, res) => {
  const deck = new Deck({
    name: req.query.name,
    description: req.query.description,
    tags: req.query.tags,
    ai_prompt: req.query.ai_prompt,
  });
  await deck.save();
  res.json(deck);
});

app.get("/api/generate_cards", LLMController.llm_get_decks);
