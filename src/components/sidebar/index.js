import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import LogoImage from '../../public/logo-image.png' ;

import { IconName } from 'react-icons/ai';

const SideBar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div
            className={`bg-black h-screen p-5 pt-8 w-72 ${
                open ? 'w-72' : 'w-20'
            } duration-300 relative z-50`}>
            <FaArrowLeft
                className={`bg-white text-black text-xl rounded-full absolute -right-2 top-9 border cursor-pointer ${
                    !open && 'rotate-180'
                }`}
                onClick={() => setOpen(!open)}
            />
            <div className='inline-flex justify-between items-center'>
                    <img
                        src={LogoImage}
                        alt='Logo'
                        className='w-[62px] h-[49px] cursor-pointer block rotate-[-36.20deg]'
                    />
                    <label className={`text-[#980B0B] ${!open && "scale-0"} duration-300 lg:text-[40px] sm:text-[30px] min-[320px]:text-[30px] font-semibold`}>
                        LOGO
                    </label>
                </div>
        </div>
    );
};

export default SideBar;
