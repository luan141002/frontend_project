import React, { useState } from 'react';

const ProgramCard = ({ program, setOpenLoginModal }) => {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <div
            className={`flex bg-cover p-[25px] lg:w-[600px] min-[320px]:w-full lg:h-[300px] min-[320px]:h-[400px] m-auto  ${
                showDescription === true ? ' bg-opacity-50 bg-[#00000080]' : ''
            } `}
            style={{
                backgroundImage: `url('${program.image}')`,
            }}
            onMouseOver={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}
        >
            <div className={`text-white flex flex-col self-start`}>
                <label className="text-[40px] font-bold ">
                    {program.title}
                </label>

                <ul
                    className={`text-white text-[15px] font-thin italic ${
                        showDescription === true ? '' : 'hidden'
                    } `}
                >
                    {program.description.map((des) => (
                        <li>{des}</li>
                    ))}
                </ul>
            </div>
            <div
                className="flex self-end justify-self-end "
                onClick={() => setOpenLoginModal(true)}
            >
                <button className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center uppercase text-white  text-medium  hover:border hover:border-white">
                    join now
                </button>
            </div>
        </div>
    );
};

export default ProgramCard;
