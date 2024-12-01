import axios from 'axios';

const API_URL = 'https://shelfswap-backend-d1d8b8a07f87.herokuapp.com/api/users';

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(API_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
};

export const googleSignIn = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = `${API_URL}/auth/google/shelfswap`;
    const responseType = 'code';
    const scope = 'profile email';

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
};

export const googleSignOut = async () => {
    try {
        await axios.get(`${API_URL}/logout`, { withCredentials: true });
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/id`);
        return response.data;
    } catch (error) {
        console.error(`Error finding user with id: ${id}:`, error);
        throw error;
    }
}