import React from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import MemberService from '../../services/MemberService';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ PT }) => {
    const account = useSelector((state) => state.account);
    const navigate = useNavigate();
    console.log(account);
    const onAssign = async () => {
        const response = await MemberService.assignPT(
            +account.memberId,
            +PT.id,
        );
        if (response.status === 200) navigate('/target');
        else {
        }
    };

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
                        src={PT.ptImage}
                        alt="Sunset in the mountains"
                    />
                </div>
                <div class="px-6 py-4 flex flex-col self-start">
                    <div>
                        <label className="text-gray-800  text-base">
                            <strong>Name: </strong>
                            {PT.lastName + ' ' + PT.firstName}
                        </label>
                        <br />
                        <label className="text-gray-800  text-base">
                            <strong>Experiences Level: </strong>
                            {PT.ptLevel}
                        </label>
                        <br />
                        <label className="text-gray-800  text-base">
                            <strong>Phone Number: </strong> 09341312343
                        </label>
                        <br />
                        <label className="text-gray-800  text-base">
                            <strong>Email: </strong> {PT.user.email}
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-[20px] space-y-1">
                <label className="text-gray-600 font-bold text-lg ">
                    Achievement :
                </label>
                <p class="text-gray-700 text-base w-full bg-white h-[100px] rounded-md p-2">
                    {PT.achievement}
                </p>
            </div>

            <div className="flex w-full justify-center space-x-3 mt-[30px]">
                <button
                    type="button"
                    className="bg-green-700 box-border text-white h-[40px] w-[120px] hover:border-3  hover:hover:opacity-80"
                    onClick={async () => onAssign()}
                >
                    Assign
                </button>
                <button
                    type="button"
                    className="bg-gray-700 text-white h-[40px] w-[120px] hover:border-3  hover:opacity-80"
                >
                    Trainer Info
                </button>
            </div>
        </div>
    );
};

export default UserCard;
