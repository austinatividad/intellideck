<template>
  <div class="main-page">
    <div class="main-page_header">
      <h1>
        Intelli<span
          style="color: #19c883; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3)"
          >Deck</span
        >
      </h1>
      <p class="main-page_description">
        a platform that integrates
        <span class="green">Large Langauge Models</span> to assist you in
        memorizing concepts and terminologies through
        <span class="green">flashcards</span>
      </p>
      <!--insert deck list here-->
    </div>
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #ffffff;
}
.main-page_header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  width: 100%;
  height: 16rem;
  background-color: #f5f5f5;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
}
h1 {
  font-size: 10vh;
  color: #2c3e50;
  margin-bottom: 0vh;
  margin-top: 1vh;
}
.main-page_description {
  font-size: 1.5rem;
  color: #2c3e50;
  text-align: center;
  margin-top: 0vh;
  margin-left: 1rem;
  margin-right: 1rem;
}
.green {
  color: #19c883;
}
</style>

<script>
export default {
  name: "HeaderPage",
};
</script>
