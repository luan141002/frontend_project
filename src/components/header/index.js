import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import LogoImage from '../../public/logo-image.png';
import Vietnamese from '../../public/Vietnamese-logo.svg.png';
const Header = () => {
    return (
        <div className='bg-[#151212] w-[95%] h-[80px] fixed flex justify-between items-center border-b border-b-[#3D3030] p-4 z-40'>
            <div className='flex justify-between items-center'>
                {/* <img
                        src={LogoImage}
                        alt='Logo'
                        className='w-[62px] h-[49px]  rotate-[-36.20deg]'
                    /> */}
                <label className='text-[#980B0B]  lg:text-[40px] sm:text-[30px] min-[320px]:text-[30px] font-semibold'>
                    LOGO
                </label>
            </div>
            {/* search section */}
            <div class='relative hidden md:block w-[40%] h-[60%] '>
                <div class='absolute h-[40px] w-[10%]  right-0 flex items-center justify-center  hover:bg-black hover:text-white  '>
                    <svg
                        class='w-4 h-[100%] flex self-center text-base text-black hover:text-white dark:text-gray-400 '
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'>
                        <path
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        />
                    </svg>
                </div>
                <input
                    type='text'
                    id='search-navbar'
                    class='block w-full p-2 pl-3 text-sm bg-white text-gray-900 border border-gray-300   focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black'
                    placeholder='Search exercises, post, video,...'
                />
            </div>
            <div className='flex justify-between items-center space-x-6 bg-transparent'>
                {/* Language Option logo  */}
                <img
                    src={Vietnamese}
                    alt='vietnamese logo'
                    className='w-[25px] h-4 border border-stone-50'
                />
                <FontAwesomeIcon
                    icon={faUser}
                    className='w-[20px] h-[20px] text-[#980B0B]'
                />
                <FontAwesomeIcon
                    icon={faBars}
                    className='w-[35px] h-[35px] text-[#980B0B]'
                />
            </div>
        </div>
    );
};

export default Header;
