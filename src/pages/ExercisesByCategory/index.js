import React from 'react';
import ExerciseService from '../../services/ExerciseService.js';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import data from '../../components/Footer/data.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ExerciseCard from '../../components/ExcerciseCard';

const ExercisesByCategoryName = () => {
    const { categoryName } = useParams();
    console.log(categoryName);
    const [exercises, setExercises] = useState();

    const loadPage = async () => {
        try {
            const exercises = await ExerciseService.getExercisesByCategoryName(
                categoryName,
            );

            setExercises(exercises);
            console.log(exercises);
        } catch (err) {
            toast.error('Load exercises failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className="w-full flex flex-col items-center p-6 mb-[10%]">
            <div className="text-white flex flex-col self-start mb-[5%]">
                <label className="text-[40px] font-bold ">{categoryName}</label>
                <p className="text-white text-[15px] font-thin italic">
                    Collection {categoryName} training
                </p>
            </div>
            <div className="grid md:grid-cols-4 gap-3">
                {exercises?.map((exercise, index) => (
                    <ExerciseCard exercise={exercise} key={index} />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ExercisesByCategoryName;
