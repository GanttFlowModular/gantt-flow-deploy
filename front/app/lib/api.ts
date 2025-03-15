import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // URL de tu backend

export const createUser = async (userData: { name: string, email: string, mobile: string, password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (userData: { email: string, password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const sendRecoveryEmail = async (email: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const resetPassword = async (token: string, newPassword: string) => {
    try {
        const response = await axios.post(`${API_URL}/users/reset-password`, { token, newPassword });
        return response.data;
    } catch (error) {
        throw error;
    }
}

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

export const createUserAdmin = async (userData: { name: string, email: string, mobile: string, password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/admin/users`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}