<template>
  <Header />
  <DeckList />
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
</style>
<script>
// @ is an alias to /src
import DeckList from "@/components/DeckList.vue";
import Header from "@/components/Header.vue";
export default {
  name: "MainPage",
  components: { DeckList, Header },
  props: {
    message: String,
  },
  mounted() {
    console.log(this.message);
  },
};
</script>
