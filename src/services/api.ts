import axios, { AxiosError } from 'axios';
import type { RecipeFormData, RecipeResponse } from '../types/recipe';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export const generateRecipe = async (data: RecipeFormData): Promise<RecipeResponse> => {
    try {
        const response = await api.post('/api/recipes/generate/', data);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Erreur de connexion au serveur');
        }
        throw error;
    }
};

export const getRecipes = async () => {
    try {
        const response = await api.get('/api/recipes/');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error('Erreur lors de la récupération des recettes');
        }
        throw error;
    }
};

export default api;