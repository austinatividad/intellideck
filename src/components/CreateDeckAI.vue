<template>
  <div v-if="loading" class="blur_page">
    <div class="load_contents">
      <div
        class="loader_text green"
        style="z-index: 999; font-size: 1.5rem; margin-bottom: 0.5rem"
      >
        Now Cooking...
      </div>
      <div class="loader">
        <div class="loaderBar"></div>
      </div>
    </div>
  </div>
  <div class="ai_form">
    <div class="ai_form_header">
      <h1>
        <span class="green">Intelligent</span> Flashcards
        <span style="color: #19c883">✦</span>
      </h1>
      <p>
        Let AI create the flashcards for you, based on your provided input.<br />
        You can provide your own notes, or paste content from the internet.<br /><br />
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
      <h3>
        <span class="green">Step 3:</span> Tags
        <span class="green" style="font-size: smaller">(Experimental!)</span>
      </h3>
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
      <p>
        <span class="green" style="margin-bottom: 1rem; font-weight: bold"
          >Important Notice: </span
        ><br />
        IntelliDeck may generate
        <span class="red">inaccurate / nonfactual information</span>.<br />
        Please verify the legitimacy of the generated flashcards before using
        them.
      </p>

      <div class="button_holder">
        <button class="cancel" @click="cancelDeck()">Cancel</button>
        <button
          class="ai_button"
          @click="
            loadingSpinner();
            constructDeck();
            generateCards();
          "
        >
          Create Deck
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.load_contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.loader {
  width: 500px;
  margin: 0 auto;
  border-radius: 10px;
  border: 4px solid transparent;
  position: relative;
  padding: 1px;
}
.loader:before {
  content: "";
  border: 1px solid #19c883;
  border-radius: 10px;
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
}
.loader .loaderBar {
  position: absolute;
  border-radius: 10px;
  top: 0;
  right: 100%;
  bottom: 0;
  left: 0;
  background: #19c883;
  width: 0;
  animation: borealisBar 2s linear infinite;
}

@keyframes borealisBar {
  0% {
    left: 0%;
    right: 100%;
    width: 0%;
  }
  10% {
    left: 0%;
    right: 75%;
    width: 25%;
  }
  90% {
    right: 0%;
    left: 75%;
    width: 25%;
  }
  100% {
    left: 100%;
    right: 0%;
    width: 0%;
  }
}

.blur_page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 100;
  display: none;

  /* Center the content */
  display: flex;
  justify-content: center;
  align-items: center;

  /*gaussian blur*/
  backdrop-filter: blur(5px);
}
.green {
  color: #19c883;
}

.ai_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vh;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #fefefe;
}

.ai_form_header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.red {
  color: #cc564d;
}

.ai_form_input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
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
  max-width: 98%;
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
      loading: false,
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
    loadingSpinner() {
      // Add loading spinner
      console.log("Loading spinner...");
      //set loading = true
      this.loading = true;
    },
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
      //check if title and text is empty
      if (this.deck_title === "" || this.text_input === "") {
        alert("Please fill out the title and text input fields.");
        this.loading = false;
        return;
      }
      // Call axios to send request to the backend
      // to generate the cards
      axios
        .get("http://localhost:9090/api/generate_cards", {
          params: {
            text: this.deck.text,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.cards = response.data;
          if (this.cards.length < 2) {
            alert("No cards were generated. Please try again.");
            return;
          }
          //  TODO: only uncomment each axios call if the previous one is successful
          //  card generation successful, now add the deck to the database
          axios
            .get("http://localhost:9090/api/add_deck", {
              params: {
                name: this.deck.title,
                description: this.deck.description,
                tags: this.deck.tags,
                ai_prompt: this.deck.text,
              },
            })
            .then((response) => {
              console.log(response.data);
              const deck_id = response.data;

              //add the cards to the deck
              console.log(this.cards);
              for (let i = 0; i < this.cards.length; i++) {
                axios
                  .get("http://localhost:9090/api/add_card", {
                    params: {
                      _id: deck_id,
                      definition: this.cards[i].definition,
                      term: this.cards[i].term,
                    },
                  })
                  .then((response) => {
                    console.log(response);
                    if (response.message == "Error finding deck") {
                      alert("Error finding deck");
                      return;
                    }
                  });
              }
              //redirect to home
              this.$router.push({
                name: "home",
              });
            });
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
