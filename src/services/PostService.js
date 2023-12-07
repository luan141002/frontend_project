import WebService from './WebService';

const PostService = {
    getPosts: async (queries) => {
        const response = await WebService.get('/posts', queries);
        return await response.json();
    },
    getTopPosts: async (queries) => {
        const response = await WebService.get('/posts/top-popular', queries);
        return await response.json();
    },
    getTags: async (queries) => {
        const response = await WebService.get('/tags', queries);
        return await response.json();
    },
    addPost: async (queries) => {
        const response = await WebService.postJson('/posts', queries);
        return await response.json();
    },
    getBlog: async (id) => {
        const response = await WebService.get(`/posts/${id}`);
        return await response.json();
    },
};

export default PostService;
