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
    deleteBook() {
      if (!confirm(`Seguro que quieres borrar el libro ${this.book.id}?`)) {
        return;
      }
      try {
        store.deleteBook(this.book.id);
      } catch (error) {}
    },
    addtocart() {
      if (
        !confirm(
          `Seguro que quieres agregar el libro ${this.book.id} al carrito?`
        )
      ) {
        return;
      }
      store.addToCart(this.book);
      console.log(store.state.cart);
    },
  },
};
</script>
<template>
    <div id="list">
    <div class="card">
      <book-item v-for="book in books" :key="book.id" :book="book">
        <button class="addtocart" :value="book.id" @click="addtocart(book)">
            <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="removebutton" :value="book.id" @click="deleteBook(book.id)">
            <span class="material-icons">delete</span>
        </button>
        <button class="editbutton" :value="book.id">
            <span class="material-icons">edit</span>
        </button>
      </book-item>
    </div>
  </div>
</template>


</template>
<template>
  <div id="list">
    <div class="card">
      <book-item v-for="book in books" :key="book.id" :book="book">
        <button
          class="addtocart"
          :value="book.id"
          @click="callAddToCart(book.id)"
        >
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button
          class="removebutton"
          :value="book.id"
          @click="callDeleteBook(book.id)"
        >
          <span class="material-icons">delete</span>
        </button>
        <button class="editbutton" :value="book.id">
          <span class="material-icons">edit</span>
        </button>
      </book-item>
    </div>
  </div>
</template>
