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
    }
}
</script>

<template>
<div id="cart">
    <h2>Carrito</h2>
    <book-item v-for="book in cart" :key="book.id" :book="book"></book-item>
</div>
</template>