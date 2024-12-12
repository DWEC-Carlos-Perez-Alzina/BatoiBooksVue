const SERVER = import.meta.env.VITE_URL_API;
import axios from 'axios';

export default class ModulesApi {
    async getDBModules() {
        try {
            const response = await axios.get(`${SERVER}/modules`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error al obtener módulos:', error);
            throw error;
        }
    }

    async getDBModule(id) {
        try {
            const response = await axios.get(`${SERVER}/module?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return response.data;
        } catch (error) {
            console.error(`Error al obtener el módulo con ID ${id}:`, error);
            throw error;
        }
    }
}
