import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // URL de tu backend

export const getAllUsersAdmin = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/users`);
        return response.data.data; // Retorna la lista de usuarios
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
}

export const updatedUserAdmin = async (userId: string, userData: any) => {
    try {
        console.log('Enviando solicitud a:', `${API_URL}/admin/users/${userId}`); // Log para depuración
        console.log('Datos enviados:', userData); // Log para depuración
        const response = await axios.put(`${API_URL}/admin/users/${userId}`, userData);
        return response.data; // Retorna el usuario actualizado
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
}

export const deleteUserAdmin = async (userId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/users/${userId}`);
        return response.data; // Retorna la respuesta del backend
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
}

export const createUserAdmin = async (userData: any) => {
    try {
        console.log('Datos enviados al backend:', userData); // Log para depuración
        const response = await axios.post(`${API_URL}/admin/users`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Respuesta completa del backend:', response); // Log para depuración
        console.log('Respuesta del backend (data):', response.data); // Log para depuración
        return response.data; // Retornamos response.data (no response.data.data)
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al crear el usuario:', error.message);
            throw new Error(error.message);
        } else {
            console.error('Error desconocido:', error);
            throw new Error('Ocurrió un error desconocido');
        }
    }
}

