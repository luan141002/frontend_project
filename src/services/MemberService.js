import { queries } from '@testing-library/react';
import WebService from './WebService';
const MemberService = {
    getMemberByEmail: async (email) => {
        const response = await WebService.get(`/members/get-by-email/${email}`);

        return await response.json();
    },
    getPTById: async (id) => {
        const response = await WebService.get(`/personal-trainers/${id}`);
        return await response.json();
    },
    getPTs: async () => {
        const response = await WebService.get(`/personal-trainers`);
        return await response.json();
    },
    getMembersByPTId: async (memberId) => {
        const response = await WebService.get(
            `/personal-trainers/${memberId}/members`,
        );

        return response.json();
    },
    assignPT: async (memberId, ptId) => {
        await WebService.post(
            `/members/assignPersonalTrainer?memberId=${memberId}&personalTrainerId=${ptId}`,
        );
    },
    updatePersonalInfoConfig: async (
        memberId,
        height,
        weight,
        age,
        gender,
        bmi,
        fat,
    ) => {
        const date = new Date();
        const body = {
            id: memberId,
            height,
            weight,
            age,
            gender,
            date,
            bmi,
            fat,
        };
        const response = await WebService.postJson(
            `/tools/calculate-bmi`,
            body,
        );
        return response.json();
    },
};

export default MemberService;
