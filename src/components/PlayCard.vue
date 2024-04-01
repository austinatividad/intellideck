<template>
  <div class="card_definition">
    {{ card.definition }}
  </div>
  <div class="card_term">{{ card.term }}</div>
</template>

<style scoped>
.card_term {
  font-size: 2.5vh;
  font-weight: bold;
  color: #19c883;
}
</style>

<script>
export default {
  name: "PlayCard_view",
  props: {
    card: Object,
  },
};
</script>
