<template>
  <div class="ai_form">
    <div class="ai_form_header">
      <h1><span class="green">Intelligent</span> Flashcards</h1>
      <p>
        Let AI create the flashcards for you, based on your provided text.<br />
        You can use your notes, website contents, or other forms of text.
      </p>
    </div>
    <div class="ai_form_input">
      <h3><span class="green">Step 1:</span> Deck Title</h3>
      <input
        type="text"
        v-model="deck_title"
        placeholder="Enter your deck title here..."
        required
      />
      <h3><span class="green">Step 2:</span> Description</h3>
      <textarea
        v-model="deck_description"
        placeholder="Enter your deck description here..."
        rows="5"
        cols="50"
        required
      ></textarea>
      <h3><span class="green">Step 3:</span> Tags</h3>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        @tags-changed="(newTags) => (tags = newTags)"
      />
      <h3><span class="green">Final Step:</span> Text Input</h3>
      <textarea
        v-model="text_input"
        placeholder="Enter your text here..."
        rows="10"
        cols="50"
        required
      ></textarea
      ><br />
      <div class="button_holder">
        <button class="cancel" @click="cancelDeck()">Cancel</button>
        <button class="ai_button" @click="constructDeck()">Create Deck</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.green {
  color: #19c883;
}

.ai_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}

.ai_form_header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ai_form_input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
}

input {
  width: 93%;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  width: 93%;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 1rem;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #19c883;
  border-radius: 5px;
  cursor: pointer;
  width: 40%;
  margin: 5px 20px;
  color: #fff;
}

button:hover {
  background-color: #17a77f;
}

textarea {
  resize: none;
  font-family: "Avenir", sans-serif;
}

.vue-tags-input {
  width: 100%;
  max-width: 100%;
  border-radius: 5px;
  font-family: "Avenir", sans-serif;
}

.cancel {
  background-color: #cc564d;
}

.cancel:hover {
  background-color: #b84a42;
}

.button_holder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>

<script>
import VueTagsInput from "@sipec/vue3-tags-input";
import axios from "axios";
export default {
  name: "CreateDeckAI",
  data() {
    return {
      creationType: "",
      deck_title: "",
      deck_descripion: "",
      tag: "",
      tags: [],
      newTags: [],
      text_input: "",
      cards: [],
      deck: {},
    };
  },
  methods: {
    constructDeck() {
      this.deck = {
        title: this.deck_title,
        description: this.deck_description,
        tags: this.simplifyTags(),
        text: this.text_input,
      };
      console.log(this.deck);
    },
    generateCards() {
      // Call axios to send request to the backend
      // to generate the cards
      axios
        .get("http://localhost:9090/generate_cards", {
          params: {
            text: this.text_input,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.cards = response.data;
          //  TODO: only uncomment each axios call if the previous one is successful
          //  card generation successful, now add the deck to the database
          //   axios
          //     .post("http://localhost:9090/add_deck", {
          //       name: this.deck.title,
          //       description: this.deck.description,
          //       tags: this.deck.tags,
          //     })
          //     .then((response) => {
          //       console.log(response.data);
          //       const db_deck = response.data;
          //       for (let i = 0; i < this.cards.length; i++) {
          //         axios
          //           .post("http://localhost:9090/add_card", {
          //             deck_id: db_deck._id,
          //             question: this.cards[i].question,
          //             answer: this.cards[i].answer,
          //           })
          //           .then((response) => {
          //             console.log(response.data);
          //           });
          //       }
          //     });
        });
    },
    simplifyTags() {
      // Simplify the tags, tags[x].text -> tags[x] as a string
      let newTags = [];
      for (let i = 0; i < this.tags.length; i++) {
        newTags.push(this.tags[i].text);
      }
      return newTags;
    },
    cancelDeck() {
      this.$router.push({ name: "home" });
    },
  },
  components: {
    VueTagsInput,
  },
};
</script>
