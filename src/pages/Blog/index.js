import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import { Input, Tag, theme } from 'antd';
import PostService from '../../services/PostService.js';

import TopRank from '../../components/top_rank';
import Post from '../../components/post';

const Blog = () => {
    const [listBlog, setListBlog] = useState();
    const [TopArticles, setTopArticles] = useState();
    const [tags, setTags] = useState([]);

    const loadPage = async () => {
        const posts = await PostService.getPosts({ page: 0, limit: 10 });
        const topArticleList = await PostService.getTopPosts();
        const listTags = await PostService.getTags();

        setListBlog(posts);
        setTopArticles(topArticleList.slice(0, 5));
        setTags(listTags.map((tag) => tag.name));
    };

    useEffect(() => {
        loadPage();
    }, []);

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
    return (
        <div className="bg-[#151212] w-full min-h-min ">
            <div className="flex  items-center justify-around  ">
                <div className="flex-col space-y-3">
                    <div className="text-white flex flex-col self-start mb-[10%]">
                        <label className="text-[40px] font-bold ">
                            Outstanding Articles
                        </label>
                        <p className="text-white text-[15px] font-thin italic">
                            Collection of articles sharing experiences in
                            bodybuilding
                        </p>
                    </div>
                    {listBlog?.map((postItem, index) => (
                        <Post postItem={postItem} key={index} />
                    ))}
                </div>
                <div className="w-[350px] bg-white h-screen flex self-start mt-[11%]  rounded-lg">
                    <div>
                        <div className="flex flex-col space-y-3 p-5">
                            <div style={{}} className="space-y-2">
                                {tags.map((tag) => {
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
        </div>
    );
};

export default Blog;
