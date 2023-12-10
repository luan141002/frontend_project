import React, { useState, useMemo } from 'react';
import UserCard from '../../components/userCard';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import MemberService from '../../services/MemberService';
import { useEffect } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PickTrainer = () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [PTs, setPTs] = useState();
    const loadPage = async () => {
        try {
            const pts = await MemberService.getPTs();
            setPTs(pts.slice(0, 3));
        } catch (err) {
            toast.error('Load Trainers failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className="p-3 w-full h-fit">
            <Link to={'/'}>
                <div className="flex w-fit items-center gap-2 font-normal px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer text-red-500">
                    <span className="text-xl rotate-180">
                        <HiOutlineLogout />
                    </span>
                    Back to Homepage
                </div>
            </Link>
            <div className="w-full grid grid-cols-3 h-fit gap-2 mt-[3%]">
                {PTs?.map((pt, index) => (
                    <UserCard index={index} PT={pt} />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default PickTrainer;
