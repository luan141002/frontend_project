import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircle,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
const Home = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    const backgroundImages = [
        'https://img.ws.mms.shopee.vn/vn-11134210-7qukw-lih5tbrcplho9b',
        'https://vcdn-giaitri.vnecdn.net/2022/04/29/image001-2296-1651230581.jpg',
        'https://icdn.dantri.com.vn/thumb_w/680/2022/07/04/1656907628444levents-l-dantridocx-1656921163686.png',
        'https://tq4.mediacdn.vn/pr/2022/photo1656471307625-16564713077131202000349-63792200649093.jpg',
    ];
    const currentBackground = useMemo(
        () => backgroundImages[backgroundIndex],
        [backgroundIndex]
    );
    useEffect(() => {
        // Thiết lập một timeout sau 2 giây để thay đổi nền
        const timer = setTimeout(() => {
            setBackgroundIndex((backgroundIndex + 1) % backgroundImages.length);
        }, 2000);

        // Xóa timeout khi component unmount hoặc khi backgroundIndex thay đổi
        return () => clearTimeout(timer);
    }, [backgroundIndex, backgroundImages]);
    return (
        <div className='bg-[#151212] w-full min-h-min'>
            {/* Thumbnail */}
            <div className='flex flex-col '>
                <div
                    className='w-full px-[10px] lg:h-[550px]  flex items-center justify-between bg-no-repeat bg-cover bg-center md:h-[400px] sm:h-[400px] min-[320px]:h-[200px] '
                    style={{
                        backgroundImage: `url(${currentBackground})`,
                    }}>
                    <button
                        className='mb-[10px] mr-[5px] w-[50px] h-[50px] bg-black opacity-60 rounded-full text-white flex justify-center items-center'
                        onClick={() => {
                            setBackgroundIndex((prev) => {
                                const prevIndex =
                                    prev > 0
                                        ? prev - 1
                                        : backgroundImages.length - 1;
                                console.log(prevIndex);
                                return prevIndex;
                            });
                        }}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button
                        className='mb-[10px] mr-[5px] w-[50px] h-[50px] bg-black opacity-60 rounded-full text-white flex justify-center items-center'
                        onClick={() => {
                            setBackgroundIndex(
                                (prev) => (prev + 1) % backgroundImages.length
                            );
                        }}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
                <div className='flex justify-center mt-2'>
                    {backgroundImages.map((image, index) => {
                        return (
                            <button
                                key={index}
                                className='mb-[10px] mr-[5px] text-[#520404]'
                                onClick={() => {
                                    setBackgroundIndex(index);
                                }}>
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className='hover:border hover:border-white rounded-full'
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className='py-5 my-8 text-center text-white '>
                <label className='text-2xl leading-8 font-semibold'>
                    OUR SERVICES
                </label>
                <p className='text-center text-xs font-thin italic'>
                    Luyện tập tại CITIGYM sẽ giúp bạn đạt được mục tiêu sức khỏe
                    <br />
                    và hình thể.
                </p>
            </div>
            <div className='w-full gap-x-6 grid lg:grid-cols-2  sm:grid-cols-1 min-[320px]:grid-cols-1 p-4 '>
                <div
                    className='lg:w-[600px] min-[320px]:w-full lg:h-[300px] min-[320px]:h-[200px] '
                    style={{
                        backgroundImage: `url(${currentBackground})`,
                    }}></div>
                <div
                    className='w-[600px] h-[300px] '
                    style={{
                        backgroundImage: `url(${currentBackground})`,
                    }}></div>
                <div
                    className='w-[400px] h-[300px]'
                    style={{
                        backgroundImage: `url(${currentBackground})`,
                    }}></div>
            </div>
        </div>
    );
};

export default Home;
