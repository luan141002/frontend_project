import React from 'react';
import pic_4 from '../../public/gym_picture_4.jpg';

const Post = () => {
    return (
        <div className='w-[800px] h-[275px] '>
            <div className='flex'>
                <img
                    className='w-[20px] h-[20px] rounded-full'
                    src={pic_4}
                    alt='blog avatar'
                />
                <label htmlFor=''>Author name</label>
            </div>
            <div className='flex w-full'>
                <img
                    className='w-[256px] h-[190px]'
                    src={pic_4}
                    alt='blog avatar'
                />
                <div>
                    <label htmlFor=''>
                        <strong>Title for blog</strong>
                    </label>
                    <p>subcription</p>
                    <div className='flex '>
                        <span>tag</span>
                        <span>tag</span>
                        <span>tag</span>
                        <p>time</p>
                        <p>estimate time</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
