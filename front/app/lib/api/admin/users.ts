import api from '@/app/lib/api';

export const getAllUsersAdmin = async () => {
    try {
        // Usa api en lugar de axios
        const response = await api.get('/admin/users');  // Nota que la URL es relativa
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
}

export const updatedUserAdmin = async (userId: string, userData: any) => {
    try {
        console.log('Enviando solicitud a:', `/admin/users/${userId}`);
        console.log('Datos enviados:', userData);
        const response = await api.put(`/admin/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
}

export const deleteUserAdmin = async (userId: string) => {
    try {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
}

export const createUserAdmin = async (userData: any) => {
    try {
        console.log('Datos enviados al backend:', userData);
        const response = await api.post('/admin/users', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Respuesta completa del backend:', response);
        console.log('Respuesta del backend (data):', response.data);
        return response.data;
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

