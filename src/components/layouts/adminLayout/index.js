import React from 'react';
import Sidebar from './shared/Sidebar.jsx';
import Header from './shared/Header.jsx';

export default function Layout({
    children,
    isPT,
    members,
    boards,
    setBoardMemberId,
    setReloadPage,
}) {
    return (
        <div className="bg-[#151212] h-screen min-w-fit max-w-full flex flex-row w-full ">
            <Sidebar
                isPT={isPT}
                members={members}
                boards={boards}
                setBoardMemberId={setBoardMemberId}
                setReloadPage={setReloadPage}
            />
            <div className="flex flex-col flex-1 ">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-scroll scrollbar-hide min-w-[1295px] max-w-[1295px] mt-16 ml-60 ">
                    {children}
                </div>
            </div>
        </div>
    );
}
