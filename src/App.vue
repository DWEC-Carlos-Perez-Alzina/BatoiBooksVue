<script>
import { useStorage } from './stores/storage.js'
import batoiLogo from "/logoBatoi.png"
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BooksList from './components/BooksLists.vue'
import AddBook from './components/AddBook.vue'
import AboutView from "./views/AboutView.vue"
import AppCart from './components/AppCart.vue'
import { mapActions } from 'pinia'

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
  methods: {
    ...mapActions(useStorage, ['populate']),
  },
  created() {
    this.populate()
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
  <router-view></router-view>
  <footer>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos doloremque dolores!
  </footer>
</div>
</template>

<style scoped>
/* Layout */
header {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
  top: 0;
}

header img {
  width: 50px;
  vertical-align: middle;
}

header h1 {
  display: inline;
  font-size: 36px;
  margin-left: 10px;
}

header h3 {
  font-size: 20px;
  margin-top: 5px;
}
</style>