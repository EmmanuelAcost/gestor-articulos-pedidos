import api from "./api";

export const getArticulos = async () => {
    try {
        const response = await api.get('/articulos');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los articulos');
    }
}
export const getArticuloById = async (id) => {
    try {
        const response = await api.get(`/articulos/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener el articulo con ID ${id}`);
    }
};
export const crearArticulos = async (articulo) => {
    try {
        const response = await api.post('/articulos', articulo);
        return response.data;
    } catch (error) {
        throw new Error('Error al crear el articulo');
    }
};
export const editarArticulos = async (id, articulo) => {
    try {
        const response = await api.put(`/articulos/${id}`, articulo);
        return response.data;
    } catch (error) {
        throw new Error('Error al editar el articulo');
    }
};
export const eliminarArticulos = async (id) => {
    try {
        const response = await api.delete(`/articulos/${id}`);
        console.log(`Artículo con ID ${id} eliminado correctamente.`);
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar el articulo');
    }
};