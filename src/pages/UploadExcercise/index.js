import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CrossIcon from '../Schedule/assets/icon-cross.svg';

const UploadExercise = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const onSubmit = (data) => {
        // Xử lý dữ liệu sau khi submit form
        console.log(data);
    };
    const [newColumns, setNewColumns] = useState([
        {
            step: 1,
            name: 'Push up',
            task: [],
            id: uuidv4(),
        },
        {
            step: 2,
            name: 'pull up',
            task: [],
            id: uuidv4(),
        },
    ]);
    // handle column input
    const onNewColumnInputChange = (id, newValue) => {
        setNewColumns((prevState) => {
            const newState = [...prevState];
            const column = newState.find((col) => col.id === id);
            column.name = newValue;
            return newState;
        });
    };
    const onDelete = (id) => {
        setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
    };
    return (
        <div className="w-full flex justify-center h-screen box-border bg-[#151212]">
            <div className="w-[50%] bg-white p-3 mt-8 ">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full mx-auto  p-4 "
                >
                    <div className="text-gray-700 flex flex-col self-start mb-[5%] mt-4">
                        <label className="text-[30px] font-bold ">
                            Upload Exercises
                        </label>
                        <p className="text-gray-700 text-[15px] font-thin italic">
                            upload Exercise
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-[48%]">
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="youtubeFront"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Link Frontside Video
                                </label>
                                <input
                                    type="text"
                                    id="youtubeFront"
                                    name="youtubeFront"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('youtubeFront', {
                                        required: 'This field is required',
                                    })}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="youtubeBack"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Link Backside Video
                                </label>
                                <input
                                    type="text"
                                    id="youtubeBack"
                                    name="youtubeBack"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('youtubeBack', {
                                        required: 'This field is required',
                                    })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600 ">
                                    Steps
                                </label>
                                {newColumns.map((column, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center w-full"
                                    >
                                        <div>
                                            <label className="block text-sm font-normal text-gray-600 italic">
                                                Step {index + 1}:
                                            </label>
                                            <input
                                                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border
                                    border-gray-600 outline-none focus:outline-[#735fc7]"
                                                value={column.name}
                                                onChange={(e) => {
                                                    onNewColumnInputChange(
                                                        column.id,
                                                        e.target.value,
                                                    );
                                                }}
                                                type="text"
                                            />
                                        </div>
                                        <img
                                            src={CrossIcon}
                                            className="cursor-pointer m-4"
                                            onClick={() => {
                                                onDelete(column.id);
                                            }}
                                        />
                                    </div>
                                ))}
                                <button
                                    className="w-[80%] items-center hover:opacity-75 text-white bg-red-700 mt-2 py-2 "
                                    onClick={() => {
                                        setNewColumns((state, index) => [
                                            ...state,
                                            {
                                                step: index + 1,
                                                name: '',
                                                task: [],
                                                id: uuidv4(),
                                            },
                                        ]);
                                    }}
                                    type="button"
                                >
                                    + Add new step
                                </button>
                            </div>
                        </div>

                        <div className="w-[48%]">
                            <div className="mb-4">
                                <label
                                    htmlFor="exerciseType"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Exercise Type
                                </label>
                                <select
                                    id="exerciseType"
                                    name="exerciseType"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('exerciseType', {
                                        required: 'This field is required',
                                    })}
                                >
                                    <option value="">
                                        Select Exercise Type
                                    </option>
                                    <option value="cardio">Cardio</option>
                                    <option value="strength">Strength</option>
                                    {/* Thêm các option khác tương tự */}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="targetMuscleGroup"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Target Muscle Group
                                </label>
                                <input
                                    type="text"
                                    id="targetMuscleGroup"
                                    name="targetMuscleGroup"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('targetMuscleGroup', {
                                        required: 'This field is required',
                                    })}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="equipmentRequired"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Equipment Required
                                </label>
                                <input
                                    type="text"
                                    id="equipmentRequired"
                                    name="equipmentRequired"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('equipmentRequired', {
                                        required: 'This field is required',
                                    })}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="mechanics"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Mechanics
                                </label>
                                <input
                                    type="text"
                                    id="mechanics"
                                    name="mechanics"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('mechanics', {
                                        required: 'This field is required',
                                    })}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="forceType"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Force Type
                                </label>
                                <input
                                    type="text"
                                    id="forceType"
                                    name="forceType"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('forceType', {
                                        required: 'This field is required',
                                    })}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="experienceLevel"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Experience Level
                                </label>
                                <select
                                    id="experienceLevel"
                                    name="experienceLevel"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('experienceLevel', {
                                        required: 'This field is required',
                                    })}
                                >
                                    <option value="">
                                        Select Experience Level
                                    </option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">
                                        Intermediate
                                    </option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="secondaryMuscles"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Secondary Muscles
                                </label>
                                <input
                                    type="text"
                                    id="secondaryMuscles"
                                    name="secondaryMuscles"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('secondaryMuscles')}
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="exerciseOverview"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Exercise Overview
                                </label>
                                <textarea
                                    type="text"
                                    id="exerciseOverview"
                                    name="exerciseOverviews"
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    {...register('exerciseOverview')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-center space-x-3 mt-[100px]">
                        <button
                            type="submit"
                            className="bg-green-700 box-border text-white h-[40px] w-[120px] hover:border-3  hover:hover:opacity-80"
                        >
                            Submit
                        </button>
                        <button
                            type="reset"
                            className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  hover:opacity-80"
                        >
                            reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadExercise;
