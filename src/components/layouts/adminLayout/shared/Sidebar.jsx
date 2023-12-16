import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLogout } from 'react-icons/hi';
import {
    DASHBOARD_SIDEBAR_LINKS,
    DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from '../constants.jsx';
import { HiOutlineCube } from 'react-icons/hi';
import boardsSlice from '../../../../redux/boardsSlice.js';
import AddEditBoardModal from '../../../../pages/Schedule/modals/addEditBoardModal.js';
import MemberService from '../../../../services/MemberService.js';
import LogoImage from '../../../../public/logo-image.png';
import { FaCalendarWeek, FaUserPen } from 'react-icons/fa6';

const linkClass =
    'flex items-center gap-2 font-normal px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar({
    isPT,
    members,
    boards,
    setBoardMemberId,
    setReloadPage,
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const [memberId, setMemberId] = useState();
    console.log(boards);
    const [boardModalOpen, setBoardModalOpen] = useState(false);

    return (
        <div className="bg-neutral-900 w-60 p-3 z-50 fixed flex flex-col h-screen ">
            <div className="flex items-center gap-2 px-1 py-3">
                <div className="inline-flex justify-between items-center">
                    <img
                        src={LogoImage}
                        alt="Logo"
                        className={`w-[62px] h-[49px] cursor-pointer block m-auto duration-500 rotate-[-36.20deg]  `}
                    />
                    <label
                        className={`text-[#980B0B] duration-200 lg:text-[20px] sm:text-[30px] min-[320px]:text-[30px] font-semibold`}
                    >
                        Universe Fitness
                    </label>
                </div>
            </div>
            <div className="py-2 flex flex-1 flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS?.map((link, index) => (
                    <div>
                        {link.roles.includes(account.roles[0]?.name) && (
                            <div>
                                <SidebarLink key={index} link={link} />
                                {link.subMenu?.map((subMenuElement) => {
                                    return (
                                        <SidebarLink
                                            isSubmenu={true}
                                            key={subMenuElement?.key}
                                            link={subMenuElement}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
                {account.roles[0]?.name !== 'ADMIN' && (
                    <div className="flex flex-1 flex-col gap-0.5">
                        <Link
                            to={'/dashboard'}
                            className={classNames(
                                'bg-neutral-700 text-white',

                                linkClass,
                            )}
                        >
                            <span className="text-2xl">
                                <FaCalendarWeek />
                            </span>
                            Member Programs
                        </Link>
                        {isPT && account.roles[0]?.name !== 'ADMIN'
                            ? members?.map((member, index) => (
                                  <Link to={`/members/${member?.id}/schedule`}>
                                      <div
                                          className={classNames(
                                              'bg-neutral-700 text-white ',

                                              linkClass,
                                              'pl-8',
                                          )}
                                          key={index}
                                          onClick={() => {
                                              navigate(
                                                  `/members/${member?.id}/schedule`,
                                              );
                                              setBoardMemberId(member?.id);
                                              //   setReloadPage((state) => state + 1);
                                              //   setCurrentMemberId(member.id);
                                          }}
                                      >
                                          <span className="text-2xl">
                                              <FaUserPen />
                                          </span>
                                          {member.firstName +
                                              ' ' +
                                              member.lastName}
                                      </div>
                                  </Link>
                              ))
                            : boards?.map((board, index) => (
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
                                              boardsSlice.actions.setBoardActive(
                                                  {
                                                      index: index,
                                                  },
                                              ),
                                          );
                                      }}
                                  >
                                      <span className="text-2xl">
                                          <HiOutlineCube />
                                      </span>
                                      {board?.name}
                                  </div>
                              ))}
                        {/* <div
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
                                memberId={memberId}
                                type="add"
                                setBoardModalOpen={setBoardModalOpen}
                            />
                        )} */}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS?.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
                <div
                    className={classNames(
                        linkClass,
                        'cursor-pointer text-red-500',
                    )}
                    onClick={() => navigate('/')}
                >
                    <span className="text-xl rotate-180">
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
