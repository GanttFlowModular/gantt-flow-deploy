import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // URL de tu backend

export const createUser = async (userData: { name: string, email: string, mobile: string, password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (userData: { email: string, password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};