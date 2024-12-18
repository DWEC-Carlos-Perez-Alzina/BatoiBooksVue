const SERVER = import.meta.env.VITE_URL_API;
import axios from 'axios';

export default class BooksApi {
    async getDBBooks() {
        try {
            const response = await axios.get(`${SERVER}/books`, {
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los libros: ' + error.message);
        }
    }

    async getDBBook(id) {
        try {
            const response = await axios.get(`${SERVER}/books/${id}`, {
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener el libro: ' + error.message);
        }
    }

    async addDBBook(book) {
        try {
            const response = await axios.post(`${SERVER}/books`, book, {
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al agregar el libro: ' + error.message);
        }
    }

    async removeDBBook(id) {
        try {
            await this.getDBBook(id);
            const response = await axios.delete(`${SERVER}/books/${id}`, {
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al borrar el libro: ' + error.message);
        }
    }

    async changeDBBook(book) {
        try {
            const response = await axios.put(`${SERVER}/books/${book.id}`, book, {
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al actualizar el libro: ' + error.message);
        }
    }

    async getDBBooksByUserIdAndModule(userId, idModule) {
        try {
            const response = await axios.get(`${SERVER}/books?userId=${userId}&moduleId=${idModule}`, {
            });
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los libros por usuario y módulo: ' + error.message);
        }
    }
}

