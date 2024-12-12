<script>
import { store } from '../storage.js'
import BookItem from './BookItem.vue'
export default {
    name: 'AppCart',
    components: { BookItem },
    computed: {
        cart() {
            return store.state.cart
        }
    },
    methods: {
        removeFromCart(bookId) {
            if (!confirm(`Seguro que quieres eliminar el libro ${bookId} del carrito?`)) {
                return
            }
            try {
                store.removeFromCart(bookId)
            } catch (error) {
                store.addMessage(error.message, 'error')
            }
        }
    }
}
</script>

<template>
<h2>Carrito</h2>
<div id="list">
    <div class="card">
        <book-item v-for="book in cart" :key="book.id" :book="book">
            <button class="removebutton" @click="removeFromCart(book.id)">
                <span class="material-icons">remove_shopping_cart</span>
            </button>
        </book-item>
    </div>
</div>
</template>

<style scoped>
#list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Ajuste automático para llenar espacio */
  gap: 30px; /* Espacio incrementado */
  padding: 30px;
  margin-top: 20px;
  box-sizing: border-box;
}

/* Estilos para las tarjetas */
.card {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  box-sizing: border-box;
  margin-left: 0px;
  text-align: center;
}

.card img {
  width: 60px;
}

.card h4, .card p {
  margin: 8px 0;
}

.card p {
  font-size: 14px;
  color: #333;
}

.card h4 {
  font-size: 18px;
  font-weight: bold;
}

.card h3 {
  font-size: 16px;
  color: #666;
}

.card > .card-body {
  margin-left: 0;
}
</style>