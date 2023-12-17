import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import LogoImage from '../../public/logo-image.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconName, AiFillHome } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FaWeightHanging,
    FaNewspaper,
    FaWeightScale,
    FaChalkboardUser,
} from 'react-icons/fa6';
import { FaRegUserCircle, FaClipboard, FaCheckCircle } from 'react-icons/fa';

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const account = useSelector((state) => state.account);

    const Menu = [
        {
            title: 'Exercises',
            link: '/exercises',
            clicked: false,
            secure: true,
            hasProgram: false,
            icon: <FaWeightHanging />,
        },
        {
            title: 'Blogs',
            link: '/blogs',
            clicked: false,
            secure: false,
            hasProgram: false,
            icon: <FaNewspaper />,
        },
        {
            title: 'Service',
            link: '/dashboard',
            clicked: false,
            secure: true,
            spacing: true,
            hasProgram: true,
            icon: <FaChalkboardUser />,
        },
        {
            title: 'Tools',
            link: '/',
            icon: <FaWeightScale />,
            clicked: true,
            hasProgram: false,
            secure: true,
            subMenu: [
                {
                    title: 'Calories Calculator',
                    link: `/tools/calories-calculator`,
                    clicked: false,
                    secure: true,
                    icon: <FaClipboard />,
                },
                {
                    title: 'BMI Calculator',
                    link: `/tools/bmi-calculator`,
                    clicked: false,
                    secure: true,
                    icon: <FaClipboard />,
                },
            ],
        },
        {
            title: 'Profile',
            secure: true,
            link: `/user/user-profile`,
            clicked: false,
            hasProgram: false,
            icon: <FaRegUserCircle />,
        },
    ];
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div
            className={`bg-[#151212] fixed h-screen p-2 pt-3  ${
                open ? 'w-60' : 'w-20'
            } duration-300  z-50`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => {
                setOpen(false);
                setIsClicked(false);
            }}
        >
            {/* <FaArrowLeft
                className={`bg-white text-black text-xl rounded-full absolute -right-2 top-9 border cursor-pointer ${
                    !open && 'rotate-180'
                }`}
                onClick={() => setOpen(!open)}
            /> */}
            <div class="bg-[#3D3030] h-[0.5px]  w-full  "></div>
            <Link to={'/'}>
                <div className="inline-flex justify-between items-center">
                    <img
                        src={LogoImage}
                        alt="Logo"
                        className={`w-[62px] h-[49px] cursor-pointer block m-auto duration-500  ${
                            !open ? 'rotate-[-36.20deg] ' : 'rotate-[323.8deg]'
                        } `}
                    />
                    <label
                        className={`text-[#980B0B] ${
                            !open && 'scale-0'
                        } duration-200 lg:text-[20px] sm:text-[30px] min-[320px]:text-[30px] font-semibold`}
                    >
                        Universe Fitness
                    </label>
                </div>
            </Link>
            {/* <div
                className={`flex items-center rounded-md bg-blend-lighten  mt-6 ${
                    !open ? 'px-2.5' : 'px-4'
                }`}>
                <AiFillHome
                    className={`text-white text-lg block float-left cursor-pointer mr-2 ${
                        open && 'mr-2'
                    }`}
                />
                <label
                    className={`text-base bg-transparent text-white ${
                        !open && 'hidden'
                    }`}>
                    Home
                </label>
            </div> */}
            <ul className="pt-2 mt-6">
                {Menu.map((menu, index) => (
                    <>
                        {menu.secure === false && (
                            <li
                                key={index}
                                className={`text-gray-300 text-sm flex items-center justify-center duration-200 gap-x-4 mx-auto cursor-pointer p-4 hover:bg-gray-500 rounded-md mt-2`}
                                onClick={() => {
                                    if (menu?.clicked === true) {
                                        setIsClicked((state) => !state);
                                    } else {
                                        navigate(menu?.link);
                                    }
                                }}
                            >
                                <span className="text-2xl block float-left  ">
                                    {menu.icon}
                                </span>

                                <span
                                    className={`text-medium font-medium flex-1 duration-200 ${
                                        !open && 'hidden'
                                    }`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                        )}
                        {menu.secure === true && account.email !== null && (
                            <li
                                key={index}
                                className={`text-gray-300 text-sm flex items-center justify-center duration-200 gap-x-4 mx-auto cursor-pointer p-4 hover:bg-gray-500 rounded-md mt-2`}
                                onClick={() => {
                                    if (menu?.clicked === true) {
                                        setIsClicked((state) => !state);
                                    } else {
                                        if (
                                            account.roles[0].name !== 'MEMBER'
                                        ) {
                                            navigate(menu?.link);
                                        } else {
                                            if (account.hasProgram === true) {
                                                navigate(menu?.link);
                                            } else {
                                                toast.error(
                                                    'Please wait for a little bit, our trainer will set up a workout program for you right away.Thank you so much',
                                                    {
                                                        position:
                                                            toast.POSITION
                                                                .TOP_RIGHT,
                                                    },
                                                );
                                            }
                                        }
                                    }
                                }}
                            >
                                <span className="text-2xl block float-left  ">
                                    {menu.icon}
                                </span>

                                <span
                                    className={`text-medium font-medium flex-1 duration-200 ${
                                        !open && 'hidden'
                                    }`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                        )}

                        {isClicked && (
                            <ul className="pl-8">
                                {menu.subMenu?.map((subMenu, index) => (
                                    <li
                                        key={index}
                                        className={`text-gray-300 text-sm flex items-center justify-center duration-200 gap-x-4 mx-auto cursor-pointer p-4 hover:bg-gray-500 rounded-md mt-2`}
                                        onClick={() => {
                                            if (
                                                account.roles[0].name !==
                                                    'MEMBER' ||
                                                (account.hasProgram === true &&
                                                    account.roles[0].name ===
                                                        'MEMBER') ||
                                                subMenu.title ===
                                                    'Calories Calculator'
                                            ) {
                                                navigate(subMenu.link);
                                            } else {
                                                toast.error(
                                                    'Please wait for a little bit, our trainer will set up a workout program for you right away.Thank you so much',
                                                    {
                                                        position:
                                                            toast.POSITION
                                                                .TOP_RIGHT,
                                                    },
                                                );
                                            }
                                            // navigate(subMenu.link)
                                        }}
                                    >
                                        <span className="text-2xl block float-left  ">
                                            {subMenu.icon}
                                        </span>
                                        <span
                                            className={`text-medium font-medium flex-1 duration-200 ${
                                                !open && 'hidden'
                                            }`}
                                        >
                                            {subMenu.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ))}
            </ul>
            <div className="toast-container">
                <ToastContainer limit={2} />
            </div>
        </div>
    );
};

export default SideBar;
