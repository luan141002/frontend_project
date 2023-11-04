import React from 'react';
import { Divider, Space, Tag } from 'antd';
import pic_4 from '../../public/gym_picture_4.jpg';

const Post = ({ postItem }) => {
    return (
        <div className='w-[800px]  bg-white rounded-md p-[20px] space-y-4'>
            <div className='flex w-full space-x-4'>
                <img
                    className='w-[256px] h-[160px]'
                    src={postItem.postImg}
                    alt='blog avatar'
                />
                <div className='space-y-2'>
                    <label htmlFor='' className='text-xl'>
                        <strong>{postItem.title}</strong>
                    </label>
                    <p className='text-sm  text-gray-500'>
                        {postItem.description}
                    </p>

                    <div className='flex items-center space-x-2'>
                        <img
                            className='w-[16px] h-[16px] rounded-full '
                            src={postItem.user.userImg}
                            alt='blog avatar'
                        />
                        <label htmlFor='' className='text-xs'>
                            {postItem.user.userName}
                        </label>
                    </div>

                    <p className='text-xs'>
                        {postItem.postTime} · {postItem.postTime}
                    </p>

                    <div className='flex '>
                        <Space size={[0, 8]} wrap>
                            <Tag color='success'>success</Tag>
                            <Tag color='processing'>processing</Tag>
                            <Tag color='error'>error</Tag>
                            <Tag color='warning'>warning</Tag>
                            <Tag color='default'>default</Tag>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
