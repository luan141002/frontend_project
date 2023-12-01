import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLogout } from 'react-icons/hi';
import {
    DASHBOARD_SIDEBAR_LINKS,
    DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from '../constants.jsx';
import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog,
} from 'react-icons/hi';
import boardsSlice from '../../../../redux/boardsSlice.js';
import AddEditBoardModal from '../../../../pages/Schedule/modals/addEditBoardModal.js';
import LogoImage from '../../../../public/logo-image.png';

const linkClass =
    'flex items-center gap-2 font-normal px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {
    const dispatch = useDispatch();
    const [boardModalOpen, setBoardModalOpen] = useState(false);

    const boards = useSelector((state) => state.boards);

    return (
        <div className="bg-neutral-900 w-60 p-3 flex flex-col ">
            <div className="flex items-center gap-2 px-1 py-3">
                <div className="inline-flex justify-between items-center">
                    <img
                        src={LogoImage}
                        alt="Logo"
                        className={`w-[62px] h-[49px] cursor-pointer block m-auto duration-500 rotate-[-36.20deg]  `}
                    />
                    <label
                        className={`text-[#980B0B] duration-200 lg:text-[35px] sm:text-[30px] min-[320px]:text-[30px] font-semibold`}
                    >
                        LOGO
                    </label>
                </div>
            </div>
            <div className="py-2 flex flex-1 flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <div>
                        <SidebarLink key={link.key} link={link} />
                        {link.subMenu?.map((subMenuElement) => {
                            return (
                                <SidebarLink
                                    isSubmenu={true}
                                    key={subMenuElement.key}
                                    link={subMenuElement}
                                />
                            );
                        })}
                    </div>
                ))}
                <div className="flex flex-1 flex-col gap-0.5">
                    <Link
                        to={'/dashboard'}
                        className={classNames(
                            'bg-neutral-700 text-white',

                            linkClass,
                        )}
                    >
                        <span className="text-2xl">
                            <HiOutlineLogout />
                        </span>
                        User Schedules
                    </Link>
                    {boards?.map((board, index) => (
                        <div
                            className={classNames(
                                board.isActive
                                    ? 'bg-neutral-700 text-white '
                                    : 'text-neutral-400',
                                linkClass,
                                'pl-8',
                            )}
                            key={index}
                            onClick={() => {
                                dispatch(
                                    boardsSlice.actions.setBoardActive({
                                        index: index,
                                    }),
                                );
                            }}
                        >
                            <span className="text-2xl">
                                <HiOutlineCube />
                            </span>
                            {board.name}
                        </div>
                    ))}
                    <div
                        className={classNames(
                            linkClass,
                            'pl-8 text-white bg-red-900',
                        )}
                        onClick={() => {
                            setBoardModalOpen(true);
                        }}
                    >
                        + Create New Board
                    </div>

                    {boardModalOpen && (
                        <AddEditBoardModal
                            type="add"
                            setBoardModalOpen={setBoardModalOpen}
                        />
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div
                    className={classNames(
                        linkClass,
                        'cursor-pointer text-red-500',
                    )}
                >
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Back to Homepage
                </div>
            </div>
        </div>
    );
}

function SidebarLink({ link, isSubmenu }) {
    const { pathname } = useLocation();

    return (
        <Link
            to={link.path}
            className={classNames(
                pathname === link.path
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-400',
                linkClass,
                isSubmenu === true ? 'pl-8' : '',
            )}
        >
            <span className="text-2xl">{link.icon}</span>
            {link.label}
        </Link>
    );
}
