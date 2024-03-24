<template>
  <Header />
  <div class="create_page">
    <div class="creation_type_buttons">
      <button class="ai_button" @click="setCreationType('ai')">
        <h1><span class="green"> Intelligent</span> Flashcards</h1>
        <p>
          Let AI create flashcards from your text, notes, or website contents.
        </p>
      </button>
      <button class="manual_button" @click="setCreationType('manual')">
        <h1><span class="red">Manual</span> Flashcards</h1>
        <p>Create flashcards manually by entering the terms and definitions.</p>
      </button>
    </div>

    <div v-if="creationType == 'manual'">
      <h1>This feature is not implemented yet, sorry! 🙏</h1>
      <p><a href="/">click me to go back to the main page...</a></p>
    </div>
    <div v-if="creationType == 'ai'">
      <CreateDeckAI />
    </div>
  </div>
</template>

<style scoped>
.create_page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}

.creation_type_buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  margin: 1rem 0;
}

button {
  padding: 1rem;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 60%;
  margin: 5px 30px;
  color: #000;
}
.green {
  color: #19c883;
}
.red {
  color: #ff4d4d;
}

/*
button hover animations
*/

button:hover {
  background-color: #19c883;
  color: #fff;
  background: linear-gradient(
    to left,
    #19c883 0%,
    #19c883 50%,
    #ffffff 50%,
    #ffffff 100%
  );
  background-size: 200% 100%;
  background-position: right;
  transform: scale(1.02);
  transition: transform 0.3s, background-position 0.2s;
}

button:hover .green,
button:hover .red {
  color: #fff;
}
</style>

<script>
import CreateDeckAI from "@/components/CreateDeckAI.vue";
import Header from "@/components/Header.vue";

export default {
  name: "CreateView",
  data() {
    return {
      creationType: "",
    };
  },
  methods: {
    setCreationType(type) {
      this.creationType = type;
      //hide the div creation_type_buttons
      document.querySelector(".creation_type_buttons").style.display = "none";
    },
  },
  components: {
    CreateDeckAI,
    Header,
  },
};
</script>
