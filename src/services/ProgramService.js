import { async } from 'q';
import WebService from './WebService';
import data from '../pages/Schedule/data/realData.json';

const ProgramService = {
    getProgrammeById: async (programmeId) => {
        const response = await WebService.get(`/programs/${programmeId}`);
        const jsonResponse = await response.json();
        const realResponse = {
            boards: [
                {
                    ...jsonResponse,
                    columns: [
                        {
                            name: 'todo',
                            tasks: jsonResponse.tasks.filter(
                                (task) => task.status === 'Todo',
                            ),
                        },
                        {
                            name: 'doing',
                            tasks: jsonResponse.tasks.filter(
                                (task) => task.status === 'Doing',
                            ),
                        },
                        {
                            name: 'done',
                            tasks: jsonResponse.tasks.filter(
                                (task) => task.status === 'Done',
                            ),
                        },
                    ],
                    isActive: true,
                },
            ],
        };
        const {
            boards: [{ tasks, ...restBoard }, ...restBoards],
        } = realResponse;
        const modifiedData = { boards: [{ ...restBoard }, ...restBoards] };
        console.log(modifiedData);
        return modifiedData;
    },
    getProgrammeByMemberId: async (memberId) => {
        const response = await WebService.get(`/members/${memberId}/programs`);
        if (response) {
            try {
                // Cố gắng phân tích JSON
                const parsedData = JSON.parse(response);
                console.log(parsedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.warn('Empty response from API');
        }
        const jsonResponse = await response.json();
        const realResponse = {
            boards: [
                {
                    ...jsonResponse,
                    columns: [
                        {
                            name: 'todo',
                            tasks: jsonResponse?.tasks?.filter(
                                (task) => task.status === 'Todo',
                            ),
                        },
                        {
                            name: 'doing',
                            tasks: jsonResponse?.tasks?.filter(
                                (task) => task.status === 'Doing',
                            ),
                        },
                        {
                            name: 'done',
                            tasks: jsonResponse?.tasks?.filter(
                                (task) => task.status === 'Done',
                            ),
                        },
                    ],
                    isActive: true,
                    id: memberId,
                },
            ],
        };
        const {
            boards: [{ tasks, ...restBoard }, ...restBoards],
        } = realResponse;
        console.log(realResponse);
        const modifiedData = { boards: [{ ...restBoard }, ...restBoards] };
        console.log(modifiedData);
        return modifiedData;
    },
    changeSessionStatusToDoing: async (sessionId) => {
        await WebService.putJson(
            `/workout-sessions/${sessionId}/change-doing`,
            null,
        );
    },
    changeSessionStatusToDone: async (sessionId) => {
        await WebService.putJson(
            `/workout-sessions/${sessionId}/change-done`,
            null,
        );
    },
    changeSessionStatusToTodo: async (sessionId) => {
        await WebService.putJson(
            `/workout-sessions/${sessionId}/change-to-do`,
            null,
        );
    },
    addWorkoutSessions: async (programmeId, workOutSessions) => {
        const response = await WebService.postJson(
            `/programs/${programmeId}/workout-sessions`,
            workOutSessions,
        );
        return response.json();
    },
    editWorkoutSessions: async (workoutId, workOutSessions) => {
        const response = await WebService.putJson(
            `/workout-sessions/${workoutId}`,
            workOutSessions,
        );
        return response.json();
    },
    getWorkoutSessions: async (workoutId) => {
        const response = await WebService.get(`/workout-sessions/${workoutId}`);
        return response.json();
    },
    getWorkoutSessions: async (workoutId) => {
        const response = await WebService.get(`/workout-sessions/${workoutId}`);
        return response.json();
    },

    addProgram: async (memberId, name, description) => {
        const body = {
            name,
            description,
            member: {
                id: memberId,
            },
        };
        console.log(body);
        // const response = await WebService.postJson('/programs', body);
        // return response.json;
    },
    addSubtask: async (workoutId, subtaskId) => {
        const body = { id: subtaskId };

        await WebService.postJson(
            `/workout-sessions/${workoutId}/add-exercise`,
            body,
        );
    },
    setCompleteSubtask: async (workoutId, subtaskId) => {
        await WebService.putJson(
            `/workout-sessions/${workoutId}/complete-subtask/${subtaskId}`,
            null,
        );
    },
    deleteWorkoutSessions: async (workoutId) => {
        await WebService.delete(`/workout-sessions/${workoutId}`);
    },
    deleteSubtask: async (workoutId, subtaskId) => {
        await WebService.delete(
            `/workout-sessions/${workoutId}/subtasks/${subtaskId}`,
        );
    },
};

export default ProgramService;
