import { Label } from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import MemberService from '../../services/MemberService';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TargetPage = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const account = useSelector((state) => state.account);
    const { ptId } = useParams();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await MemberService.assignPT(
                +account.memberId,
                +ptId,
                data.target,
            );
            if (response.status === 200) navigate('/waiting-for-plan');
            else {
            }
        } catch (err) {
            toast.error('Assign PT failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-lg mx-auto my-4 bg-gray-200 p-8"
            >
                <Label className="text-[30px] font-bold">
                    Enter your goal for the program{' '}
                </Label>
                <div className="flex items-center  border-b-2 border-red-700 py-2">
                    <input
                        {...register('target', { required: true })}
                        type="text"
                        placeholder="Enter target..."
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <button
                        className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center  text-white  text-medium  hover:border hover:border-white"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default TargetPage;
