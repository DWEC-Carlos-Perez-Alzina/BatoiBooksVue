import { defineStore } from "pinia";
import BooksApi from "../services/books.api";
import ModulesApi from "../services/modules.api";

export const useStorage = defineStore("storage", {
  state: () => ({
    booksApi: new BooksApi(),
    modulesApi: new ModulesApi(),
    modules: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    messages: [],
  }),
  getters: {
    getModuleByBookId: (state) => (id) => {
      try {
        return state.modules.find((module) => module.code === id);
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    getCart: (state) => state.cart,
    getBookInCart: (state) => (bookId) => {
      try {
        const cart = state.cart;
        console.log(cart);
        return cart.find((cartBook) => cartBook.id === bookId);
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    getBookFromCart: (state) => (bookId) => {
      try {
        state.cart.find((book) => book.id === bookId);
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
  },
  actions: {
    async populate() {
      try {
        const modules = await this.modulesApi.getDBModules();
        this.modules = modules;
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    async getDBBooks() {
      try {
        return await this.booksApi.getDBBooks();
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    async getDBBook(id) {
      try {
        return await this.booksApi.getDBBook(id);
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    async addBookST(book) {
      try {
        await this.booksApi.addDBBook(book);
        this.addMessage("Libro agregado correctamente", "success");
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    async deleteBookST(id) {
      try {
        await this.booksApi.removeDBBook(id);
        if (this.estaEnElCarro(id)) {
          this.removeFromCartSt(id);
        }
        this.addMessage("Libro borrado correctamente", "success");
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    async editBookST(book) {
      try {
        const newBook = await this.booksApi.changeDBBook(book);
        this.getDBBook(book.id);
        if (this.estaEnElCarro(book.id)) {
          this.removeFromCartSt(book.id);
          this.addToCartST(newBook);
        }
        this.addMessage("Libro editado correctamente", "success");
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    estaEnElCarro(id) {
      return this.cart.some((book) => book.id === id);
    },
    addToCartST(book) {
      if (this.getBookInCart(book.id)) {
        this.addMessage("El libro ya estaba en el carrito", "error");
        return;
      }
      try {
        this.cart.push(book);
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.addMessage("Libro agregado al carrito", "success");
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    removeFromCartSt(bookId) {
      try {
        this.cart = this.cart.filter((book) => book.id !== bookId);
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.addMessage("Libro eliminado del carrito", "success");
      } catch (error) {
        this.addMessage(error.message, "error");
      }
    },
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
      this.addMessage("Carrito vaciado correctamente", "success");
    },
    async realizarCompra() {
      this.cart = [];
      localStorage.removeItem("cart");
      this.addMessage("Compra realizada correctamente", "success");
    },
    addMessage(message, type) {
      this.messages.push({ message, type });
      setTimeout(() => {
        this.deleteMessage(0);
      }, 3000);
    },
    clearMessage() {
      this.messages = [];
    },
    deleteMessage(index) {
      this.messages.splice(index, 1);
    },
  },
});
