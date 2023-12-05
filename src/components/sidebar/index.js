import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import LogoImage from '../../public/logo-image.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconName, AiFillHome } from 'react-icons/ai';

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const account = useSelector((state) => state.account);

    const Menu = [
        { title: 'Exercises', link: '/exercises', clicked: false, icon: '' },
        { title: 'Blogs', link: '/blogs', clicked: false, icon: '' },
        {
            title: 'Dashboard',
            link: '/dashboard',
            clicked: false,
            spacing: true,
            icon: '',
        },
        {
            title: 'Tools',
            link: '/',
            icon: '',
            clicked: true,
            subMenu: [
                {
                    title: 'Calories Calculator',
                    link: `/tools/calories-calculator`,
                    clicked: false,
                    icon: '',
                },
                {
                    title: 'BMI Calculator',
                    link: `/tools/bmi-calculator`,
                    clicked: false,
                    icon: '',
                },
            ],
        },
        {
            title: 'Profile',
            link: `/user/user-profile`,
            clicked: false,
            icon: '',
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
                setIsClicked((state) => !state);
            }}
        >
            {/* <FaArrowLeft
                className={`bg-white text-black text-xl rounded-full absolute -right-2 top-9 border cursor-pointer ${
                    !open && 'rotate-180'
                }`}
                onClick={() => setOpen(!open)}
            /> */}
            <div class="bg-[#3D3030] h-[0.5px]  w-full  "></div>
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
                    } duration-200 lg:text-[40px] sm:text-[30px] min-[320px]:text-[30px] font-semibold`}
                >
                    LOGO
                </label>
            </div>
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
                                <AiFillHome />
                            </span>

                            <span
                                className={`text-medium font-medium flex-1 duration-200 ${
                                    !open && 'hidden'
                                }`}
                            >
                                {menu.title}
                            </span>
                        </li>

                        {isClicked && (
                            <ul className="pl-8">
                                {menu.subMenu?.map((subMenu, index) => (
                                    <li
                                        key={index}
                                        className={`text-gray-300 text-sm flex items-center justify-center duration-200 gap-x-4 mx-auto cursor-pointer p-4 hover:bg-gray-500 rounded-md mt-2`}
                                        onClick={() => navigate(subMenu.link)}
                                    >
                                        <span className="text-2xl block float-left  ">
                                            <AiFillHome />
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
        </div>
    );
};

export default SideBar;
