<template>
  <div id="app">
    <nav>
      <h1>Gestión de Usuarios</h1>
    </nav>
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
</style>