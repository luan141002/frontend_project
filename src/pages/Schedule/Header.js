import React, { useState } from 'react';
import logo from './assets/logo-mobile.svg';
import iconDown from './assets/icon-chevron-down.svg';
import iconUp from './assets/icon-chevron-up.svg';
import HeaderDropdown from './HeaderDropdown.js';
import elipsis from './assets/icon-vertical-ellipsis.svg';
import AddEditBoardModal from './modals/addEditBoardModal.js';
import AddEditTaskModal from './modals/addEditTaskModal.js';
import { useDispatch, useSelector } from 'react-redux';
import ElipsisMenu from './ElipsisMenu.js';
import DeleteModal from './modals/DeleteModal.js';
import boardSlices from '../../redux/boardsSlice.js';

const Header = ({ boardModalOpen, setBoardModalOpen }) => {
    const dispatch = useDispatch();

    const [openDropdown, setOpenDropDown] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [openAddEditTask, setOpenAddEditTask] = useState(false);
    const [boardType, setBoardType] = useState('add');
    const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // get board list data
    const boards = useSelector((state) => state.boards);
    // find the one that is activated
    const board = boards.find((board) => board.isActive);

    const setOpenEditModal = () => {
        setBoardModalOpen(true);
        setIsElipsisMenuOpen(false);
    };
    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
        setIsElipsisMenuOpen(false);
    };
    const onDeleteBtnClick = (e) => {
        if (e.target.textContent === 'Delete') {
            // find the Board is active and delete it
            dispatch(boardSlices.actions.deleteBoard());
            dispatch(boardSlices.actions.setBoardActive({ index: 0 }));
            setIsDeleteModalOpen(false);
        } else {
            setIsDeleteModalOpen(false);
        }
    };

    const onDropdownClick = () => {
        setOpenDropDown((state) => !state);
        setIsElipsisMenuOpen(false);
        setBoardType('add');
    };
    return (
        <div className="p-4 fixed left-0 bg-white z-50 right-0">
            <header className="flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <img src={logo} alt="logo" className="h-6 w-6" />
                    <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">
                        Kanban
                    </h3>
                    <div className="flex items-center">
                        <h3 className=" truncate max-w-[200px] md:text-xl font-bold md:ml-20 font-sans">
                            {board.name}
                        </h3>
                        <img
                            src={openDropdown ? iconUp : iconDown}
                            alt="dropdown icon"
                            className="w-3 ml-2 md:hidden"
                            onClick={onDropdownClick}
                        />
                    </div>
                </div>

                {/* Right Side */}

                <div className=" flex space-x-4 items-center md:space-x-6 font-bold text-white ">
                    <button
                        className=" button hidden md:block py-2 px-6 bg-gray-500 "
                        onClick={() => {
                            setOpenAddEditTask((state) => !state);
                        }}
                    >
                        + Add New Task
                    </button>
                    <button
                        onClick={() => {
                            setOpenAddEditTask((state) => !state);
                        }}
                        className=" button py-1 px-3 md:hidden  bg-red-600 rounded-full"
                    >
                        +
                    </button>

                    <img
                        onClick={() => {
                            setBoardType('edit');
                            setIsElipsisMenuOpen((prevState) => !prevState);
                            setOpenDropDown(false);
                        }}
                        src={elipsis}
                        alt="elipsis"
                        className=" cursor-pointer h-6"
                    />

                    {isElipsisMenuOpen && (
                        <ElipsisMenu
                            setOpenEditModal={setOpenEditModal}
                            setOpenDeleteModal={setOpenDeleteModal}
                            type="Boards"
                        />
                    )}
                </div>
            </header>

            {openDropdown && (
                <HeaderDropdown
                    setBoardModalOpen={setBoardModalOpen}
                    setOpenDropDown={setOpenDropDown}
                />
            )}

            {boardModalOpen && (
                <AddEditBoardModal
                    type={boardType}
                    setBoardModalOpen={setBoardModalOpen}
                />
            )}

            {openAddEditTask && (
                <AddEditTaskModal
                    setOpenAddEditTask={setOpenAddEditTask}
                    device="mobile"
                    type="add"
                />
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    type="board"
                    title={board.name}
                    onDeleteBtnClick={onDeleteBtnClick}
                />
            )}
        </div>
    );
};

export default Header;
