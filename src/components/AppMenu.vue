<script>export default {}</script>

<template>
<nav>
  <ul>
    <li><router-link to="/list">Ver libros</router-link></li>
    <li><router-link to="/form">Añadir Libro</router-link></li>
    <li><router-link to="/cart">Ver carrito</router-link></li>
    <li><router-link to="/about">About</router-link></li>
  </ul>
</nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #444;
  color: white;
  padding-top: 60px;
  z-index: 1000;
}

nav ul {
  list-style-type: none;
}

nav ul li {
  margin: 20px 0;
}

nav ul li a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px;
}

nav ul li a:hover {
  background-color: #555;
}
</style>