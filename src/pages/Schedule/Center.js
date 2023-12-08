import React, { useState, useEffect, useRef, useMemo } from 'react';
import Sidebar from './SideBar.js';
import { useDispatch, useSelector } from 'react-redux';
import EmptyBoard from './EmptyBoard.js';
import Column from './Column.js';
import AddEditBoardModal from './modals/addEditBoardModal';
import PickTrainer from '../PickTrainerPage/index.js';
import ProgramService from '../../services/ProgramService.js';
import MemberService from '../../services/MemberService.js';
import AdminLayout from '../../components/layouts/adminLayout';
import boardsSlice from '../../redux/boardsSlice.js';
import { useParams } from 'react-router-dom';
import data from '../Schedule/data/realData.json';

const Center = () => {
    const account = useRef(useSelector((state) => state.account));
    const { memberIdTerm } = useParams();

    const isPT =
        account.current.roles[0]?.name === 'PERSONAL_TRAINER' ? true : false;
    const [boardModalOpen, setBoardModalOpen] = useState(false);
    const [boards, setBoards] = useState();
    const [reloadPage, setReloadPage] = useState(1);

    const [boardMemberId, setBoardMemberId] = useState(memberIdTerm);

    const memberIdForCreate = useRef();
    const [members, setMembers] = useState();

    const [currentMember, setCurrentMember] = useState();

    const loadPage = async () => {
        if (isPT) {
            // get list member of this PT
            const listMember = await MemberService.getMembersByPTId(
                account.current.memberId,
            );
            console.log(listMember);
            // set list member into members
            setMembers(listMember);
            let member;
            // if PT there is no memberIdTerm is set
            // => initialize with the first member of this PT
            if (memberIdTerm === null) {
                console.log(members[0].id);
                setBoardMemberId(members[0]?.id);
                memberIdForCreate.current = members[0].id;
                member = members[0];
            } else {
                // console.log(memberIdTerm);
                const memberWithId = listMember.find(
                    (member) => member.id === +memberIdTerm,
                );

                console.log(memberWithId);
                member = memberWithId;
                setBoardMemberId(member?.id);
                memberIdForCreate.current = memberIdTerm;
            }
            console.log(member);
            if (boardMemberId != null && member.hasProgram === true) {
                console.log(member);
                const response = await ProgramService.getProgrammeByMemberId(
                    boardMemberId,
                );

                setBoards(response.boards);
            } else {
                setBoards([{ board: { columns: [], isActive: true } }]);
            }
        } else {
            setBoardMemberId(account.current.memberId);
            console.log(account.hasProgram);
            if (account.hasProgram === true && boardMemberId != null) {
                const response = await ProgramService.getProgrammeByMemberId(
                    boardMemberId,
                );
                setBoards(response.boards);
            } else if (account.hasProgram === false && boardMemberId != null) {
                setBoards(data.boards);
            }
        }
    };

    useMemo(async () => {
        await loadPage();
    }, [boardMemberId, reloadPage]);
    const board = boards?.find((board) => board?.isActive === true);
    const columns = board?.columns;

    return (
        <AdminLayout
            isPT={isPT}
            members={members}
            boards={boards}
            setBoardMemberId={setBoardMemberId}
        >
            <div className="flex w-full">
                {/* Columns Section */}
                {isPT === true ? (
                    <>
                        {columns?.length > 0 ? (
                            <>
                                {columns?.map((col, index) => (
                                    <Column
                                        key={index}
                                        colIndex={index}
                                        boards={boards}
                                        setBoards={setBoards}
                                        setReloadPage={setReloadPage}
                                        memberId={memberIdForCreate.current}
                                    />
                                ))}
                                {/* <div
                                    onClick={() => {
                                        setBoardModalOpen(true);
                                    }}
                                    className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
                                >
                                    + New Column
                                </div> */}
                            </>
                        ) : (
                            <>
                                <EmptyBoard
                                    type="add"
                                    memberId={memberIdForCreate.current}
                                    setReloadPage={setReloadPage}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {columns?.length > 0 ? (
                            <>
                                {columns?.map((col, index) => (
                                    <Column
                                        key={index}
                                        colIndex={index}
                                        boards={boards}
                                        setBoards={setBoards}
                                        setReloadPage={setReloadPage}
                                    />
                                ))}
                                {/* <div
                                    onClick={() => {
                                        setBoardModalOpen(true);
                                    }}
                                    className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
                                >
                                    + New Column
                                </div> */}
                            </>
                        ) : (
                            <>
                                <PickTrainer />
                            </>
                        )}
                    </>
                )}

                {boardModalOpen && (
                    <AddEditBoardModal
                        memberId={boardMemberId}
                        type="edit"
                        setBoardModalOpen={setBoardModalOpen}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default Center;
