<template>
  <div class="deck_info">
    <div class="deck">
      <div class="deck_preview">
        <img src="../assets/deck.png" alt="flashcard" />
        <div class="deck_actions">
          <h5>Highest Streak: {{ deck.practice_highscore }}</h5>
          <h4>Score: {{ this.score }}</h4>
        </div>
      </div>
      <div class="deck_content">
        <div class="deck_information">
          <div class="deck_title">
            <h3
              @click="backToDeck"
              style="text-decoration: underline; color: #afafaf"
            >
              Back to Decks
            </h3>
            <h2>
              {{ deck.name }}
              <span v-if="deck.ai_prompt" class="ai_generated_symbol green"
                >✦</span
              >
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
  <div class="button_container" id="start">
    <button @click="assembleQuestion" class="start_button">
      <h1>Start Practicing</h1>
      <p>3 cards will be shown at a time. Guess which one is correct!</p>
    </button>
  </div>

  <div class="cards_display">
    <div class="cards_container">
      <div class="cards_section">
        <div
          v-for="(card, index) in this.currentCards"
          :key="index"
          class="card"
          @click="chooseCard(card)"
          :class="{
            green_border: card.color === 'green',
            red_border: card.color === 'red',
          }"
        >
          <PlayCard :card="card" />
        </div>
      </div>
      <div class="button_container" v-if="selected">
        <button @click="assembleQuestion" class="start_button">
          <h2>Next Question</h2>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards_section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
}

.start_button {
  padding: 1rem;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  min-width: 50%;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 82%;
  padding: 1rem;
  margin: 5px 30px;
  color: #000;
}

.button_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20vh;
  margin-top: 1rem;
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

.green_border {
  border: 2px solid #19c883;
}

.red_border {
  border: 2px solid #ff4d4d;
}

.start_button:hover {
  background-color: #19c883;
  color: #fff;
}

/**animation scale during hover*/
.start_button:hover {
  transform: scale(1.05);

  transition: transform 0.3s;
}

.start_button:hover .green {
  color: #fff;
}

.deck {
  display: flex;
  flex-direction: row;
  width: 79.6%;
  margin: 0rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fefefe;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
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

.deck_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 0rem;
  min-width: 490px;
}

.deck_information {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
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

.card:hover {
  transform: translateY(-10px);
  transition: transform 0.3s;
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
.tag_text {
  color: white;
  padding: 0rem 0.3rem;
}

.deck_title {
  margin-bottom: 0.5rem;
  text-align: left;
}
.deck_description {
  margin-bottom: 0.5rem;
  text-align: left;
}

.green {
  color: #19c883;
}
</style>
<script>
import axios from "axios";
import PlayCard from "@/components/PlayCard.vue";
export default {
  name: "PracticeView",
  data() {
    return {
      highscore: 0,
      score: 0,
      deck: [], //contains the deck of cards based on the deck selected
      currentCards: [], //contains the current cards being displayed on the screen (1 is correct, 2 is wrong)
      selected: false, //if the user has selected an answer; used to trigger new card behavior to be able to see which card was correct
      correctCard: {}, //the correct card that the user needs to select
      reveal: false, //if the user has selected the correct card, then reveal the correct card
    };
  },
  components: {
    PlayCard,
  },
  methods: {
    backToDeck() {
      this.$router.push({ name: "deck", params: { _id: this.deck._id } });
    },
    async getDeck() {
      //use the params to get the deck id
      const deck_id = this.$route.params._id;
      //console.log(deck_id);
      //fetch the deck from the backend
      axios
        .get(`http://localhost:9090/api/get_deck/`, {
          params: {
            deck_id: deck_id,
          },
        })
        .then((response) => {
          //console.log(response.data);
          this.deck = response.data;
        });
    },
    revealColors() {
      //if this.reveal is true, then reveal the colors for each card where green == correct and red == wrong
      if (this.reveal) {
        this.currentCards.forEach((card) => {
          //if the card is correct, add a green border, change the css
          if (card.correct) {
            //change css properties of card
            card.color = "green";
          } else {
            card.color = "red";
          }

          console.log(card);
        });
      }
    },
    displayDeck() {
      //display the deck of cards
      //console.log(this.deck);
    },
    chooseCard(card) {
      //if the user has selected a card, then do not allow them to select another card
      if (this.selected) {
        return;
      }
      //set the selected attribute to true
      this.selected = true;
      //if the user selects the correct card
      if (card.correct) {
        this.score += 1;
        this.updateHighscore();
        console.log("Correct");
      } else {
        this.score = 0;
        console.log("Incorrect");
      }
      //reveal the correct card
      this.reveal = true;
      this.revealColors();
    },
    getCorrectCard() {
      //get a random card from the deck
      const randomIndex = Math.floor(Math.random() * this.deck.cards.length);

      //add the correct attribute to the card
      this.deck.cards[randomIndex].correct = true;

      //add to the current cards array
      this.currentCards.push(this.deck.cards[randomIndex]);

      // store the correct card in a variable
      this.correctCard = this.deck.cards[randomIndex];
    },

    getIncorrectCards(correctCard) {
      let shuffledDeck = this.deck.cards;
      let new_shuffledDeck = [];
      //remove the correct card from the deck
      for (let i = 0; i < shuffledDeck.length; i++) {
        if (shuffledDeck[i] === correctCard) {
          shuffledDeck.splice(i, 1);
        }
      }

      //pick 2 cards, then change the term to be incorrect
      for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * shuffledDeck.length);
        shuffledDeck[randomIndex].correct = false;
        //select a random card from the deck to change the term
        let rand = Math.floor(Math.random() * shuffledDeck.length);
        while (rand === randomIndex) {
          rand = Math.floor(Math.random() * shuffledDeck.length);
        }
        shuffledDeck[randomIndex].term = shuffledDeck[rand].term;

        new_shuffledDeck.push(shuffledDeck[randomIndex]);
      }
      this.currentCards.push(...new_shuffledDeck);
    },

    async assembleQuestion() {
      //console.log(this.deck);
      //clear the current cards array
      this.currentCards = [];
      //get the correct card
      await this.getCorrectCard();
      //get the incorrect cards
      this.getIncorrectCards(this.correctCard);

      //shuffle the current cards array
      this.currentCards = this.currentCards.sort(() => Math.random() - 0.5);

      //console.log(this.currentCards);

      this.getDeck();

      //if start button is clicked, hide it
      document.getElementById("start").style.display = "none";
      this.reveal = false;
      this.selected = false;
    },

    nextCard() {
      //if the user has not selected a card, return
      if (!this.selected) {
        return;
      }

      //if the user has selected a card, assemble a new question
      this.assembleQuestion();
      //set selected to false
      this.selected = false;
    },

    updateHighscore() {
      //if the current score is greater than the highscore, update the highscore
      if (this.score > this.highscore) {
        this.highscore = this.score;
        //call api to update the highscore
        axios
          .get(`http://localhost:9090/api/update_highscore/`, {
            params: {
              _id: this.deck._id,
              highscore: this.highscore,
            },
          })
          .then((response) => {
            console.log(response.data);
          });
      }
    },
  },

  async mounted() {
    //console.log("PracticeView mounted");
    this.getDeck();

    //print the current cards
    //console.log(this.currentCards);
  },
};
</script>
