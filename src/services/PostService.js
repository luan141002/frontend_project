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
};

export default PostService;
