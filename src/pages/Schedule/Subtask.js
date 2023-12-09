import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import boardsSlice from '../../redux/boardsSlice.js';
import ProgramService from '../../services/ProgramService.js';
import { useEffect, useState } from 'react';
import { set } from 'lodash';

function Subtask({
    index,
    taskIndex,
    colIndex,
    boards,
    setReloadPage,
    setIsTaskModalOpen,
    setReloadTaskModal,
}) {
    const [reloadSubtaskPage, setReloadSubtaskPage] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [subtask, setSubtask] = useState();
    const [task, setTask] = useState();
    const [checked, setChecked] = useState(subtask?.isCompleted);

    useEffect(() => {
        const board = boards?.find((board) => board.isActive === true);
        const col = board?.columns.find((col, i) => i === colIndex);
        const task = col?.tasks.find((task, i) => i === taskIndex);
        setTask(task);
        const subtask = task?.subtasks.find((subtask, i) => i === index);
        setSubtask(subtask);
        setChecked(subtask?.isCompleted);
    }, [checked, reloadSubtaskPage]);
    const onChange = async (e) => {
        await ProgramService.setCompleteSubtask(task.id, subtask.id);
        setReloadPage((state) => state + 1);
        setReloadSubtaskPage((state) => state + 1);
        setReloadTaskModal((state) => state + 1);
        setChecked((state) => !state);
    };
    //  const checked = subtask?.isCompleted;
    return (
        <div className=" w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
            <input
                className=" w-4 h-4  accent-[#635fc7] cursor-pointer "
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <p
                className={
                    checked &&
                    ' line-through opacity-30 text-blue hover:text-red-700'
                }
                onClick={() => navigate(`/exercises/${subtask.exercise.id}`)}
            >
                {subtask?.exercise?.name}
            </p>
        </div>
    );
}

export default Subtask;
