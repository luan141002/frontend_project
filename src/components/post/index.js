import React from 'react';
import { Divider, Space, Tag } from 'antd';
import pic_4 from '../../public/gym_picture_4.jpg';
import { Link } from 'react-router-dom';

const Post = ({ postItem }) => {
    return (
        <div className="w-[800px]  bg-white rounded-md p-[20px] space-y-4">
            <Link to={`/posts/${postItem.id}`}>
                <div className="flex w-full space-x-4">
                    <img
                        className="w-[256px] h-[160px]"
                        src={postItem.image}
                        alt="blog avatar"
                    />
                    <div className="space-y-2">
                        <label htmlFor="" className="text-xl">
                            <strong>{postItem.title}</strong>
                        </label>
                        {/* <p className="text-sm  text-gray-500">
                            {postItem.content}
                        </p> */}

                        <div className="flex items-center space-x-2">
                            <img
                                className="w-[16px] h-[16px] rounded-full "
                                src={postItem.image}
                                alt="blog avatar"
                            />
                            <label htmlFor="" className="text-xs">
                                Author
                            </label>
                        </div>

                        <p className="text-xs">
                            {postItem.views} views · {postItem.createdDate}
                        </p>

                        <div className="flex ">
                            <Space size={[0, 8]} wrap>
                                {postItem.tags.map((tag, index) => {
                                    return (
                                        <Tag color="error" key={index}>
                                            {tag}
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
                </div>
            </Link>
        </div>
    );
};

export default Post;
