import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const ExerciseGuide = ({ exercise }) => {
    console.log(exercise);
    return (
        <div className="w-[1000px] p-5 rounded-md">
            {/* guide header */}
            <div className="w-full text-white h-[60px] p-5 flex justify-between items-center bg-[#151212]">
                <h3 className="uppercase text-lg">{exercise?.name}</h3>
                <button className="text-white">
                    <FontAwesomeIcon icon={faShare} />
                </button>
            </div>
            {/* Guide Video */}
            <div className="w-full flex ">
                {exercise?.videoUrls?.map((video, index) => {
                    return (
                        <iframe
                            className="w-[50%] h-[280px]"
                            key={index}
                            src={`${video}`}
                            allow="autoplay"
                        ></iframe>
                    );
                })}
            </div>
            {/* Steps */}
            <h1 className="text-[28px] font-bold uppercase tracking-wide my-4">
                Exercise Instructions
            </h1>
            <div className="w-full px-3">
                <ul class="flex-col items-center w-full space-y-3   ">
                    {exercise?.steps?.map((step, index) => {
                        return (
                            <li
                                class="flex w-full items-center  dark:text-blue-500 space-x-2.5"
                                key={index}
                            >
                                <span class="flex items-center justify-center w-9 h-9  bg-white border font-semibold   text-red-700 rounded-full shrink-0 dark:border-blue-500">
                                    {step.serial}
                                </span>
                                <span className=" w-full text-gray-900 rounded-md  p-2">
                                    <h3 class="font-medium text-lg leading-tight">
                                        {step.content}
                                    </h3>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/* Tips */}
            <h1 className="text-[28px] font-bold uppercase tracking-wide my-4">
                Exercise Tips
            </h1>
            <div className="w-full px-3">
                <ul class="flex-col items-center w-full space-y-3   ">
                    <li class="flex w-full items-center  dark:text-blue-500 space-x-2.5">
                        <span class="flex items-center pt-[3px] justify-center font-bold text-lg w-9 h-9 border bg-white border-red-600 text-red-600 rounded-full shrink-0 dark:border-blue-500">
                            <FontAwesomeIcon icon={faLightbulb} />
                        </span>
                        <span className=" w-full text-gray-900 rounded-md  p-2">
                            <h3 class="font-medium text-lg leading-tight">
                                {exercise?.tips}
                            </h3>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ExerciseGuide;
