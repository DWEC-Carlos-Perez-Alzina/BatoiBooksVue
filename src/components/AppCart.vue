<script>
import { mapActions, mapState } from "pinia";
import { useStorage } from "../stores/storage";
import BookItem from "./BookItem.vue";

export default {
  name: "AppCart",
  components: { BookItem },
  computed: {
    ...mapState(useStorage, ["cart"]),
    totalCart() {
      return this.cart.reduce((total, book) => total + book.price, 0);
    },
  },
  methods: {
    ...mapActions(useStorage, ["removeFromCartSt", "clearCart", "addMessage", 'realizarCompra']),
    removeFromCart(bookId) {
      if (!confirm(`¿Seguro que quieres eliminar el libro con ID ${bookId} del carrito?`)) return;
      this.removeFromCartSt(bookId);
    },
    emptyCart() {
      if (!confirm("¿Seguro que quieres vaciar el carrito?")) return;
      this.clearCart();
    },
    hacerCompra() {
      if (this.cart.length === 0) {
        this.addMessage("No hay libros en el carrito para realizar la compra", "error");
        return;
      }
      this.realizarCompra();
      alert("Compra realizada con éxito");
    },
  },
};
</script>

<template>
  <h2>Carrito</h2>
  <div id="list">
    <div class="card" v-for="book in cart" :key="book.id">
      <book-item :book="book">
        <button class="removebutton" @click="removeFromCart(book.id)">
          <span class="material-icons">remove_shopping_cart</span>
        </button>
      </book-item>
    </div>
  </div>
  <div class="cart-summary-inline">
    <h3>Hay {{ cart.length }} libro/s</h3>
    <h3>Total: {{ totalCart }} €</h3>
    <button class="purchase-button" @click="hacerCompra">Realizar compra</button>
    <button class="clear-button" @click="emptyCart">Vaciar carrito</button>
  </div>

</template>

<style scoped>
#list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
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

.cart-summary-inline {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;
  margin-top: 20px;
  text-align: center;
  flex-wrap: wrap;
}

.cart-summary-inline h3 {
  font-size: 18px;
  color: #444;
  margin: 0;
}

.cart-summary-inline button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.cart-summary-inline .purchase-button {
  background-color: #28a745; /* Verde */
  color: #fff;
}

.cart-summary-inline .clear-button {
  background-color: #dc3545; /* Rojo */
  color: #fff;
}

.cart-summary-inline button:hover {
  opacity: 0.9;
}


.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.actions button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.actions button.clear {
  background-color: #dc3545;
}

.actions button:hover {
  opacity: 0.9;
}
</style>

