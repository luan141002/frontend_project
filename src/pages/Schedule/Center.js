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
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Center = () => {
    // essential data to load
    const account = useRef(useSelector((state) => state.account));
    const navigate = useNavigate();
    const { memberIdTerm } = useParams();
    const isPT =
        account.current.roles[0]?.name === 'PERSONAL_TRAINER' ? true : false;
    const memberIdForCreate = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [boardModalOpen, setBoardModalOpen] = useState(false);
    const [reloadPage, setReloadPage] = useState(1);

    const [boards, setBoards] = useState();
    const [boardMemberId, setBoardMemberId] = useState(memberIdTerm);
    const [members, setMembers] = useState();

    const loadPage = async () => {
        if (account.current.email === '') {
            navigate('/');
        }

        try {
            setIsLoading(true);
            // PERSONAL TRAINER SECTION
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
                    // set current Member is the 1st member's id
                    setBoardMemberId(members[0]?.id);
                    // set current member if
                    memberIdForCreate.current = members[0].id;
                    member = members[0];
                } else {
                    // if there are memberId on the path => get that member from DB
                    const memberWithId = listMember.find(
                        (member) => member.id === +memberIdTerm,
                    );
                    // set current member is the program of that member
                    member = memberWithId;
                    setBoardMemberId(member?.id);
                    memberIdForCreate.current = memberIdTerm;
                }
                console.log(member);
                // if that member not null and that member has Program then call to BE
                if (boardMemberId != null && member.hasProgram === true) {
                    const response =
                        await ProgramService.getProgrammeByMemberId(
                            boardMemberId,
                        );

                    setBoards(response.boards);
                    setIsLoading(false);
                }
                // else set null
                else {
                    setBoards([{ board: { columns: [], isActive: true } }]);
                    setIsLoading(false);
                }
            }
            // MEMBER SECTION
            else {
                // if that is member then get from redux
                setBoardMemberId(account.current.memberId);

                // if that member id not null and has Program then show that use's program
                if (
                    account.current.hasProgram === true &&
                    boardMemberId != null
                ) {
                    const response =
                        await ProgramService.getProgrammeByMemberId(
                            boardMemberId,
                        );
                    setBoards(response.boards);
                    setIsLoading(false);
                } else if (
                    account.hasProgram === false &&
                    boardMemberId != null
                ) {
                    setBoards(data.boards);
                    setIsLoading(false);
                }
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Register failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    useMemo(async () => {
        await loadPage();
    }, [boardMemberId, reloadPage]);
    const board = boards?.find((board) => board?.isActive === true);
    const columns = board?.columns;

    return (
        <div>
            {isLoading && <h1 className="text-white">Data is loading</h1>}
            {isError && <h1>Error</h1>}
            <AdminLayout
                isPT={isPT}
                members={members}
                boards={boards}
                setBoardMemberId={setBoardMemberId}
            >
                {account.current.roles[0]?.name !== 'ADMIN' &&
                    boards?.length > 0 && (
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
                                                    setReloadPage={
                                                        setReloadPage
                                                    }
                                                    memberId={
                                                        memberIdForCreate.current
                                                    }
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
                                                memberId={
                                                    memberIdForCreate.current
                                                }
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
                                                    setReloadPage={
                                                        setReloadPage
                                                    }
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

                            {/* {boardModalOpen && (
                                <AddEditBoardModal
                                    memberId={boardMemberId}
                                    type="edit"
                                    setBoardModalOpen={setBoardModalOpen}
                                />
                            )} */}
                        </div>
                    )}
            </AdminLayout>
            <ToastContainer />
        </div>
    );
};

export default Center;
