import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PostService from '../../services/PostService';
import { Toast } from 'flowbite-react';
import { FaTelegramPlane } from 'react-icons/fa';

const AddPost = ({ setOpenAddBlogModal }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [post, setPost] = useState({
        title: '',
        content: `<div></div>`,
        tagIds: [],
    });
    const notify = (data) => toast(`${data}`);
    // field change function
    const fieldChanged = (e) => {
        if (e.target.name === 'tagIds') {
            setPost({
                ...post,
                tagIds: [...post.tagIds, parseInt(e.target.value)],
            });
        } else {
            setPost({ ...post, [e.target.name]: e.target.value });
        }
    };

    const contentFieldChanged = (data) => {
        setPost({ ...post, content: data });
    };
    const fullscreenStyle = {
        border: '1px solid red',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
    // create post function
    const createPost = async (e) => {
        e.preventDefault();
        if (post.title.trim() === '') {
            alert('post title is required !!');
            return;
        }
        if (post.content.trim() === '') {
            alert('post content is required !!');
            return;
        }
        // notify(JSON.stringify(post));

        const response = await PostService.addPost(post);

        console.log(response);
        setOpenAddBlogModal(false);
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            [
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'code-block',
            ],
            [{ color: [] }, { background: [] }],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
            ['full-screen'],
        ],
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };
    return (
        <div
            className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setOpenAddBlogModal(false);
            }}
        >
            <div
                className="w-full text-white bg-[#e2e2e2] h-[100vh] flex flex-col items-center
                        justify-start box-border  scrollbar-hide overflow-y-scroll max-h-[95vh]
                        font-medium shadow-md shadow-[#364e7e1a] max-w-4xl mx-auto  px-1  rounded-xl "
            >
                <div className="bg-gray-300 p-2 text-gray-700 w-[90%] shadow-sm mt-[50px]">
                    <form className="p-4  box-border" onSubmit={createPost}>
                        <h1 className="text-[30px] ">
                            What going in your mind ?
                        </h1>
                        <div className="my-3 flex flex-col w-full space-y-3">
                            <label for="title">Post title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="p-2"
                                placeholder="Enter here"
                                onChange={fieldChanged}
                            />
                        </div>
                        <div className="my-3 flex flex-col w-full space-y-3 h-min-[400px] h-max-fit ">
                            <label for="content">Post Content</label>
                            <div
                                className="w-full h-min-[450px] h-max-fit flex "
                                style={isFullScreen ? fullscreenStyle : {}}
                            >
                                <ReactQuill
                                    theme="snow"
                                    value={post.content}
                                    onChange={contentFieldChanged}
                                    className=" w-full bg-white h-min-[300px] h-max-fit flex flex-col"
                                    modules={modules}
                                    placeholder="Write something amazing..."
                                />
                            </div>
                        </div>
                        <div className="my-3 flex flex-col w-full space-y-3">
                            <label for="category">Post Category</label>
                            <select
                                name="tagIds"
                                id="category"
                                placeholder="Enter here"
                                className="rounded-8 p-3 "
                                onChange={fieldChanged}
                                defaultValue={0}
                            >
                                <option disabled value={0}>
                                    --Select category--
                                </option>
                                <option value={1}>Programming</option>
                                <option value={2}>Gym</option>
                                <option value={3}>Skincare</option>
                                <option value={4}>Healthy</option>
                            </select>
                        </div>
                        <div className="my-3 flex flex-col w-full space-y-3">
                            <label for="category">Post Category</label>
                            <select
                                name="tagIds"
                                id="category"
                                placeholder="Enter here"
                                className="rounded-8 p-3 "
                                onChange={fieldChanged}
                                defaultValue={0}
                            >
                                <option disabled value={0}>
                                    --Select category--
                                </option>
                                <option value={[1]}>Programming</option>
                                <option value={[2]}>Gym</option>
                                <option value={[3]}>Skincare</option>
                                <option value={[4]}>Healthy</option>
                            </select>
                        </div>
                        <div className="w-full flex justify-center space-x-3">
                            <div>
                                <button
                                    type="submit"
                                    className="bg-[#0c881f] w-[160px] h-[55px] text-[15px] text-center  text-white  text-medium  hover:border hover:border-white"
                                >
                                    Create Post
                                </button>
                                <ToastContainer />
                            </div>

                            <button
                                onClick={() => {
                                    setPost({
                                        title: '',
                                        content: '',
                                        tagIds: [],
                                    });
                                }}
                                type="reset"
                                className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center  text-white  text-medium  hover:border hover:border-white"
                            >
                                Reset Content
                            </button>
                        </div>
                    </form>
                </div>
                {JSON.stringify(post)}
            </div>
        </div>
    );
};

export default AddPost;
