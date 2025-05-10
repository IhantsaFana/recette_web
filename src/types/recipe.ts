export interface Recipe {
    id: number;
    title: string;
    ingredients: string[];
    steps: string[];
    cuisine_type: string;
    language: string;
    duration: number;
    image_url: string | null;
    tags: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    rating: number;
    ratings_count: number;
    created_at: string;
}

export interface RecipeFormData {
    ingredients: string[];
    cuisine_type: string;
    language: string;
    duration: number;
}

export interface RecipeResponse {
    recipe: Recipe;
    metadata: {
        generation_time: number;
        image_search_time: number;
        total_ingredients: number;
        total_steps: number;
        is_vegetarian: boolean;
    };
}