import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import LogoImage from '../../public/logo-image.png';
import Vietnamese from '../../public/Vietnamese-logo.svg.png';
import { Menu, Popover, Transition } from '@headlessui/react';
import { HiOutlineBell } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import LoginModal from '../../pages/Login';
import RegisterPage from '../../pages/Register';
import AuthService from '../../services/AuthService';
import { privateRoutes } from '../../routes';
import { useLocation } from 'react-router-dom';

import accountsSlices from '../../redux/accountsSlice.js';
import { useMemo } from 'react';
import { useEffect } from 'react';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [currentPathName, setCurrentPathName] = useState(location.pathname);

    const account = useSelector((state) => state.account);
    const [authenticated, setAuthenticated] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openMustLoginModal, setOpenMustLoginModal] = useState(false);

    const pathArray = privateRoutes.map((route) => route.path);

    useMemo(() => {
        if (pathArray.includes(location.pathname.toString())) {
            console.log('hihi');
            setOpenLoginModal(true);
        } else {
            setOpenLoginModal(false);
        }
    }, [location.pathname]);

    return (
        <div className="bg-[#151212] w-[95%] h-[80px] fixed flex justify-between items-center border-b border-b-[#3D3030] p-4 z-40">
            <div className="flex justify-between items-center">
                {/* <img
                        src={LogoImage}
                        alt='Logo'
                        className='w-[62px] h-[49px]  rotate-[-36.20deg]'
                    /> */}
                <label className="text-[#980B0B]  lg:text-[40px] sm:text-[30px] min-[320px]:text-[30px] font-semibold">
                    LOGO
                </label>
            </div>
            {/* search section */}
            <div class="relative hidden md:block w-[40%] h-[60%] ">
                <div class="absolute h-[40px] w-[10%]  right-0 flex items-center justify-center  hover:bg-black hover:text-white  ">
                    <svg
                        class="w-4 h-[100%] flex self-center text-base text-black hover:text-white dark:text-gray-400 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    id="search-navbar"
                    class="block w-full p-2 pl-3 text-sm bg-white text-gray-900 border border-gray-300   focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
                    placeholder="Search exercises, post, video,..."
                />
            </div>
            <div className="flex justify-between items-center space-x-3 bg-transparent">
                {/* Language Option logo  */}
                <img
                    src={Vietnamese}
                    alt="vietnamese logo"
                    className="w-[25px] h-4 border border-stone-50"
                />
                {account.email != null ? (
                    <div className="flex space-x-2 items-center px-3">
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open && 'bg-gray-100',
                                            'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100',
                                        )}
                                    >
                                        <HiOutlineBell fontSize={24} />
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
                                            <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                                                <strong className="text-gray-700 font-medium">
                                                    Notifications
                                                </strong>
                                                <div className="mt-2 py-1 text-sm">
                                                    This is notification panel.
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                        <Menu as="div" className="relative">
                            <div>
                                <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <div
                                        className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://source.unsplash.com/80x80?face")',
                                        }}
                                    >
                                        <span className="sr-only">
                                            Marc Backes
                                        </span>
                                    </div>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                onClick={() =>
                                                    navigate('/profile')
                                                }
                                                className={classNames(
                                                    active && 'bg-gray-100',
                                                    'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                                )}
                                            >
                                                Your Profile
                                            </div>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                onClick={() =>
                                                    navigate('/settings')
                                                }
                                                className={classNames(
                                                    active && 'bg-gray-100',
                                                    'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                                )}
                                            >
                                                Settings
                                            </div>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active && 'bg-gray-100',
                                                    'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200',
                                                )}
                                                onClick={async () => {
                                                    await AuthService.logout();

                                                    dispatch(
                                                        accountsSlices.actions.setAccount(
                                                            {
                                                                email: null,
                                                                id: '',
                                                                roles: '',
                                                            },
                                                        ),
                                                    );
                                                    navigate('/');
                                                }}
                                            >
                                                Sign out
                                            </div>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                ) : (
                    <div className="flex w-full justify-center space-x-2 ">
                        <button
                            type="submit"
                            className="bg-transparent box-border text-white h-[40px] w-[120px] hover:border-3  hover:hover:opacity-80"
                            onClick={() => {
                                navigate('/');
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                });
                                setOpenRegisterModal((state) => !state);
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            type="reset"
                            className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  hover:opacity-80"
                            onClick={() => {
                                navigate('/');
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                });
                                setOpenLoginModal((state) => !state);
                            }}
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </div>

            {openLoginModal && (
                <LoginModal
                    setOpenLoginModal={setOpenLoginModal}
                    setAuthenticated={setAuthenticated}
                    setOpenRegisterModal={setOpenRegisterModal}
                />
            )}
            {/* {openMustLoginModal && (
                <LoginModal
                    type="must"
                    setOpenLoginModal={setOpenLoginModal}
                    setAuthenticated={setAuthenticated}
                    setOpenRegisterModal={setOpenRegisterModal}
                />
            )} */}
            {openRegisterModal && (
                <RegisterPage
                    setOpenRegisterModal={setOpenRegisterModal}
                    setOpenLoginModal={setOpenLoginModal}
                />
            )}
        </div>
    );
};

export default Header;
