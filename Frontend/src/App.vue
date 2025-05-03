<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
}

nav {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

h1 {
  margin: 0;
}

.nav-links {
  margin-top: 0.5rem;
}

.nav-links a {
  margin: 0 1rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links a.router-link-exact-active {
  text-decoration: underline;
}
</style>