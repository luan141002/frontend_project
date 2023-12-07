import { queries } from '@testing-library/react';
import WebService from './WebService';
const ToolService = {
    getCaloriesResult: async (
        activityLevel,
        goal,
        height,
        weight,
        age,
        gender,
    ) => {
        const body = { height, weight, age, gender };
        const response = await WebService.postJson(
            `/tools/calculate-calorie?activityLevel=${activityLevel}&goal=${goal}`,
            body,
        );
        return response.json();
    },
    getBMIResult: async (height, weight, age, gender) => {
        height = height / 100;
        const body = { height, weight, age, gender };
        console.log(body);
        const response = await WebService.postJson(
            `/tools/calculate-bmi`,
            body,
        );
        return response.json();
    },
};

export default ToolService;
