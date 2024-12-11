<script>
import { store } from './storage.js' 
import batoiLogo from "/logoBatoi.png"
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BooksList from './components/BooksLists.vue'
import AddBook from './components/AddBook.vue'
import AboutView from "./views/AboutView.vue"
import AppCart from './components/AppCart.vue'

export default {
  components: {
    AppMenu,
    AppMessages,
    BooksList,
    AddBook,
    AboutView,
    AppCart
  },
  data() {
    return {
      batoiLogo
    }
  },
  created() {
    store.populate();
  }
}
</script>

<template>
<header>
  <img :src=batoiLogo alt="Logo Batoi"/>
  <h1>BatoiBooks</h1>
  <h3>Control de libros</h3>
</header>
<app-menu></app-menu>
<div>
  <app-messages></app-messages>
  <books-list></books-list>
  <add-book></add-book>
  <about-view></about-view>
  <app-cart></app-cart>
  <footer>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos doloremque dolores!
  </footer>
</div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>