import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './schedule.scss';
import Header from './Header.js';
import Center from './Center.js';
import EmptyBoard from './EmptyBoard.js';
import boardsSlice from '../../redux/boardsSlice.js';
const Kanban = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoard = boards.find((board) => board.isActive);

    // if there's no board is active then active the first one
    if (!activeBoard && boards.length > 0)
        dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

    const [boardModalOpen, setBoardModalOpen] = useState(false);
    return (
        <div className=" overflow-hidden  overflow-x-scroll">
            <>
                {boards.length > 0 ? (
                    <>
                        {/* header section */}
                        <Header
                            boardModalOpen={boardModalOpen}
                            setBoardModalOpen={setBoardModalOpen}
                        />

                        {/* Center Section */}
                        <Center />
                    </>
                ) : (
                    <>
                        <EmptyBoard type="" />
                    </>
                )}
            </>
        </div>
    );
};

export default Kanban;
