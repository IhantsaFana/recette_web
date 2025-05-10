import React from 'react';
import { Box, Typography, Chip, Paper } from '@mui/material';
import type { Recipe } from '../types/recipe';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TranslateIcon from '@mui/icons-material/Translate';

interface RecipeCardProps {
    recipe: Recipe;
    metadata: {
        generation_time: number;
        image_search_time: number;
        total_ingredients: number;
        total_steps: number;
        is_vegetarian: boolean;
    };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, metadata }) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return '#4caf50';
            case 'medium':
                return '#ff9800';
            case 'hard':
                return '#f44336';
            default:
                return '#757575';
        }
    };

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)'
                }
            }}
        >
            {recipe.image_url && (
                <Box
                    sx={{
                        position: 'relative',
                        paddingTop: '56.25%', // 16:9 aspect ratio
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <Box
                        component="img"
                        src={recipe.image_url}
                        alt={recipe.title}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    />
                </Box>
            )}

            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom component="h1" sx={{ 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    mb: 2
                }}>
                    {recipe.title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                    <Chip
                        icon={<AccessTimeIcon />}
                        label={`${recipe.duration} min`}
                        color="primary"
                        variant="outlined"
                    />
                    <Chip
                        icon={<RestaurantIcon />}
                        label={recipe.cuisine_type}
                        color="secondary"
                        variant="outlined"
                    />
                    <Chip
                        icon={<TranslateIcon />}
                        label={recipe.language.toUpperCase()}
                        variant="outlined"
                    />
                    <Chip
                        label={recipe.difficulty.toUpperCase()}
                        sx={{
                            color: getDifficultyColor(recipe.difficulty),
                            borderColor: getDifficultyColor(recipe.difficulty)
                        }}
                        variant="outlined"
                    />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ 
                        color: '#34495e',
                        fontWeight: 600,
                        borderBottom: '2px solid #3498db',
                        pb: 1,
                        mb: 2
                    }}>
                        Ingrédients
                    </Typography>
                    <Box component="ul" sx={{ 
                        listStyleType: 'none',
                        pl: 0,
                        '& li': {
                            position: 'relative',
                            pl: 4,
                            mb: 1,
                            '&::before': {
                                content: '"•"',
                                color: '#3498db',
                                position: 'absolute',
                                left: 0,
                                fontWeight: 'bold',
                                fontSize: '1.2em'
                            }
                        }
                    }}>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h6" gutterBottom sx={{ 
                        color: '#34495e',
                        fontWeight: 600,
                        borderBottom: '2px solid #3498db',
                        pb: 1,
                        mb: 2
                    }}>
                        Étapes
                    </Typography>
                    <Box component="ol" sx={{ 
                        pl: 3,
                        '& li': {
                            mb: 2,
                            pb: 2,
                            borderBottom: '1px dashed #e0e0e0',
                            '&:last-child': {
                                borderBottom: 'none',
                                mb: 0,
                                pb: 0
                            }
                        }
                    }}>
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ 
                    mt: 4,
                    p: 2,
                    bgcolor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e9ecef'
                }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#6c757d' }}>
                        Informations complémentaires
                    </Typography>
                    <Box sx={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        mt: 1
                    }}>
                        {recipe.tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                size="small"
                                sx={{
                                    bgcolor: '#e9ecef',
                                    color: '#495057'
                                }}
                            />
                        ))}
                    </Box>
                    <Typography variant="caption" display="block" sx={{ mt: 1, color: '#6c757d' }}>
                        Temps de génération : {metadata.generation_time}s
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default RecipeCard;