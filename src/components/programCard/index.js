import React, { useState } from 'react';

const ProgramCard = ({ program, setOpenLoginModal }) => {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <div
            className={`flex bg-cover p-[25px] lg:w-[600px] min-[320px]:w-full lg:h-[300px] min-[320px]:h-[400px] m-auto relative  ${
                showDescription ? ' bg-[#00000080]' : ''
            } `}
            style={{
                backgroundImage: `url('${program.image}')`,
                backgroundBlendMode: showDescription ? 'overlay' : 'normal',
            }}
            onMouseOver={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
        >
            <div
                className={`${'text-white'} flex flex-col self-start transition-opacity duration-300`}
            >
                <label
                    className="text-[40px] font-bold "
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
                >
                    {program.title}
                </label>

                <ul
                    className={`text-white text-[15px] font-thin italic ${
                        showDescription ? 'opacity-90' : 'opacity-0'
                    }`}
                >
                    {program.description.map((des, index) => (
                        <li key={index}>{des}</li>
                    ))}
                </ul>
            </div>
            <div
                className="flex self-end justify-self-end "
                onClick={() => setOpenLoginModal(true)}
            >
                <button className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center uppercase text-white text-medium hover:border hover:border-white transition-opacity duration-300">
                    join now
                </button>
            </div>
        </div>
    );
};

export default ProgramCard;
