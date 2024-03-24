<template>
  <div class="card_definition">
    {{ card.definition }}
  </div>
  <div class="card_term">{{ card.term }}</div>
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
</style>

<script>
export default {
  name: "Card_view",
  props: {
    card: Object,
  },
};
</script>
