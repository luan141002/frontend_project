import { Label } from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const TargetPage = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        // Xử lý dữ liệu khi form được gửi
        navigate('/');
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-lg mx-auto my-4 bg-gray-200 p-8"
            >
                <Label className="text-[30px] font-bold">
                    Enter your BMI goal for the program{' '}
                </Label>
                <div className="flex items-center  border-b-2 border-red-700 py-2">
                    <input
                        {...register('target', { required: true })}
                        type="number"
                        placeholder="Enter target..."
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <button
                        className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center  text-white  text-medium  hover:border hover:border-white"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TargetPage;
