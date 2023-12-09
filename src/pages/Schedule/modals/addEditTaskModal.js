import React, { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import crossIcon from '../assets/icon-cross.svg';
import CheckIcon from '../assets/confirm-icon.svg';
import chevronDown from '../assets/icon-chevron-down.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import boardSlice from '../../../redux/boardsSlice.js';
import ProgramService from '../../../services/ProgramService.js';
import MemberService from '../../../services/MemberService.js';
import ExerciseService from '../../../services/ExerciseService.js';

const AddEditTaskModal = ({
    type,
    setOpenAddEditTask,
    setOpenEditTask,
    taskIndex,
    colIndex,
    taskId,
    prevColIndex = 0,
    setReloadPage,
    isPT,
    boards,
    memberId,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm();

    const [workoutSession, setWorkoutSession] = useState();
    const [reloadModal, setReloadModal] = useState(0);

    useEffect(() => {
        loadEditPage();
    }, [reloadModal]);

    const dispatch = useDispatch();
    const [exercises, setExercises] = useState();
    const [description, setDescription] = useState('');
    // get board list data
    const board = boards?.find((board) => board.isActive);
    const columns = board?.columns;
    const [programId, setProgramId] = useState(board?.id);
    const [subtasks, setSubtasks] = useState([]);

    // FUNCTIONS
    const loadEditPage = async () => {
        if (isPT) {
            const board = boards?.find((board) => board.isActive);
            const workoutSession = board?.columns[colIndex]?.tasks?.find(
                (task) => task.id === taskId,
            );
            setWorkoutSession(workoutSession);

            setSubtasks(workoutSession?.subtasks);
        }
        const exercises = await ExerciseService.getExercises();
        setExercises(exercises);
    };
    const onWorkoutSessionDelete = async (id) => {
        await ProgramService.deleteWorkoutSessions(workoutSession.id);
        setOpenEditTask(false);
        setReloadPage((state) => state + 1);
    };

    const onDelete = async (id) => {
        setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
        await ProgramService.deleteSubtask(workoutSession.id, id);
        setReloadModal((state) => state + 1);
        setReloadPage((state) => state + 1);
    };

    const onCreateSubtask = async (id) => {
        console.log(id);
        await ProgramService.addSubtask(workoutSession?.id, id);
        setReloadModal((state) => state + 1);
        setReloadPage((state) => state + 1);
    };

    // handle column input
    const onChange = (id, newValue) => {
        setSubtasks((prevState) => {
            const newState = [...prevState];
            const subtask = newState[id];
            console.log(newState);
            console.log(subtask);
            if (subtask === null) {
                subtask.id = newValue;
                newState.push(id);
            } else {
                subtask.id = newValue;
            }
            return newState;
        });
    };

    const onSubmit = async (data) => {
        if (type === 'add') {
            data['subtasks'] = subtasks;
            console.log(data);
            await ProgramService.addWorkoutSessions(programId, data);
            console.log(data);
            setOpenAddEditTask(false);
            setReloadPage((state) => state + 1);
        } else {
            data['subtasks'] = subtasks;
            for (const [key, value] of Object.entries(data)) {
                if (value === '') {
                    data[`${key}`] = workoutSession[`${key}`];
                }
            }
            console.log(data);
            await ProgramService.editWorkoutSessions(taskId, data);

            setOpenEditTask(false);
            setReloadPage((state) => state + 1);
        }
    };
    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                if (isPT) {
                    setOpenEditTask(false);
                    setReloadPage((state) => state + 1);
                } else {
                    setOpenAddEditTask(false);
                    setReloadPage((state) => state + 1);
                }
            }}
            className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50
        justify-center items-center flex bg-[#00000080]"
        >
            {/* Modal Section */}
            <div
                className=" scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white text-black font-bold shadow-md shadow-[#364e7e1a] 
                max-w-md mx-auto w-full px-8 py-8 rounded-xl "
            >
                <h3 className="text-lg">
                    {type === 'edit' ? 'Edit' : 'Add New '} Task
                </h3>

                {/* task name */}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-8 flex flex-col space-y-1">
                        <label
                            className="text-sm text-gray-500"
                            htmlFor="dayName"
                        >
                            Day Name:
                        </label>
                        <input
                            type="text"
                            id="dayName"
                            defaultValue={workoutSession?.dayName}
                            name="dayName"
                            className="bg-transparent px-4 py-2 outline-none 
                            focus:border-0 rounded-md text-sm border border-gray-600
                            focus:outline-[#635fc7] ring-0"
                            placeholder="e.g Take coffee break"
                            {...register('dayName')}
                        />
                    </div>
                    <div className="mt-8 flex flex-col space-y-1">
                        <label
                            className="text-sm text-gray-500"
                            htmlFor="dayNumber"
                        >
                            Day Number:
                        </label>
                        <input
                            type="number"
                            id="dayNumber"
                            name="dayNumber"
                            defaultValue={workoutSession?.dayNumber}
                            className="bg-transparent px-4 py-2 outline-none 
                            focus:border-0 rounded-md text-sm border border-gray-600
                            focus:outline-[#635fc7] ring-0"
                            placeholder="e.g Take coffee break"
                            {...register('dayNumber')}
                        />
                    </div>

                    <div className="mt-8 flex flex-col space-y-1">
                        <label
                            className="text-sm text-gray-500"
                            htmlFor="dayTarget"
                        >
                            Day Target:
                        </label>
                        <input
                            type="text"
                            id="dayTarget"
                            name="dayTarget"
                            defaultValue={workoutSession?.dayTarget}
                            className="bg-transparent px-4 py-2 outline-none 
                            focus:border-0 rounded-md text-sm border border-gray-600
                            focus:outline-[#635fc7] ring-0"
                            placeholder="e.g Take coffee break"
                            {...register('dayTarget')}
                        />
                    </div>

                    <div className="mt-8 flex flex-col space-y-1">
                        <label
                            className="text-sm text-gray-500"
                            htmlFor="hourNumber"
                        >
                            Hour Number:
                        </label>
                        <input
                            type="number"
                            id="hourNumber"
                            name="hourNumber"
                            defaultValue={workoutSession?.hourNumber}
                            className="bg-transparent px-4 py-2 outline-none 
                            focus:border-0 rounded-md text-sm border border-gray-600
                            focus:outline-[#635fc7] ring-0"
                            placeholder="e.g Take coffee break"
                            {...register('hourNumber')}
                        />
                    </div>

                    {/* Description */}

                    <div className="mt-8 flex flex-col space-y-1">
                        <label className="text-sm text-gray-500">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-transparent min-h-[150px] items-start px-4 py-2 outline-none 
                            focus:border-0 rounded-md text-sm border border-gray-600
                            focus:outline-[#635fc7] ring-0"
                            placeholder="e.g Take coffee break e.g Take coffee break e.g Take coffee break e.g Take coffee break e.g Take coffee break"
                        />
                    </div>

                    {/* Subtasks Section */}

                    <div className="mt-8 flex flex-col space-y-1">
                        <label className="text-sm text-gray-500">
                            Subtasks
                        </label>
                        {subtasks?.map((subtask, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center w-full"
                                >
                                    <select
                                        className="flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent
                            focus:border-0 border border-gray-300
                            focus:outline-[#635fc7] outline-0"
                                        style={{
                                            backgroundImage: `url(
                                    ${chevronDown}`,

                                            appearance: 'none',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition:
                                                'right 16px top-50%',
                                        }}
                                        onChange={(e) => {
                                            onChange(index, e.target.value);
                                        }}
                                    >
                                        {exercises?.map((exercise, index) => (
                                            <option
                                                value={exercise.id}
                                                key={index}
                                                selected={
                                                    exercise?.id ===
                                                    subtask?.exercise?.id
                                                }
                                            >
                                                {exercise?.name}
                                            </option>
                                        ))}
                                    </select>
                                    <img
                                        onClick={async () => {
                                            await onCreateSubtask(subtask?.id);
                                        }}
                                        src={CheckIcon}
                                        className="m-4 cursor-pointer"
                                    />
                                    <img
                                        onClick={async () => {
                                            await onDelete(subtask?.id);
                                        }}
                                        src={crossIcon}
                                        className="m-4 cursor-pointer"
                                    />
                                </div>
                            );
                        })}
                        <button
                            className="w-full items-center hover:opacity-75 text-white bg-[#635fc7] mt-2 py-2 rounded-full"
                            type="button"
                            onClick={() => {
                                setSubtasks((state) => [
                                    ...state,
                                    {
                                        id: 1,
                                    },
                                ]);
                            }}
                        >
                            + Add New Subtask
                        </button>
                    </div>

                    {/* Current Status Section */}

                    <div className="mt-8 flex flex-col space-y-3">
                        <label className="text-sm text-gray-500">
                            Current status
                        </label>
                        <select
                            className="flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent
                            focus:border-0 border border-gray-300
                            focus:outline-[#635fc7] outline-0"
                            style={{
                                backgroundImage: `url(
                                    ${chevronDown}`,

                                appearance: 'none',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 16px top-50%',
                            }}
                            {...register('status', {
                                required: 'This field is required',
                            })}
                        >
                            {columns?.map((col, index) => (
                                <option
                                    value={capitalizeText(col.name)}
                                    key={index}
                                    className="capitalize"
                                    selected={
                                        workoutSession?.status ===
                                        capitalizeText(col.name)
                                    }
                                >
                                    {capitalizeText(col.name)}
                                </option>
                            ))}
                        </select>
                        <button
                            className="w-full items-center hover:opacity-75 text-white bg-[#635fc7] mt-2 py-2 rounded-full"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            {type === 'edit' ? 'Save Edit' : 'Create Task'}
                        </button>
                        {type === 'edit' && (
                            <button
                                className="w-full items-center hover:opacity-75 text-white bg-[#635fc7] mt-2 py-2 rounded-full"
                                type="button"
                                onClick={async () => {
                                    await onWorkoutSessionDelete();
                                }}
                            >
                                Delete Task
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
function capitalizeText(text) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
export default AddEditTaskModal;
