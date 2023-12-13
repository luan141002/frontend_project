import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { AiFillHeart } from 'react-icons/ai';

const WaitingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex flex-col max-w-lg mx-auto my-4 bg-gray-200 p-8 items-center space-y-5">
                    <label className="text-[20px] font-bold ">
                        <strong className="text-red-800">Final step</strong>:
                        Thank you for signing up for our workout program, please
                        wait a few days, our trainer will set up a workout
                        program for you right away. &#10084;&#10084;&#10084;
                        {/* <div className="flex space-x-2">
                            <AiFillHeart />
                            <AiFillHeart />
                            <AiFillHeart />
                        </div> */}
                    </label>
                    <button
                        className="bg-[#C30C0C] mt-4 w-[200px] h-[60px] text-[15px] px-3 text-center flex justify-center font-semibold items-center text-white  text-medium  hover:border hover:border-white"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        <span className="text-xl rotate-180 mr-4">
                            <HiOutlineLogout />
                        </span>
                        Back to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WaitingPage;
