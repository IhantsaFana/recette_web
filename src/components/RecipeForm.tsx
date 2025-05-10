import React, { useState, type KeyboardEvent, type ChangeEvent } from 'react';
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
    Chip,
    Typography,
    Alert,
    Snackbar,
    type SelectChangeEvent,
    CircularProgress,
    Container,
} from '@mui/material';
import type { RecipeFormData, RecipeResponse } from '../types/recipe';
import { generateRecipe } from '../services/api';
import LoadingOverlay from './LoadingOverlay';
import RecipeCard from './RecipeCard';

const cuisineTypes = [
    'française',
    'italienne',
    'japonaise',
    'chinoise',
    'mexicaine',
    'indienne',
    'thai',
    'international',
];

const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
];

const RecipeForm: React.FC = () => {
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [cuisineType, setCuisineType] = useState('française');
    const [language, setLanguage] = useState('fr');
    const [duration, setDuration] = useState(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddIngredient = (e?: KeyboardEvent) => {
        if (e) {
            e.preventDefault();
        }
        if (ingredient.trim()) {
            setIngredients(prev => [...prev, ingredient.trim()]);
            setIngredient('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddIngredient();
        }
    };

    const handleRemoveIngredient = (indexToRemove: number) => {
        setIngredients(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIngredient(e.target.value);
    };

    const handleCuisineTypeChange = (e: SelectChangeEvent) => {
        setCuisineType(e.target.value);
    };

    const handleLanguageChange = (e: SelectChangeEvent) => {
        setLanguage(e.target.value);
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 5 && value <= 240) {
            setDuration(value);
        }
    };

    const resetForm = () => {
        setIngredients([]);
        setCuisineType('française');
        setLanguage('fr');
        setDuration(30);
        setRecipe(null);
        setError(null);
        setShowSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (ingredients.length === 0) {
            setError('Veuillez ajouter au moins un ingrédient');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const formData: RecipeFormData = {
                ingredients,
                cuisine_type: cuisineType,
                language,
                duration,
            };
            const response = await generateRecipe(formData);
            setRecipe(response);
            setShowSuccess(true);
            // Scroll to recipe result
            const recipeResult = document.getElementById('recipe-result');
            if (recipeResult) {
                recipeResult.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (err) {
            console.error('Erreur lors de la génération de la recette:', err);
            setError(
                err instanceof Error 
                    ? err.message 
                    : 'Une erreur est survenue lors de la génération de la recette'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            {loading && <LoadingOverlay />}
            
            <Stack spacing={4}>
                <Box component="form" onSubmit={handleSubmit} sx={{ 
                    maxWidth: 600, 
                    mx: 'auto', 
                    p: 3,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 1
                }}>
                    <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                        Générateur de Recettes
                    </Typography>

                    {/* Ingredients input */}
                    <Stack spacing={2} mb={3}>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                fullWidth
                                label="Ingrédient"
                                value={ingredient}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                                placeholder="Entrez un ingrédient"
                                size="medium"
                            />
                            <Button
                                variant="contained"
                                onClick={() => handleAddIngredient()}
                                disabled={loading || !ingredient.trim()}
                                sx={{ minWidth: '100px' }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Ajouter'}
                            </Button>
                        </Stack>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {ingredients.map((ing, index) => (
                                <Chip
                                    key={index}
                                    label={ing}
                                    onDelete={() => handleRemoveIngredient(index)}
                                    disabled={loading}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Stack>

                    {/* Cuisine type */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="cuisine-type-label">Type de cuisine</InputLabel>
                        <Select
                            labelId="cuisine-type-label"
                            value={cuisineType}
                            onChange={handleCuisineTypeChange}
                            label="Type de cuisine"
                            disabled={loading}
                        >
                            {cuisineTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Language */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="language-label">Langue</InputLabel>
                        <Select
                            labelId="language-label"
                            value={language}
                            onChange={handleLanguageChange}
                            label="Langue"
                            disabled={loading}
                        >
                            {languages.map((lang) => (
                                <MenuItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Duration */}
                    <TextField
                        fullWidth
                        type="number"
                        label="Durée (minutes)"
                        value={duration}
                        onChange={handleDurationChange}
                        inputProps={{ min: 5, max: 240 }}
                        disabled={loading}
                        sx={{ mb: 3 }}
                    />

                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading || ingredients.length === 0}
                            sx={{ height: '48px' }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Générer la recette'
                            )}
                        </Button>
                        
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={resetForm}
                            disabled={loading}
                            sx={{ height: '48px' }}
                        >
                            Réinitialiser
                        </Button>
                    </Stack>
                </Box>

                {/* Recipe Result */}
                {recipe && (
                    <Box sx={{ 
                        scrollMarginTop: 16,
                        animation: 'fadeIn 0.5s ease-in-out'
                    }} id="recipe-result">
                        <RecipeCard recipe={recipe.recipe} metadata={recipe.metadata} />
                    </Box>
                )}
            </Stack>

            {/* Error display */}
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setError(null)} variant="filled">
                    {error}
                </Alert>
            </Snackbar>

            {/* Success message */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)} variant="filled">
                    Recette générée avec succès !
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RecipeForm;