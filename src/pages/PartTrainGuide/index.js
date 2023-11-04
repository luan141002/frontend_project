import React from 'react';
import ExerciseGuide from '../../components/exerciseGuide';
import ExerciseSideBar from '../../components/exerciseSideBar';

const PartTrainGuide = () => {
    return (
        <div className='bg-gray-300 flex-col w-full min-h-min'>
            <div className='flex justify-around '>
                <ExerciseGuide />
                <ExerciseSideBar />
            </div>
        </div>
    );
};

export default PartTrainGuide;
