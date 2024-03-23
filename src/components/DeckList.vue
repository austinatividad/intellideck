<template>
  <div class="deck-list">
    <div class="message" v-if="message">
      <p>{{ message }}</p>
    </div>
    <div class="new_deck" @click="createDeck()">
      <div class="new_deck_header">
        <h2>New <span class="deck_span">Deck</span></h2>
      </div>
      <div class="deck_actions">
        <img src="../assets/arrow.png" class="open_deck" alt="arrow" />
      </div>
    </div>
    <Deck v-for="(deck, index) in decks" :key="index" :deck="deck" />
  </div>
</template>

<style scoped>
.deck-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}
.deck {
  display: flex;
  flex-direction: row;
  width: 40%;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fefefe;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  min-width: 500px;
}

.new_deck {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fefefe;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.new_deck_header {
  margin-right: 2vh;
}
.deck_information {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
}

.deck_title {
  margin-bottom: 0.5rem;
  text-align: left;
}
.deck_description {
  margin-bottom: 0.5rem;
  text-align: left;
}

.deck_preivew {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 1rem;
}
img {
  width: 20vh;
  height: 20vh;
  object-fit: fill;
}
.deck_actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.open_deck {
  width: 50px;
  height: 50px;
  object-fit: fill;
  pointer-events: none;
}
button {
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.green {
  background-color: #19c883;
}
/*
hover transformations
*/

.deck:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}

.deck:hover::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
}

.deck_span {
  color: #19c883; /* Initial color of "Deck" */
  transition: color 0.3s; /* Smooth transition for color change */
}

.new_deck:hover {
  background: linear-gradient(
    to left,
    #19c883 0%,
    #19c883 50%,
    #ffffff 50%,
    #ffffff 100%
  );
  background-size: 200% 100%; /* Increase the size of the gradient */
  background-position: right; /* Start the gradient from the right */
  transform: scale(1.02);
  transition: transform 0.3s, background-position 0.2s; /* Transition for background and transform */
}

.new_deck:hover .deck_span {
  color: #ffffff; /* Change color to white on hover */
}
</style>
<script>
import Deck from "./Deck.vue";
import axios from "axios";
export default {
  name: "DeckList",
  data: function () {
    return {
      decks: [],
    };
  },
  components: { Deck },
  methods: {
    createDeck() {
      this.$router.push("/create");
    },
    getDecks() {
      axios
        .get("http://localhost:9090/api/get_decks")
        .then((response) => {
          this.decks = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getDecks();
  },
};
</script>
