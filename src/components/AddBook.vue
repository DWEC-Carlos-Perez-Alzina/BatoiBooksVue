<script>
import { store } from '../storage.js'
export default {
  name: 'AddBook',
  props: ['id'],
  data() {
    return {
      book: {}
    };
  },
  computed: {
    modules() {
      return store.state.modules;
    }
  },
  async created() {
    if (this.id) {
      this.book = await store.getDBBook(this.id);
    }
  },
  watch: {
    id() {
      console.log(this.id)
      this.resetForm();
    }
  },
  methods: {
    async handleBook() {
      if (this.id === undefined) {
        await store.addBook(this.book);
      } else {
        await store.editBook(this.book);
      }
      this.book = {};
      this.$router.push('/list');
    },
    async resetForm() {
      if (this.id === undefined) {
        this.book = {};
      } else {
        this.book = await store.getDBBook(this.id);
      }
    }
  }
}
</script>

<template>
  <div id="form">
    <h2>{{ this.id ? 'Editar' : 'Añadir' }} libro</h2>
    <form id="bookForm" @submit.prevent="handleBook" @reset.prevent="resetForm" novalidate>
      <div v-if="this.id">
        <label for="id" id="id-label">ID:</label>
        <input type="text" id="id" name="id" v-model="book.id" readonly disabled>
        <br />
      </div>
      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module" v-model="book.moduleCode" required>
          <option value="undefined" disabled>- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">{{ module.cliteral }}</option>
        </select>
        <span id="id-module-error" class="error"></span>
      </div>
      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" required v-model="book.publisher">
        <span id="publisher-error" class="error"></span>
      </div>
      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price" required min="0" step="0.01" v-model="book.price">
        <span id="price-error" class="error"></span>
      </div>
      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" required min="0" step="1" v-model="book.pages">
        <span id="pages-error" class="error"></span>
      </div>
      <div>
        <label>Estado:</label>
        <label>
          <input type="radio" id="good" name="status" value="good" v-model="book.status" required> Good
        </label>
        <label>
          <input type="radio" id="new" name="status" value="new" v-model="book.status" required> New
        </label>
        <label>
          <input type="radio" id="old" name="status" value="old" v-model="book.status" required> Old
        </label>
        <span id="status-error" class="error"></span>
      </div>
      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments" v-model="book.comments"></textarea>
        <span class="error"></span>
      </div>
      <button type="submit">{{ this.id ? 'Editar' : 'Añadir' }}</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>

