import { defineStore } from 'pinia'
import BooksApi from '../services/books.api'
import ModulesApi from '../services/modules.api'

export const useStorage = defineStore('storage', {
  state: () => ({
    booksApi: new BooksApi(),
    modulesApi: new ModulesApi(),
    modules: [],
    cart: [],
    messages: []
  }),
  getters: {
      getModuleByBookId: (state) => (id) => {
        try {
          return state.modules.find(module => module.code === id);
        } catch (error) {
          this.addMessage(error.message, 'error');
        }
      },
      getCart: (state) => state.cart,
      getBookInCart: (state) => (bookId) => {
        try {
            state.cart.find(cartBook => cartBook.id === bookId)
        } catch (error) {
            this.addMessage(error.message, 'error')
        }
      },
      getBookFromCart: (state) => (bookId) => {
        try {
            state.cart.find(book => book.id === bookId)
        } catch (error) {
            this.addMessage(error.message, 'error')
        }
      }
  },
  actions: {
    async populate() {
      try {
        const modules = await this.modulesApi.getDBModules()
        this.modules = modules
      } catch (error) {
        this.addMessage(error.message, 'error')
      }
    },
    async getDBBooks() {
      try {
        return await this.booksApi.getDBBooks()
      } catch(error) {
        this.addMessage(error.message, 'error')
      }
    },
    async getDBBook(id) {
      try {
        return await this.booksApi.getDBBook(id)
      } catch(error) {
        this.addMessage(error.message, 'error')
      }
    },
    async addBookST(book) {
      try {
        await this.booksApi.addDBBook(book)
        this.addMessage('Libro agregado correctamente', 'success')
      } catch (error) {
        addMessage(error.message, 'error')
      }
    },
    async deleteBookST(id) {
      try {
        await this.booksApi.removeDBBook(id)
        this.addMessage('Libro borrado correctamente', 'success')
      } catch (error) {
        addMessage(error.message, 'error')
      }
    },
    async editBookST(book) {
      try {
        await this.booksApi.changeDBBook(book)
        this.addMessage('Libro editado correctamente', 'success')
      } catch(error) {
        this.addMessage(error.message, 'error')
      }
    },
    addToCartST(book) {
      if (this.getBookInCart(book.id)) {
        addMessage('El libro ya estaba en el carrito', 'error')
      }
      try {
        this.cart.push(book)
        this.addMessage('Libro agregado al carrito', 'success')
      } catch (error) {
        this.addMessage(error.message, 'error')
      }
    },
    removeFromCartSt(bookId) {
      try {
        const index = this.cart.findIndex(book => book.id === bookId)
        this.cart.splice(index, 1)
        this.addMessage('Libro eliminado del carrito', 'success')
      } catch (error) {
        this.addMessage(error.message, 'error')
      }
    },
    addMessage(message, type) {
      this.messages.push({message, type})
      setTimeout(() => {
        this.deleteMessage(0)
      },3000)
    },
    clearMessage() {
      this.messages = []
    },
    deleteMessage(index) {
      this.messages.splice(index, 1)
    }
  }
})

