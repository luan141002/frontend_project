import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CrossIcon from '../assets/icon-cross.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import boardSlides from '../../../redux/boardsSlice.js';
import ProgramService from '../../../services/ProgramService.js';

const AddEditBoardModal = ({
    setBoardModalOpen,
    type,
    memberId,
    setReloadPage,
}) => {
    const dispatch = useDispatch();
    console.log('hihi');
    const account = useSelector((state) => state.account);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const board = useSelector((state) => state.boards).find(
        (board) => board.isActive,
    );

    if (type === 'edit' && isFirstLoad) {
        setIsFirstLoad(false);
    }
    const onSubmit = async (data) => {
        console.log(data);
        console.log(memberId);
        const response = await ProgramService.addProgram(
            memberId,
            data.name,
            data.description,
        );
        console.log(response);
        setReloadPage((state) => state + 1);
        setBoardModalOpen(false);
    };
    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setBoardModalOpen(false);
            }}
            className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50
        justify-center items-center flex bg-[#00000080]"
        >
            {/* Modal Section */}
            <div
                className="scrollbar-hide overflow-y-scroll max-h-[95vh]
                bg-white text-black font-bold shadow-md shadow-[#364e7e1a]
                max-w-md mx-auto w-full px-8 py-8 rounded-xl"
            >
                <h3 className="text-lg">
                    {type === 'edit' ? 'Edit' : 'Add New'} Programme
                </h3>

                {/* Task Name */}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-8 flex flex-col space-y-3">
                        <label className="text-sm text-gray-500">
                            Board Columns
                        </label>
                        <input
                            className="bg-transparent px-4 py-2 rounded-md text-sm border
                            border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
                            placeholder="e.g Web Design"
                            id="board-name-input"
                            {...register('name', {
                                required: 'program name is required',
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    {/* task description  */}
                    <div className="mt-4 flex flex-col space-y-3">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Exercise Overview
                        </label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            placeholder="e.g Web Design"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            {...register('description')}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <button
                        className="w-full items-center hover:opacity-75 mt-6 relative text-white bg-[#635fc7] py-2 rounded-full"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {type === 'add' ? 'Create New Board' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEditBoardModal;
{
    /* Board Columns */
}
{
    /* <div className="mt-8 flex flex-col space-y-3">
                        <label className="text-sm text-gray-500">
                            Board Columns
                        </label>
                        {newColumns.map((column, index) => (
                            <div key={index} className="flex items-center w-full">
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
                                className="w-full items-center hover:opacity-75 text-white bg-[#635fc7] mt-2 py-2 rounded-full"
                                onClick={() => {
                                    setNewColumns((state) => [
                                        ...state,
                                        {
                                            name: '',
                                            task: [],
                                            id: uuidv4(),
                                        },
                                    ]);
                                }}
                            >
                                + Add new column
                            </button>
                        </div> */
}
