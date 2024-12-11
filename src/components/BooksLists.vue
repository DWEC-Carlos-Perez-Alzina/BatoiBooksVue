<script>
import { store } from "../storage.js";
import BookItem from "./BookItem.vue";

export default {
  components: { BookItem },
  computed: {
    books() {
      return store.state.books;
    },
  },
  methods: {
    deleteBook(bookId) {
      if (!confirm(`Seguro que quieres borrar el libro ${bookId}?`)) {
        return;
      }
      try {
        store.deleteBook(bookId);
      } catch (error) {
        console.error("Error al borrar el libro:", error);
      }
    },
    addToCart(bookId) {
      const book = this.books.find((b) => b.id === bookId);
      if (!book) {
        console.error(`No se encontró el libro con ID ${bookId}`);
        return;
      }
      if (!confirm(`Seguro que quieres agregar el libro ${bookId} al carrito?`)) {
        return;
      }
      store.addToCart(book);
      console.log("Carrito actualizado:", store.state.cart);
    },
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
        <button class="editbutton">
          <span class="material-icons">edit</span>
        </button>
      </book-item>
    </div>
  </div>
</template>