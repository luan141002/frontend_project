import { queries } from '@testing-library/react';
import WebService from './WebService';

const ExerciseService = {
    getExercises: async (queries) => {
        const response = await WebService.get('/exercises', queries);
        return await response.json();
    },
    getTopExercises: async (queries) => {
        const response = await WebService.get('/posts/top-popular', queries);
        return await response.json();
    },
    getExercise: async (exerciseId, queries) => {
        const response = await WebService.get(
            `/exercises/${exerciseId}`,
            queries,
        );
        return await response.json();
    },
    getExercisesByCategoryName: async (categoryName, queries) => {
        const response = await WebService.get(
            `/exercises/exercise-category/name/${categoryName}`,
            queries,
        );
        return await response.json();
    },
};

export default ExerciseService;
