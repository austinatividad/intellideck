<template>
  <div class="main-page">
    <div class="main-page_header">
      <h1>
        Intelli<span
          style="color: #19c883; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)"
          >Deck</span
        >
      </h1>
      <p class="main-page_description">
        a platform that integrates <span class="green">AI</span> to help you
        memorize concepts and terminologies through
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
  justify-content: center;
  width: 100%;
  height: 20rem;
  background-color: #f5f5f5;
}
h1 {
  font-size: 3rem;
  color: #2c3e50;
}
.main-page_description {
  font-size: 1.5rem;
  color: #2c3e50;
  text-align: center;
  margin-top: 1rem;
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
