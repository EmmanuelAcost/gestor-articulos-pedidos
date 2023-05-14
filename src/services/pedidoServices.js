import api from "./api";

export const getPedidos = async () => {
  try {
    const response = await api.get('/pedidos');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los pedidos');
  }
};
export const getPedidoById = async (id) => {
  try {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener el pedido con ID ${id}`);
  }
};
export const crearPedido = async (pedido) => {
  try {
    const response = await api.post('/pedidos', pedido);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el pedido');
  }
};
export const editarPedido = async (id, pedido) => {
  try {
    const response = await api.put(`/pedidos/${id}`, pedido);
    return response.data;
  } catch (error) {
    throw new Error('Error al editar el pedido');
  }
};
export const eliminarPedido = async (id) => {
  try {
    const response = await api.delete(`/pedidos/${id}`);
    console.log(`pedidos con ID ${id} eliminado correctamente.`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el pedidos');
  }
};