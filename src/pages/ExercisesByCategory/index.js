import React from 'react';
import ExerciseService from '../../services/ExerciseService.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ExerciseCard from '../../components/ExcerciseCard';

const ExercisesByCategoryName = () => {
    const { categoryName } = useParams();
    const [exercises, setExercises] = useState();

    const loadPage = async () => {
        const exercises = await ExerciseService.getExercisesByCategoryName(
            categoryName,
        );
        setExercises(exercises);
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className="w-full flex flex-col items-center p-3">
            <div className="text-white flex flex-col self-start mb-[5%]">
                <label className="text-[40px] font-bold ">
                    {categoryName} Exercises
                </label>
                <p className="text-white text-[15px] font-thin italic">
                    Collection of Exercise with {categoryName} training
                </p>
            </div>
            <div className="grid md:grid-cols-4 space-x-4">
                {exercises?.map((exercise, index) => (
                    <ExerciseCard exercise={exercise} key={index} />
                ))}
            </div>
        </div>
    );
};

export default ExercisesByCategoryName;
