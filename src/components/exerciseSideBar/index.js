import React, { useState } from 'react';
import MaleSide from '../maleSide';
import FemaleSide from '../femaleSide';

const ExerciseSideBar = () => {
    const exerciseData = {
        'Target Muscle Group': 'Chest',
        'Exercise Type': 'Strength',
        'Equipment Required': 'Dumbbell',
        Mechanics: 'Compound',
        'Force Type': 'Push (Bilateral)',
        'Experience Level': 'Beginner',
        'Secondary Muscles': 'Shoulders, Triceps',
    };
    const [open, setOpen] = useState(true);
    return (
        <div className='w-[380px] bg-white  flex-col self-start space-y-5 justify-center items-center  mt-[20px] rounded-lg min-h-min'>
            <div className='w-full h-[40px] flex items-center justify-between bg-[#151212]'>
                <div className='flex items-center space-x-3 p-3'>
                    <span class=' text-sm font-medium text-white dark:text-gray-300'>
                        Male
                    </span>
                    <label class='relative inline-flex items-center cursor-pointer'>
                        <input
                            type='checkbox'
                            value={open}
                            class='sr-only peer'
                            onClick={() => setOpen(!open)}
                        />
                        <div class="w-11 h-6 bg-blue-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-300"></div>
                    </label>
                    <span class=' text-sm font-medium text-white dark:text-gray-300'>
                        Female
                    </span>
                </div>
            </div>
            <div className='w-[85%]  flex justify-center mx-auto'>
                {open ? <MaleSide /> : <FemaleSide />}
            </div>
            <hr class='border-t-1 border-gray-300 my-2'></hr>
            <div className='w-full p-2 space-y-3 pb-7 mt-5'>
                <div className=''>
                    <h1 className='text-[20px] font-bold uppercase tracking-wide mb-3'>
                        Exercise overview
                    </h1>
                    <p className=''>
                        The weighted crunch is a variation of the crunch and an
                        exercise used to build the abdominal muscles.
                        <br />
                        Adding weigh is a common form of progression used to
                        make bodyweight exercises, such as the crunch, more
                        challenging. Doing so allows for the lifter to progress,
                        adapt, and build more muscle.
                    </p>
                </div>

                <div className='w-full pt-5'>
                    <h1 className='text-[20px] font-bold uppercase tracking-wide mb-2 '>
                        Exercise Profile
                    </h1>
                    <table className='w-full border-collapse p-3'>
                        <tbody>
                            {Object.entries(exerciseData).map(
                                ([key, value]) => (
                                    <tr key={key} className='py-4'>
                                        <td className='border-b px-4 py-2 font-normal'>
                                            {key}
                                        </td>
                                        <td className='border-b px-4 py-2 font-light'>
                                            {value}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExerciseSideBar;
