import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // URL de tu backend

export const assignPermissions = async (userId: string, permissions: string[]) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/admin/users/${userId}/permissions`, { permissions }, {
            headers: {
                'Authorization': `Bearer ${token}`,'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al otorgar permisos:', error);
        throw error;
    }
}

export const removePermissions = async (userId: string, permissions: string[]) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/admin/users/${userId}/permissions`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: { permissions }, // Envía los permisos en el cuerpo de la solicitud DELETE
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al remover permisos:', error);
        throw error;
    }
}

export const getUserPermissions = async (userId: string) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/admin/users/${userId}/permissions`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al consultar permisos:', error);
        throw error;
    }
}