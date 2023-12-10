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
    getCategories: async () => {
        const response = await WebService.get('/exercises-categories');
        return await response.json();
    },
    getExercise: async (exerciseId) => {
        const response = await WebService.get(`/exercises/${exerciseId}`);
        return await response.json();
    },
    getExercisesByCategoryName: async (categoryName, queries) => {
        const response = await WebService.get(
            `/exercises/exercise-category/name/${categoryName}`,
            queries,
        );
        return await response.json();
    },
    addExercise: async (newExercise) => {
        console.log(newExercise);
        const response = await WebService.postForm(`/exercises`, newExercise);
        return await response.json();
    },
    editExercise: async (exerciseId, editedExercise) => {
        console.log(editedExercise);
        const response = await WebService.putJson(
            `/exercises/${exerciseId}`,
            editedExercise,
        );
        return await response.json();
    },
    deleteExercise: async (exerciseId) => {
        const response = await WebService.delete(`/exercises/${exerciseId}`);
        return response;
    },
};

export default ExerciseService;
