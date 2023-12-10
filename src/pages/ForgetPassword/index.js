import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../../services/AuthService';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const onSubmit = async (data) => {
        // You can handle form submission logic here
        console.log(data);

        try {
            await AuthService.forgotPassword(data.email);
            navigate('/reset-password');
        } catch (err) {
            toast.error('Send Verification Code failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <div className="w-full h-screen flex items-center justify-center ">
            <div class="max-w-xl mx-auto my-10 bg-white p-8 rounded-xl w-full shadow shadow-slate-300">
                <h1 class="text-4xl font-medium">Reset password</h1>
                <p class="text-slate-500">
                    Fill up the form to reset the password
                </p>

                <form action="" class="my-10" onSubmit={handleSubmit(onSubmit)}>
                    <div class="flex flex-col space-y-5">
                        <label for="email">
                            <p class="font-medium text-slate-700 pb-2">
                                Email address
                            </p>
                            <input
                                id="email"
                                type="email"
                                class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Enter email address"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </label>

                        <button
                            class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                />
                            </svg>

                            <span>Reset password</span>
                        </button>
                        <p class="text-center">
                            Not registered yet?{' '}
                            <Link
                                to={'/'}
                                class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                            >
                                <span>Register now </span>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgetPassword;
