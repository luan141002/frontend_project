import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import { Input, Tag, theme } from 'antd';
import PostService from '../../services/PostService.js';
import AddPost from '../../components/addPost/index.js';
import { useSelector } from 'react-redux';

import TopRank from '../../components/top_rank';
import Post from '../../components/post';

const Blog = () => {
    const [listBlog, setListBlog] = useState();
    const [TopArticles, setTopArticles] = useState();
    const [tags, setTags] = useState([]);
    const [page, setPage] = useState(0);

    const account = useRef(useSelector((state) => state.account));
    const isPT =
        account.current.roles[0]?.name === 'PERSONAL_TRAINER' ? true : false;

    const loadPage = async () => {
        const posts = await PostService.getPosts({ page: page, limit: 5 });
        const topArticleList = await PostService.getTopPosts();
        const listTags = await PostService.getTags();

        setListBlog(posts);
        setTopArticles(topArticleList.slice(0, 5));
        setTags(listTags.map((tag) => tag.name).slice(1, 5));
    };

    useEffect(() => {
        loadPage();
    }, [page]);

    const { token } = theme.useToken();

    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };
    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
        console.log(tags);
    };

    const tagPlusStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    const [openAddBlogModal, setOpenAddBlogModal] = useState(false);

    return (
        <div className="bg-[#151212] w-full min-h-min p-6">
            <div className="flex items-center justify-around  ">
                <div className="flex-col space-y-3">
                    <div className="text-white flex flex-col self-start mb-[5%]">
                        <label className="text-[40px] font-bold ">
                            Outstanding Articles
                        </label>
                        <p className="text-white text-[15px] font-thin italic">
                            Collection of articles sharing experiences in
                            bodybuilding
                        </p>
                        {isPT && (
                            <div className="flex w-full justify-end">
                                <button
                                    type="reset"
                                    className="bg-red-700 text-xl text-white h-[60px] w-[150px] hover:border-3 float-right font-semibold  px-2 hover:opacity-80"
                                    onClick={() =>
                                        setOpenAddBlogModal((state) => !state)
                                    }
                                >
                                    Add Post
                                </button>
                            </div>
                        )}
                    </div>

                    {listBlog?.map((postItem, index) => (
                        <Post postItem={postItem} key={index} />
                    ))}
                    <div class="flex items-center gap-8 justify-center mt-[5%]">
                        <button
                            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            disabled={page === 0}
                            onClick={() => setPage((state) => state - 1)}
                        >
                            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    class="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-gray-200">
                            Page <strong class="text-white">{page + 1}</strong>{' '}
                            of <strong class="text-white">4</strong>
                        </p>
                        <button
                            class="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => setPage((state) => state + 1)}
                            disabled={page === 3}
                        >
                            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    class="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="w-[350px] bg-white h-screen flex self-start mt-[11%]  rounded-lg">
                    <div>
                        <div className="flex flex-col space-y-3 p-5">
                            <div style={{}} className="space-y-2">
                                {tags?.map((tag) => {
                                    return (
                                        <span
                                            key={tag}
                                            style={{
                                                display: 'inline-block',
                                            }}
                                        >
                                            <Tag
                                                closable
                                                onClose={(e) => {
                                                    e.preventDefault();
                                                    handleClose(tag);
                                                }}
                                                className="text-sm flex px-3 py-1 rounded-full border-0 bg-gray-300"
                                            >
                                                {tag}
                                            </Tag>
                                        </span>
                                    );
                                })}
                            </div>
                            {/* handle input event */}
                            {inputVisible ? (
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    size="small"
                                    className="w-[78px]"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                    }}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            ) : (
                                <Tag
                                    onClick={showInput}
                                    style={tagPlusStyle}
                                    className="w-[78px]"
                                >
                                    <PlusOutlined /> New Tag
                                </Tag>
                            )}
                        </div>
                        <h1 className="font-bold text-3xl leading-4 ml-[20px]">
                            Top Articles
                        </h1>
                        <div className="w-full space-y-1 mt-[20px] pl-3">
                            {TopArticles?.map((article, index) => {
                                return (
                                    <TopRank
                                        key={index}
                                        post={article}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                        <div className="w-full flex justify-center items-center mt-[30px]">
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100069291070202&tabs=time&width=320&height=200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                className="w-[320px] h-[200px] ml-[15px]"
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            {openAddBlogModal && (
                <AddPost setOpenAddBlogModal={setOpenAddBlogModal} />
            )}
        </div>
    );
};

export default Blog;
