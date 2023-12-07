import React from 'react';

const TopRank = ({ post, index }) => {
    return (
        <div className="flex p-2 justify-start space-x-4 h-[70px] w-[320px]">
            <h1 className="text-4xl font-bold">{index + 1}</h1>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <label className="text-gray-600  text-sm">
                    {post.views} views · {post.createdDate}
                </label>
            </div>
        </div>
    );
};

export default TopRank;
