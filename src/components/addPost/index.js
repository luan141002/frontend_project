import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost as doCreatePost } from '../../services/post_service';
import { Toast } from 'flowbite-react';
import { FaTelegramPlane } from 'react-icons/fa';

const AddPost = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [post, setPost] = useState({
        title: '',
        content: `<div></div>`,
        categoryIds: '',
    });
    const notify = (data) => toast(`${data}`);
    // field change function
    const fieldChanged = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
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
    const createPost = (e) => {
        e.preventDefault();
        if (post.title.trim() === '') {
            alert('post title is required !!');
            return;
        }
        if (post.content.trim() === '') {
            alert('post content is required !!');
            return;
        }
        if (post.categoryIds === '') {
            alert('select some category !!');
            return;
        }
        notify(JSON.stringify(post));

        // submit the from to server
        // post["userId"] = user.id

        // doCreatePost(post)
        //     .then((data) => {
        //         alert('post created');
        //         console.log(post);
        //     })
        //     .catch((error) => {
        //         alert('error');
        //         console.log(error);
        //     });
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
        <div className="w-full text-white bg-[#e2e2e2] h-[100vh] flex flex-col items-center justify-start box-border ">
            <div className="bg-gray-300 p-2 text-gray-700 w-[90%] shadow-sm mt-[50px]">
                <form className="p-4  box-border" onSubmit={createPost}>
                    <h1 className="text-[30px] ">What going in your mind ?</h1>
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
                            name="categoryIds"
                            id="category"
                            placeholder="Enter here"
                            className="rounded-8 p-3 "
                            onChange={fieldChanged}
                            defaultValue={0}
                        >
                            <option disabled value={0}>
                                --Select category--
                            </option>
                            <option>Programming</option>
                            <option>Gym</option>
                            <option>Skincare</option>
                            <option>Healthy</option>
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
                                    categoryIds: '',
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
    );
};

export default AddPost;
