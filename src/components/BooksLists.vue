<script>
import { store } from "../storage.js";
import BookItem from "./BookItem.vue";

export default {
  components: { BookItem },
  data() {
    return {
      books: []
    };
  },
  async created() {
    this.books = await store.getDBBooks();
  },
  methods: {
    deleteBook(bookId) {
      if (!confirm(`Seguro que quieres borrar el libro ${bookId}?`)) {
        return;
      }
      try {
        store.deleteBook(bookId);
        this.books.splice(this.books.findIndex(book => book.id === bookId), 1);
      } catch (error) {
        store.addMessage("Error al borrar el libro:", error);
      }
    },
    addToCart(bookId) {
      const book = this.books.find((b) => b.id === bookId);
      if (!book) {
        store.addMessage(`No se encontró el libro con ID ${bookId}`, "error");
        return;
      }
      if (!confirm(`Seguro que quieres agregar el libro ${bookId} al carrito?`)) {
        return;
      }
      store.addToCart(book);
    },
    goToEditBook(bookId) {
      this.$router.push('/edit/' + bookId);
    }
  },
};
</script>

<template>
  <div id="list">
    <div class="card" v-for="book in books" :key="book.id">
      <book-item :book="book">
        <button class="addtocart" @click="addToCart(book.id)">
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