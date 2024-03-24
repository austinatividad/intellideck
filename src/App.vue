<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-size: 40px 40px;
  background-image: linear-gradient(
      to right,
      transparent,
      grey 1px,
      transparent 1px,
      transparent
    ),
    linear-gradient(
      to bottom,
      transparent,
      grey 1px,
      transparent 1px,
      transparent
    );
  margin: 0;
  animation: parallax 100s infinite linear;
}

@keyframes parallax {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 20% 100%;
  }
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script></script>
