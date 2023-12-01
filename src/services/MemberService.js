import { queries } from '@testing-library/react';
import WebService from './WebService';
const MemberService = {
    getMemberByEmail: async (email) => {
        const response = await WebService.get(`/members/get-by-email/${email}`);

        return await response.json();
    },
};

export default MemberService;
