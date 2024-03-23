<template>
  <div class="deck" @click="openDeck()">
    <div class="deck_preview">
      <img src="../assets/deck.png" alt="flashcard" />
    </div>
    <div class="deck_content">
      <div class="deck_information">
        <div class="deck_title">
          <h2>{{ deck.name }}</h2>
        </div>
        <div class="deck_description">
          <p>
            {{ truncateParagraph(deck.description, 500) }}
          </p>
        </div>
        <div class="deck_tags">
          <span v-for="(tag, index) in deck.tags" :key="index" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="deck_actions">
        <img src="../assets/arrow.png" class="open_deck" alt="arrow" />
      </div>
    </div>
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
  width: 80%;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #fefefe;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
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
  flex-direction: row;
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
  color: white;
  cursor: pointer;
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

.deck:hover::after,
.new_deck:hover::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
}

.new_deck:hover {
  transform: scale(1.02);
  transition: transform 0.2s;
}
</style>

<script>
export default {
  name: "Deck_instance",
  props: {
    deck: Object,
  },
  methods: {
    openDeck() {
      this.$router.push({ name: "deck", params: { _id: this.deck._id } });
    },
    truncateParagraph(paragraph, maxLength) {
      if (paragraph.length > maxLength) {
        return paragraph.substring(0, maxLength) + "...";
      } else {
        return paragraph;
      }
    },
  },
};
</script>
