import { queries } from '@testing-library/react';
import WebService from './WebService';
const MemberService = {
    getMemberByEmail: async (email) => {
        const response = await WebService.get(`/members/get-by-email/${email}`);

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

        return await response.json();
    },
};

export default MemberService;
