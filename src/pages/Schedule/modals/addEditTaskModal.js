import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import crossIcon from '../assets/icon-cross.svg';
import chevronDown from '../assets/icon-chevron-down.svg';
import { useDispatch, useSelector } from 'react-redux';
import boardSlice from '../../../redux/boardsSlice.js';

const AddEditTaskModal = ({
    type,
    device,
    setOpenAddEditTask,
    taskIndex,
    prevColIndex = 0,
}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEclipsisOpen, setIsElipsisMenuOpen] = useState(false);
    // get board list data
    const board = useSelector((state) => state.boards).find(
        (board) => board.isActive,
    );

    const [isValid, setIsValid] = useState(true);

    const columns = board.columns;
    const col = columns.find((col, index) => index === prevColIndex);
    const [status, setStatus] = useState(columns[prevColIndex].name);
    const [newColIndex, setNewColIndex] = useState(prevColIndex);
    const [subtasks, setSubtasks] = useState([
        {
            title: '',
            isComplete: false,
            id: uuidv4(),
        },
        {
            title: '',
            isComplete: false,
            id: uuidv4(),
        },
    ]);

    const onDelete = (id) => {
        setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
    };
    // handle column input
    const onChange = (id, newValue) => {
        setSubtasks((prevState) => {
            const newState = [...prevState];
            const subtask = newState.find((subtask) => subtask.id === id);
            subtask.title = newValue;
            return newState;
        });
    };

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
        setNewColIndex(e.target.selectedIndex);
    };
    const validate = () => {
        setIsValid(false);
        if (!title.trim()) {
            return false;
        }

        for (let i = 0; i < subtasks.length; i++) {
            if (!subtasks[i].title.trim()) {
                return false;
            }
        }
        setIsValid(true);
        return true;
    };

    const onSubmit = (type) => {
        if (type === 'add') {
            dispatch(
                boardSlice.actions.addTask({
                    title,
                    description,
                    subtasks,
                    status,
                    newColIndex,
                }),
            );
        } else {
            dispatch(
                boardSlice.actions.editTask({
                    title,
                    description,
                    subtasks,
                    status,
                    taskIndex,
                    newColIndex,
                }),
            );
        }
    };
    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setOpenAddEditTask(false);
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

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm text-gray-500">Task Name</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-transparent px-4 py-2 outline-none 
                        focus:border-0 rounded-md text-sm border border-gray-600
                        focus:outline-[#635fc7] ring-0"
                        placeholder="e.g Take coffee break"
                        type="text"
                    />
                </div>

                {/* Description */}

                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm text-gray-500">Description</label>
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
                    <label className="text-sm text-gray-500">Subtasks</label>
                    {subtasks.map((subtask, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center w-full"
                            >
                                <input
                                    onChange={(e) => {
                                        onChange(subtask.id, e.target.value);
                                    }}
                                    type="text"
                                    value={subtask.title}
                                    className="bg-transparent outline-none
                                    focus:border-0 flex-grow px-4 py-2 rounded-md border text-sm border-gray-600
                                  focus:outline-[#635fc7]"
                                    placeholder="e.g Take coffee break"
                                />
                                <img
                                    onClick={() => {
                                        onDelete(subtask.id);
                                    }}
                                    src={crossIcon}
                                    className="m-4 cursor-pointer"
                                />
                            </div>
                        );
                    })}
                    <button
                        className="w-full items-center hover:opacity-75 text-white bg-[#635fc7] mt-2 py-2 rounded-full"
                        onClick={() => {
                            setSubtasks((state) => [
                                ...state,
                                {
                                    title: '',
                                    isComplete: false,
                                    id: uuidv4(),
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
                        value={status}
                        onChange={(e) => onChangeStatus(e)}
                        style={{
                            backgroundImage: `url(
                                ${chevronDown}`,

                            appearance: 'none',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 16px top-50%',
                        }}
                    >
                        {columns.map((col, index) => (
                            <option value={col.name} key={index}>
                                {col.name}
                            </option>
                        ))}
                    </select>
                    <button
                        className="w-full items-center hover:opacity-75 text-white bg-[#635fc7] mt-2 py-2 rounded-full"
                        onClick={() => {
                            const isValid = validate();
                            if (isValid) {
                                onSubmit(type);
                                setOpenAddEditTask(false);
                            }
                        }}
                    >
                        {type === 'edit' ? 'Save Edit' : 'Create Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEditTaskModal;
