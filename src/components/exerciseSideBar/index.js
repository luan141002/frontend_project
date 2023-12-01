import React, { useState } from 'react';
import MaleSide from '../maleSide';
import FemaleSide from '../femaleSide';

const ExerciseSideBar = ({ exercise }) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="w-[380px] bg-white  flex-col self-start space-y-5 justify-center items-center  mt-[20px] rounded-lg min-h-min">
            <div className="w-full h-[40px] flex items-center justify-between bg-[#151212]">
                <div className="flex items-center space-x-3 p-3">
                    <span class=" text-sm font-medium text-white dark:text-gray-300">
                        Male
                    </span>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value={open}
                            class="sr-only peer"
                            onClick={() => setOpen(!open)}
                        />
                        <div class="w-11 h-6 bg-blue-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-300"></div>
                    </label>
                    <span class=" text-sm font-medium text-white dark:text-gray-300">
                        Female
                    </span>
                </div>
            </div>
            <div className="w-[85%]  flex justify-center mx-auto">
                {open ? <MaleSide /> : <FemaleSide />}
            </div>
            <hr class="border-t-1 border-gray-300 my-2"></hr>
            <div className="w-full p-2 space-y-3 pb-7 mt-5">
                <div className="">
                    <h1 className="text-[20px] font-bold uppercase tracking-wide mb-3">
                        Exercise overview
                    </h1>
                    <p className="">{exercise?.description}</p>
                </div>

                <div className="w-full pt-5">
                    <h1 className="text-[20px] font-bold uppercase tracking-wide mb-2 ">
                        Exercise Profile
                    </h1>
                    <table className="w-full border-collapse p-3">
                        <tbody>
                            <tr className="py-4">
                                <td className="border-b px-4 py-2 font-normal">
                                    Target Muscle Group:
                                </td>
                                <td className="border-b px-4 py-2 font-light">
                                    Chest
                                </td>
                            </tr>
                            <tr className="py-4">
                                <td className="border-b px-4 py-2 font-normal">
                                    Exercise Type:
                                </td>
                                <td className="border-b px-4 py-2 font-light">
                                    {exercise?.type}
                                </td>
                            </tr>
                            <tr className="py-4">
                                <td className="border-b px-4 py-2 font-normal">
                                    Equipment Required:
                                </td>
                                <td className="border-b px-4 py-2 font-light">
                                    {exercise?.equipment}
                                </td>
                            </tr>

                            <tr className="py-4">
                                <td className="border-b px-4 py-2 font-normal">
                                    Force Type:
                                </td>
                                <td className="border-b px-4 py-2 font-light">
                                    {exercise?.forceType}
                                </td>
                            </tr>
                            <tr className="py-4">
                                <td className="border-b px-4 py-2 font-normal">
                                    Experience Level:
                                </td>
                                <td className="border-b px-4 py-2 font-light">
                                    {exercise?.experienceLevel}
                                </td>
                            </tr>
                            <tr className="py-4">
                                <td className="border-b px-4 py-2 font-normal">
                                    Secondary Muscles:
                                </td>
                                <td className="border-b px-4 py-2 font-light">
                                    {exercise?.secondaryMuscles}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExerciseSideBar;
