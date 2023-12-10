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
    getMembersPhysicalInformation: async (memberId) => {
        const response = await WebService.get(
            `/members/${memberId}/history-body-data`,
        );
        return response.json();
    },
    assignPT: async (memberId, ptId, goal) => {
        const response = await WebService.post(
            `/members/assignPersonalTrainer?memberId=${memberId}&personalTrainerId=${ptId}&goal=${goal}`,
        );
        return response;
    },
    deletePT: async (id) => {
        const response = await WebService.delete(`/personal-trainers/${id}`);
        return await response.json();
    },
    getMembers: async () => {
        const response = await WebService.get(`/members`);
        return response.json();
    },
    getMemberById: async (memberId) => {
        const response = await WebService.get(`/members/${memberId}`);
        return response.json();
    },
    addPT: async (firstName, lastName, ptLevel, email, password) => {
        const body = {
            firstName: firstName,
            lastName: lastName,
            ptLevel: ptLevel,
            user: {
                password: password,
                email: email,
            },
        };
        console.log(body);
        await WebService.postJson('/personal-trainers', body);
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
        height = height / 100;
        const body = {
            member: { id: memberId },
            height,
            weight,
            age,
            gender,
        };
        console.log(body);
        const response = await WebService.postJson(
            `/personal-information`,
            body,
        );
        return response.json();
    },
};

export default MemberService;
