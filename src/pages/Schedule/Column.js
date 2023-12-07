import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shuffle } from 'lodash';
import boardsSlice from '../../redux/boardsSlice.js';
import Task from './Task.js';
import AddEditTaskModal from './modals/addEditTaskModal.js';
import ProgramService from '../../services/ProgramService.js';

const Column = ({ colIndex, boards, setBoards, setReloadPage, memberId }) => {
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
    console.log(memberId);
    const dispatch = useDispatch();
    const [color, setColor] = useState(null);
    const [openAddEditTask, setOpenAddEditTask] = useState(false);

    const board = boards?.find((board) => board.isActive) || [];
    const col = board?.columns.find((col, i) => i === colIndex) || [];
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [dispatch]);

    const handleOnDrop = async (e) => {
        const { prevColIndex, taskIndex, taskId } = JSON.parse(
            e.dataTransfer.getData('text'),
        );
        console.log(prevColIndex, taskIndex, taskId, colIndex);
        if (colIndex !== prevColIndex) {
            switch (colIndex) {
                case 0:
                    await ProgramService.changeSessionStatusToTodo(taskId);
                    break;
                case 1:
                    await ProgramService.changeSessionStatusToDoing(taskId);
                    break;
                case 2:
                    await ProgramService.changeSessionStatusToDone(taskId);
                    break;
            }
            setReloadPage((state) => state + 1);
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
                <Task
                    key={index}
                    taskIndex={index}
                    taskId={task.id}
                    colIndex={colIndex}
                    boards={boards}
                    setOpenAddEditTask={setOpenAddEditTask}
                    setReloadPage={setReloadPage}
                />
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
                    setReloadPage={setReloadPage}
                    programId={board?.id}
                    boards={boards}
                    memberId={memberId}
                />
            )}
        </div>
    );
};

export default Column;
