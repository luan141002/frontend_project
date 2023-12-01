import React, { useState, useEffect } from 'react';
import ExerciseGuide from '../../components/exerciseGuide';
import ExerciseSideBar from '../../components/exerciseSideBar';
import { useParams } from 'react-router-dom';
import ExerciseService from '../../services/ExerciseService';
//import data from '../../components/data/data.js';

const PartTrainGuide = () => {
    const { exerciseId } = useParams();
    const [exercise, setExercise] = useState();
    const loadPage = async () => {
        const exercise = await ExerciseService.getExercise(exerciseId);
        console.log(exercise);
        setExercise(exercise);
    };

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div className="bg-gray-300 flex-col w-full min-h-min">
            <div className="flex justify-around ">
                <ExerciseGuide exercise={exercise} />
                <ExerciseSideBar exercise={exercise} />
            </div>
        </div>
    );
};

export default PartTrainGuide;
