import { async } from 'q';
import WebService from './WebService';

const ProgramService = {
    addProgram: async (memberId, name, description) => {
        const body = {
            name: name,
            description: description,
            member: {
                id: +memberId,
            },
        };
        console.log(body);
        const response = await WebService.postJson('/programs', body);
        return response.json;
    },
    getProgrammeById: async (programmeId) => {
        const response = await WebService.get(`/programs/${programmeId}`);
        const jsonResponse = await response.json();
        const { data } = jsonResponse;
        console.log(data);
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
                },
            ],
        };
        const {
            boards: [{ tasks, ...restBoard }, ...restBoards],
        } = realResponse;
        const modifiedData = { boards: [{ ...restBoard }, ...restBoards] };

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

    addSubtask: async (workoutId, subtaskId) => {
        const body = { id: subtaskId };
        console.log(body);
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
