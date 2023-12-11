import WebService from './WebService';
import axios from 'axios';

const AuthService = {
    findRedirectUrl: (kind) => {
        if (!kind) return '';
        let nextUrl = '/';
        switch (kind) {
            case 'faculty':
                nextUrl = '/faculty';
                break;
            case 'administrator':
                nextUrl = '/admin';
                break;
            default:
                break;
        }

        return nextUrl;
    },

    login: async (email, password, nextUrl) => {
        const body = { email, password };
        console.log(body);
        localStorage.removeItem('token');
        const response = await WebService.postJson('/login', body);
        console.log(response.data);
        if (response.ok) {
            const token = await response.json();
            console.log(token);
            localStorage.setItem('token', token.jwtToken);
            if (!nextUrl) {
                nextUrl = '/';
            }
            token.nextUrl = nextUrl;
            return token;
        }

        return null;
    },

    register: async (
        firstName,
        lastName,
        email,
        password,
        matchingPassword,
    ) => {
        const body = {
            personalLevel: 'a',
            firstName: firstName,
            lastName: lastName,
            memberLevel: 'D',
            user: {
                password: password,
                email: email,
            },
        };
        console.log(body);
        await WebService.postJson('/members', body);
    },

    verifyCode: async (email, code, password, repeat) => {
        const body = { email, code, password, repeat };
        await WebService.postJson('/auth/code', body);
    },

    verify: async (token, password, repeat) => {
        const body = { token, password, repeat };
        await WebService.postJson('/auth/verify', body);
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getTokenInfo: async () => {
        const result = await WebService.post('/auth/token');
        const token = await result.json();
        const nextUrl = AuthService.findRedirectUrl(token.kind);
        token.nextUrl = nextUrl;
        return token;
    },

    activateAccount: async (email, code) => {
        const response = await WebService.post(
            `/users/activate?email=${email}&verificationCode=${code}`,
        );
        return response;
    },

    getHeader: () => {
        const token = AuthService.getToken();
        return token
            ? { Authorization: `Bearer ${token}` }
            : { Authorization: '' };
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    forgotPassword: async (email) => {
        await WebService.post(`/users/forgot-password?email=${email}`);
    },

    changePassword: async (id, password, verifyCode) => {
        await WebService.post(
            `/users/change-password?userId=${id}&verifyCode=${verifyCode}&newPassword=${password}`,
        );
    },
};

export default AuthService;
