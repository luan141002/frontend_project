import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import PostService from '../../services/PostService';
import parse from 'html-react-parser';
import { Input, Tag, theme, Space } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const BlogPage = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState('');
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    // Load Page
    const loadPage = async () => {
        try {
            const blog = await PostService.getBlog(blogId);
            setBlog(blog);
            console.log(blog);
            var paragraphs = blog.content.split(/\d+\. /);
            setContent(paragraphs);
            console.log(paragraphs);
        } catch (err) {
            toast.error('Load Posts failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div className="w-full min-h-min bg-white  flex flex-col justify-between pt-[5%]">
            <div className="w-[60%] p-4 flex flex-col self-center">
                {/* <div
                    className="text-white flex flex-col self-start mb-[3%] w-full bg-cover
                    bg-center p-6 h-[190px]"
                    style={{
                        backgroundImage:
                            'url("https://img.meta.com.vn/Data/image/2021/08/06/stt-hoang-hon-22.jpg")',
                    }}
                > */}
                <div className="flex ">
                    <div>
                        <label className="text-[40px] font-bold ">
                            {blog?.title}
                        </label>
                        <p className="text-black  text-[15px] font-thin italic">
                            Articles sharing experiences in bodybuilding
                        </p>
                        <p className="text-xs">
                            {blog.views} views · {blog.createdDate}
                        </p>

                        <div className="flex mt-4">
                            <Space size={[0, 8]} wrap>
                                {blog?.postTags?.map((postTag, index) => {
                                    return (
                                        <Tag color="error" key={index}>
                                            {postTag?.tag?.name}
                                        </Tag>
                                    );
                                })}
                                {/* <Tag color='success'>success</Tag>
                            <Tag color='processing'>processing</Tag>
                            <Tag color='error'>error</Tag>
                            <Tag color='warning'>warning</Tag>
                            <Tag color='default'>default</Tag> */}
                            </Space>
                        </div>
                    </div>
                    <img
                        className="w-[50%] h-[400px] rounded-bl-[30%] rounded-tr-[30%]"
                        src={blog?.image}
                        alt="blog avatar"
                    />
                </div>
                {/* </div> */}
                <div className="p-2  mt-5 space-y-4">
                    {content?.map((con, index) => {
                        if (index === 0) {
                            return (
                                <div className="space-y-3">
                                    <h3 className="font-semibold">
                                        1. Introduce
                                    </h3>
                                    <p>{con}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div className="space-y-3">
                                    <h3 className="font-semibold">
                                        {index + 1}. {con.split('. ')[0]}
                                    </h3>
                                    <p>{con}</p>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>

            <div
                className="flex w-fit items-center gap-2 font-normal px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer text-red-500"
                onClick={() => {
                    navigate('/');
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    });
                }}
            >
                <span className="text-xl rotate-180">
                    <HiOutlineLogout />
                </span>
                Back to Homepage
            </div>

            <ToastContainer />
        </div>
    );
};

export default BlogPage;
