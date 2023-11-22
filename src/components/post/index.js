import React from 'react';
import { Divider, Space, Tag } from 'antd';
import pic_4 from '../../public/gym_picture_4.jpg';
import { Link } from 'react-router-dom';

const Post = ({ postItem }) => {
    return (
        <div className="w-[800px]  bg-white rounded-md p-[20px] space-y-4">
            <Link to="/">
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
                        <p className="text-sm  text-gray-500">
                            {postItem.content}
                        </p>

                        <div className="flex items-center space-x-2">
                            <img
                                className="w-[16px] h-[16px] rounded-full "
                                src="data:image/jpeg;base64,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"
                                alt="blog avatar"
                            />
                            <label htmlFor="" className="text-xs">
                                User
                            </label>
                        </div>

                        <p className="text-xs">
                            {postItem.createdDate} · {postItem.createdDate}
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
