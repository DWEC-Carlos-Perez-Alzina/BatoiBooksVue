import { reactive, render } from 'vue'
import BooksApi from './services/books.api'
import ModulesApi from './services/modules.api'



export const store = {
    state: reactive({
        booksApi: new BooksApi(),
        modulesApi: new ModulesApi(),
        books: [],
        modules: [],
        cart: [],
        messages: []
    }),
    async populate() {
        try {
            const [books, modules] = await Promise.all([
                this.state.booksApi.getDBBooks(),
                this.state.modulesApi.getDBModules()
            ])

            this.state.books = books
            this.state.modules = modules
        } catch (error) {
            console.log(error)
        }
        
    },
    getBooks() {
        return this.state.books
    },
    getBookById(id) {
        try {
            return this.state.books.find(book => book.id === id)
        } catch (error) {
            this.addMessage(error.message, 'error')
        }
    },
    getModuleByBookId(id) {
        try {
            return this.state.modules.find(module => module.code === id)
        } catch (error) {
            this.addMessage(error.message, 'error')
        }
    },
    async addBook(book) {
        try {
            await this.state.booksApi.addDBBook(book)
            this.state.books.push(book)
            this.addMessage('Libro agregado correctamente', 'success')
        } catch (error) {
            addMessage(error.message, 'error')
        }
    },
    async deleteBook(id) {
        try {
            await this.state.booksApi.removeDBBook(id)
            const bookId = this.getBookIndexById(id)
            this.state.books.splice(bookId, 1)
            this.addMessage('Libro borrado correctamente', 'success')
        } catch (error) {
            addMessage(error.message, 'error')
        }
    },
    getBookIndexById(bookId) {
        const index = Array.from(this.state.books).findIndex(book => book.id === bookId)
        if (index === -1) {
            addMessage('Libro no encontrado', 'error')
        }
        return index
    
    },
    getBookInCart(bookId) {
        const book = this.getBookById(bookId)
        this.state.cart.find(cartBook => cartBook.id === book.id)
    },
    addToCart(book) {
        if (this.getBookInCart(book.id)) {
            addMessage('El libro ya estaba en el carrito', 'error')
        }
        try {
            this.state.cart.push(book)
            this.addMessage('Libro agregado al carrito', 'success')
        } catch (error) {
            this.addMessage(error.message, 'error')
        }
    },
    removeFromCart(bookId) {
        try {
            const index = this.state.cart.findIndex(book => book.id === bookId)
            this.state.cart.splice(index, 1)
            this.addMessage('Libro eliminado del carrito', 'success')
        } catch (error) {
            this.addMessage(error.message, 'error')
        }
    },
    getCart() {
        return this.state.cart
    },
    getBookFromCart(bookId) {
        return this.state.cart.find(book => book.id === bookId)
    },
    addMessage(message, type) {
        this.state.messages.push({message, type})  
        setTimeout(() => {
            this.deleteMessage(0)
        },3000)
    },
    clearMessage() {
        this.state.messages = []
    },
    deleteMessage(index) {
        this.state.messages.splice(index, 1)
    }
}