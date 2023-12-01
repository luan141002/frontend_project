import WebService from './WebService';

const ProgramService = {
    getProgrammeById: async (programmeId) => {
        const response = await WebService.get(`/programs/${programmeId}`);
        const jsonResponse = await response.json();
        const realResponse = {
            boards: [
                {
                    ...jsonResponse,
                    columns: { name: 'todo', tasks: jsonResponse.tasks },
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
};

export default ProgramService;
