<template>
  <Header />
  <div class="deck_info">
    <div class="deck">
      <div class="deck_preview">
        <img src="../assets/deck.png" alt="flashcard" />
        <div class="deck_actions">
          <h4>Highest Streak: {{ deck.practice_highscore }}</h4>
          <button class="Practice" @click="start_practice">Practice</button>
        </div>
      </div>
      <div class="deck_content">
        <div class="deck_information">
          <div class="deck_title">
            <h2>
              {{ deck.name }}
              <span v-if="deck.ai_prompt" class="ai_generated_symbol">✦</span>
            </h2>
          </div>
          <div class="deck_description">
            <p>
              {{ deck.description }}
            </p>
          </div>
          <div class="deck_tags">
            <span v-for="(tag, index) in deck.tags" :key="index" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="cards_display">
    <div class="cards_container">
      <div class="my_cards_container">
        <h1 class="my_cards">Flashcards</h1>
      </div>
      <div class="cards_section">
        <div v-for="(card, index) in deck.cards" :key="index" class="card">
          <Card :card="card" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card_term {
  font-size: 2rem;
  font-weight: bold;
  color: #19c883;
}
.card {
  display: flex;
  flex-direction: column;
  min-height: 200px;
  min-width: 130px;
  width: 20%;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fefefe;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
  margin: 1rem 1rem;
}
.cards_section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
}
.cards_display {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 490px;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.cards_container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fefefe;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
}
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
  width: 80%;
  margin: 0rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fefefe;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
}

.deck_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0rem;
  min-width: 490px;
}
.new_deck {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
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
  flex-direction: column;
  align-items: center;
}
.deck_content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  background-color: #19c883;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  width: 12vh;
}

.deck_tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: left;
  min-width: 50%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tag {
  padding: 0rem 0.5rem;
  margin-right: 0.3rem;
  break-after: avoid;
  border-radius: 5px;
  background-color: #ccc;
  min-width: 5%;
  margin-bottom: 0.2rem;
}

.tag_text {
  color: white;
  padding: 0rem 0.3rem;
}
.Practice:hover {
  background-color: #13a068;
}

.green {
  background-color: #19c883;
}
/*
hover transformations
*/

.ai_generated_symbol {
  color: #19c883 !important;
}
</style>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
export default {
  name: "DeckView",
  data() {
    return {
      deck: {},
    };
  },
  components: {
    Header,
    Card,
  },
  methods: {
    start_practice() {
      this.$router.push({
        name: "practice",
        params: {
          _id: this.deck._id,
        },
      });
    },
  },
  mounted() {
    console.log("DeckView mounted");
    //obtaining the deck id from the url
    const deck_id = this.$route.params._id;
    console.log(deck_id);

    //fetching the deck from the backend
    axios
      .get(`http://localhost:9090/api/get_deck/`, {
        params: {
          deck_id: deck_id,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.deck = response.data;
        console.log("Successfully fetched deck");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
