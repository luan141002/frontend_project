import React from 'react';
import ExerciseService from '../../../services/ExerciseService';
import MemberService from '../../../services/MemberService';

const DeleteModal = ({
    type,
    currentExercise,
    currentTrainer,
    setOpenDeleteExerciseModal,
    setOpenDeleteTrainerModal,
    setLoadTablePage,
}) => {
    const onDeleteBtnClick = async () => {
        if (type === 'exercise') {
            await ExerciseService.deleteExercise(currentExercise);
            setLoadTablePage((state) => state + 1);
            setOpenDeleteExerciseModal(false);
        } else if (type === 'pt') {
            console.log(currentTrainer);
            await MemberService.deletePT(currentTrainer);
            setLoadTablePage((state) => state + 1);
            setOpenDeleteTrainerModal(false);
        }
    };
    return (
        // Modal container
        <div className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex bg-[#0000080]">
            {/* Delete Modal  */}
            <div
                className="scrollbar-hide overflow-y-scroll max-h-[95vh] 
        my-auto  bg-white dark:bg-[#2b2c37] text-black font-bold 
        shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
            >
                <h3 className="font-bold text-red-500 text-xl ">
                    Delete this {type}?
                </h3>

                <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
                    Are you sure you want to delete this {type}? This action
                    will remove this {type} and cannot be reversed.
                </p>

                <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
                    <button
                        onClick={onDeleteBtnClick}
                        className="w-full items-center text-white hover:opacity-75 bg-red-500 py-2 rounded-full"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => {
                            if (type === 'exercise') {
                                setOpenDeleteExerciseModal(false);
                            } else if (type === 'pt') {
                                setOpenDeleteTrainerModal(false);
                            }
                        }}
                        className="w-full items-center text-[#635fc7] dark:bg-white hover:opacity-75 bg-[#635fc71a]  py-2 rounded-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
