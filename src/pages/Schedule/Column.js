import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shuffle } from 'lodash';
import boardsSlice from '../../redux/boardsSlice.js';
import Task from './Task.js';
import AddEditTaskModal from './modals/addEditTaskModal.js';

const Column = ({ colIndex }) => {
    const colors = [
        'bg-red-500',
        'bg-orange-500',
        'bg-blue-500',
        'bg-purple-500',
        'bg-green-500',
        'bg-indigo-500',
        'bg-yellow-500',
        'bg-pink-500',
        'bg-sky-500',
    ];

    const [color, setColor] = useState(null);
    const [openAddEditTask, setOpenAddEditTask] = useState(false);

    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);
    const col = board.columns.find((col, i) => i === colIndex);
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [dispatch]);

    const handleOnDrop = (e) => {
        const { prevColIndex, taskIndex } = JSON.parse(
            e.dataTransfer.getData('text'),
        );

        if (colIndex !== prevColIndex) {
            dispatch(
                boardsSlice.actions.dragTask({
                    colIndex,
                    prevColIndex,
                    taskIndex,
                }),
            );
        }
    };

    const handleOnDragOver = (e) => {
        e.preventDefault();
    };
    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
            className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
        >
            <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
                <div className={`rounded-full w-4 h-4 ${color} `} />
                {col.name} ({col.tasks?.length})
            </p>

            {col.tasks?.map((task, index) => (
                <Task key={index} taskIndex={index} colIndex={colIndex} />
            ))}
            <button
                className=" button hidden md:block py-2 px-6 bg-gray-500 w-full mt-4"
                onClick={() => {
                    setOpenAddEditTask((state) => !state);
                }}
            >
                + Add New Task
            </button>
            {openAddEditTask && (
                <AddEditTaskModal
                    setOpenAddEditTask={setOpenAddEditTask}
                    device="mobile"
                    type="add"
                />
            )}
        </div>
    );
};

export default Column;
