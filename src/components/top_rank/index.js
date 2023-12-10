import React from 'react';
import './top_rank.css';
import { Link } from 'react-router-dom';

const TopRank = ({ post, index, exercise, type }) => {
    console.log(exercise);
    return (
        <div>
            {type === 'exercise' ? (
                <Link to={`/exercises/${exercise?.id}`}>
                    <div className="flex p-2 justify-start space-x-4 h-[70px] w-[320px]">
                        <h1 className="text-4xl font-bold">{index + 1}</h1>
                        <div className="flex flex-col  ">
                            <h2 className="text-lg font-semibold w-[280px] overflow-hidden whitespace-nowrap overflow-ellipsis ">
                                {exercise?.name}
                            </h2>
                            <label className="text-gray-600  text-sm">
                                200 views · {exercise?.category}
                            </label>
                        </div>
                    </div>
                </Link>
            ) : (
                <Link to={`/posts/${post.id}`}>
                    <div className="flex p-2 justify-start space-x-4 h-[70px] w-[320px]">
                        <h1 className="text-4xl font-bold">{index + 1}</h1>
                        <div className="flex flex-col  ">
                            <h2 className="text-lg font-semibold w-[280px] overflow-hidden whitespace-nowrap overflow-ellipsis ">
                                {post.title}
                            </h2>
                            <label className="text-gray-600  text-sm">
                                {post.views} views · {post.createdDate}
                            </label>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default TopRank;
