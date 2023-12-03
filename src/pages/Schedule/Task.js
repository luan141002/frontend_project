import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskModal from './modals/TaskModal.js';
import AddEditTaskModal from './modals/addEditTaskModal.js';

const Task = ({
    colIndex,
    taskIndex,
    boards,
    taskId,
    setOpenAddEditTask,
    setReloadPage,
}) => {
    //const boards = useSelector((state) => state.boards);
    const account = useSelector((state) => state.account);
    const isPT = account?.roles[0]?.name === 'PERSONAL_TRAINER';
    const board = boards.find((board) => board.isActive);
    const columns = board.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [openEditTask, setOpenEditTask] = useState(false);

    let completed = 0;
    let subtasks = task?.subtasks;
    subtasks.forEach((subtask) => {
        if (subtask.isCompleted) {
            completed++;
        }
    });

    const handleOnDrag = (e) => {
        e.dataTransfer.setData(
            'text',
            JSON.stringify({
                taskIndex,
                prevColIndex: colIndex,
                taskId: taskId,
            }),
        );
    };

    return (
        <div>
            <div
                onClick={(e) => {
                    if (isPT) {
                        setOpenEditTask(true);
                    } else {
                        setIsTaskModalOpen(true);
                    }
                }}
                draggable
                onDragStart={handleOnDrag}
                className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
            >
                <p className=" font-bold tracking-wide ">{task?.dayName}</p>
                <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
                    {completed} of {subtasks.length} completed tasks
                </p>
            </div>
            {isTaskModalOpen && (
                <TaskModal
                    colIndex={colIndex}
                    taskIndex={taskIndex}
                    boards={boards}
                    setIsTaskModalOpen={setIsTaskModalOpen}
                    setReloadPage={setReloadPage}
                />
            )}
            {openEditTask && (
                <AddEditTaskModal
                    setOpenEditTask={setOpenEditTask}
                    device="mobile"
                    taskId={taskId}
                    colIndex={colIndex}
                    type="edit"
                    setReloadPage={setReloadPage}
                    programId={boards[0]?.id}
                    isPT={isPT}
                    boards={boards}
                />
            )}
        </div>
    );
};

export default Task;
