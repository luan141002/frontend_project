import React from 'react';

const TopRank = ({ post }) => {
    return (
        <div className='flex p-2 justify-center space-x-4 h-[70px] w-[320px]'>
            <h1 className='text-4xl font-bold'>{post.rank}</h1>
            <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>{post.title}</h2>
                <label className='text-gray-600 uppercase text-sm'>
                    {post.userName} · {post.postDate}
                </label>
            </div>
        </div>
    );
};

export default TopRank;
