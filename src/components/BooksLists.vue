<script>
import { mapActions } from "pinia";
import { store } from "../storage.js";
import { useStorage } from '../stores/storage.js'
import BookItem from "./BookItem.vue";

export default {
  components: { BookItem },
  data() {
    return {
      books: [],
    };
  },
  async created() {
    this.books = await this.getDBBooks();
  },
  methods: {
    deleteBook(bookId) {
      if (!confirm(`Seguro que quieres borrar el libro ${bookId}?`)) {
        return;
      }
      try {
        this.deleteBookST(bookId);
        this.books.splice(this.books.findIndex(book => book.id === bookId), 1);
      } catch (error) {
        this.addMessage("Error al borrar el libro:", error);
      }
    },
    addToCart(bookId) {
      const book = this.books.find((b) => b.id === bookId);
      if (!book) {
        this.addMessage(`No se encontró el libro con ID ${bookId}`, "error");
        return;
      }
      if (!confirm(`Seguro que quieres agregar el libro ${bookId} al carrito?`)) {
        return;
      }
      this.addToCartST(book);
    },
    goToEditBook(bookId) {
      this.$router.push('/edit/' + bookId);
    },
    ...mapActions(useStorage, ['getDBBooks', 'deleteBookST', 'addToCartST', 'estaEnElCarro']),
  },
};
</script>

<template>
  <h1>Hay un total de {{ books.length }} libro/s</h1>
  <div id="list">
    <div class="card" v-for="book in books" :key="book.id">
      <book-item :book="book">
        <button class="addtocart" @click="addToCart(book.id)" :disabled="estaEnElCarro(book.id)" :style="{ opacity: estaEnElCarro(book.id) ? 0.5 : 1 }">
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="removebutton" @click="deleteBook(book.id)">
          <span class="material-icons">delete</span>
        </button>
        <button class="editbutton" @click="goToEditBook(book.id)">
          <span class="material-icons">edit</span>
        </button>
      </book-item>
    </div>
  </div>
</template>