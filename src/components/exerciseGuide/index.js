import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const ExerciseGuide = ({ GuideInfo }) => {
    const liSteps = [
        {
            step: '1',
            instruction:
                'Lay supine in a relaxed position with your knees bent.',
        },
        {
            step: '2',
            instruction:
                'Hold a weight plate directly over your chest and press it to extension.',
        },
        {
            step: '3',
            instruction:
                'Raise your knees to 90 degrees, at which point they will be perpendicular to the floor.',
        },
        {
            step: '4',
            instruction:
                'Exhale as you reach towards your toes with the weight plate.',
        },
        {
            step: '5',
            instruction:
                'Once your abs are fully contracted and your upper back is off the floor, slowly lower yourself back to the starting position.',
        },
        {
            step: '6',
            instruction: 'Complete for the assigned number of repetitions.',
        },
    ];
    const liTips = [
        {
            instruction:
                'Exhale hard like you’re blowing out candles on a cake and hold the contraction for a second to improve mind muscle connection.',
        },
        {
            instruction:
                'If your lower back bothers you during this exercise, choose more anti extension and anti rotation based movements.',
        },
        {
            instruction:
                'Avoid putting the hands behind the head as this can lead to excess strain upon the neck.',
        },
    ];
    return (
        <div className='w-[1000px] p-5 rounded-md'>
            {/* guide header */}
            <div className='w-full text-white h-[60px] p-5 flex justify-between items-center bg-[#151212]'>
                <h3 className='uppercase text-lg'>GuideInfo.title</h3>
                <button className='text-white'>
                    <FontAwesomeIcon icon={faShare} />
                </button>
            </div>
            {/* Guide Video */}
            <div>
                <iframe
                    className='w-full h-[500px]'
                    src='https://www.youtube.com/embed/5Tz66MJvuck?list=RD5Tz66MJvuck'></iframe>
            </div>
            {/* Steps */}
            <h1 className='text-[28px] font-bold uppercase tracking-wide my-4'>
                Exercise Instructions
            </h1>
            <div className='w-full px-3'>
                <ul class='flex-col items-center w-full space-y-3   '>
                    {liSteps.map((step, index) => {
                        return (
                            <li
                                class='flex w-full items-center  dark:text-blue-500 space-x-2.5'
                                key={index}>
                                <span class='flex items-center justify-center w-9 h-9  bg-white border font-semibold   text-red-700 rounded-full shrink-0 dark:border-blue-500'>
                                    {step.step}
                                </span>
                                <span className=' w-full text-gray-900 rounded-md  p-2'>
                                    <h3 class='font-medium text-lg leading-tight'>
                                        {step.instruction}
                                    </h3>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/* Tips */}
            <h1 className='text-[28px] font-bold uppercase tracking-wide my-4'>
                Exercise Tips
            </h1>
            <div className='w-full px-3'>
                <ul class='flex-col items-center w-full space-y-3   '>
                    {liTips.map((tip, index) => {
                        return (
                            <li
                                class='flex w-full items-center  dark:text-blue-500 space-x-2.5'
                                key={index}>
                                <span class='flex items-center pt-[3px] justify-center font-bold text-lg w-9 h-9 border bg-white border-red-600 text-red-600 rounded-full shrink-0 dark:border-blue-500'>
                                    <FontAwesomeIcon icon={faLightbulb} />
                                </span>
                                <span className=' w-full text-gray-900 rounded-md  p-2'>
                                    <h3 class='font-medium text-lg leading-tight'>
                                        {tip.instruction}
                                    </h3>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ExerciseGuide;
