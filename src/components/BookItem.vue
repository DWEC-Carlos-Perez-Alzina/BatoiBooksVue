<script>
import { store } from '../storage.js'
export default {
    name: 'BookItem',
    props: ['book'],
    computed: {
        module() {
            return store.getModuleByBookId(this.book.moduleCode) || {};
        }
    }
}
</script>

<template>
    <img class="card-img-top" :src="book.photo || 'https://png.pngtree.com/png-vector/20230105/ourmid/pngtree-book-icon-vector-image-png-image_6552370.png'" :alt="`Imagen del libro ${book.id}`">
    <h4>Libro: {{ book.id }}</h4>
    <div class="card-body">
        <h3 class="card-title">{{ module.cliteral || 'N/A' }} ({{ module.code || 'N/A' }})</h3>
        <h4>Editorial</h4>
        <p class="publisher">{{ book.publisher }}</p>
        <p class="pages">{{ book.pages }} páginas</p>
        <p class="status">Estado: {{ book.status }}</p>
        <p class="sold-date">{{ book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta' }}</p>
        <h5>Comentarios</h5>
        <p class="comments">{{ book.comments }}</p>
        <h4 class="price">{{ book.price }} €</h4>
        <slot :id="book.id"></slot>
    </div>
</template>

