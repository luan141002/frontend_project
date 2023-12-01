import React from 'react';

const UserCard = () => {
    return (
        <div class="max-w-md rounded overflow-hidden shadow-md bg-gray-300 p-3">
            <div className="flex justify-around text-orange-800">
                <div class="font-semibold text-xl text-center mb-2 w-[30%] bg-gray-400 rounded-md">
                    Trainer
                </div>
                <div class="font-semibold text-xl text-center mb-2 w-[50%] bg-gray-400 rounded-md">
                    Info
                </div>
            </div>
            <div className="flex justify-around items-start">
                <div className="flex flex-col w-[40%]">
                    <img
                        class="w-full h-[165px]"
                        src="https://toplist.vn/images/800px/roronoa-zoro-one-piece-1175911.jpg"
                        alt="Sunset in the mountains"
                    />
                </div>
                <div class="px-6 py-4 flex flex-col self-start">
                    <div>
                        <label className="text-gray-800  text-base">
                            <strong>Name: </strong>
                            Phan Thanh Luan
                        </label>
                        <br />
                        <label className="text-gray-800  text-base">
                            <strong>Experiences years: </strong>3 years
                        </label>
                        <br />
                        <label className="text-gray-800  text-base">
                            <strong>Phone Number: </strong> 09341312343
                        </label>
                        <br />
                        <label className="text-gray-800  text-base">
                            <strong>Email: </strong> Luanphan@gmail.com
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-[20px] space-y-1">
                <label className="text-gray-600 font-bold text-lg ">
                    Bio :
                </label>
                <p class="text-gray-700 text-base w-full bg-white h-[100px] rounded-md p-2">
                    Best trainer of the year
                </p>
            </div>

            <div className="flex w-full justify-center space-x-3 mt-[30px]">
                <button
                    type="submit"
                    className="bg-green-700 box-border text-white h-[40px] w-[120px] hover:border-3  hover:hover:opacity-80"
                >
                    Assign
                </button>
                <button
                    type="reset"
                    className="bg-gray-700 text-white h-[40px] w-[120px] hover:border-3  hover:opacity-80"
                >
                    Trainer Info
                </button>
            </div>
        </div>
    );
};

export default UserCard;
