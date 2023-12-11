import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ setOpenRegisterModal, setOpenLoginModal }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const navigate = useNavigate();

    const password = watch('password', '');
    const confirmPassword = watch('confirmPassword', '');

    const onSubmit = async (data) => {
        console.log(data); // You can handle form submission logic here
        try {
            const response = await AuthService.register(
                data.firstName,
                data.lastName,
                data.email,
                data.password,
                data.matchingPassword,
            );
            setOpenLoginModal(true);
            setOpenRegisterModal(false);
            navigate(`/otp/${data.email}`);
        } catch (err) {
            toast.error('Register failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <div
            class="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50
            justify-center items-center flex bg-[#00000080] "
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setOpenRegisterModal(false);
            }}
        >
            <div
                class=" scrollbar-hide overflow-y-scroll max-h-[95vh]
                bg-white text-black font-bold shadow-md shadow-[#364e7e1a]
                max-w-6xl mx-auto w-full px-1  rounded-xl"
            >
                <div class="flex justify-center px-6 py-12">
                    <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div
                            class="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-no-repeat bg-cover bg-center rounded-l-lg"
                            style={{
                                backgroundImage: `url("https://origympersonaltrainercourses.co.uk/files/img_cache/39553/1920_1692618507_personaltrainermarketingreferral.jpeg?1692618955")`,
                            }}
                        ></div>

                        <div class="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                            <h3 class="py-4 text-2xl text-center text-gray-800 dark:text-white">
                                Create an Account!
                            </h3>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                class="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
                            >
                                <div class="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 w-[45%]">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="firstName"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            {...register('firstName', {
                                                required:
                                                    'First Name is required',
                                            })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.firstName.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4 w-[45%]">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="lastName"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            {...register('lastName', {
                                                required:
                                                    'Last Name is required',
                                            })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                        {errors.lastName && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4 w-full">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message:
                                                    'Invalid email address',
                                            },
                                        })}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div class="mb-4 md:flex md:justify-between w-full">
                                    <div className="mb-4 w-[45%]">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            {...register('password', {
                                                required:
                                                    'Password is required',
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        'Password must be at least 6 characters',
                                                },
                                            })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-4 w-[45%]">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="matchingPassword"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="matchingPassword"
                                            {...register('matchingPassword', {
                                                required:
                                                    'Confirm Password is required',
                                                validate: (value) =>
                                                    value === password ||
                                                    'The passwords do not match',
                                            })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                        {errors.matchingPassword && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {
                                                    errors.matchingPassword
                                                        .message
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div class="mb-6 text-center">
                                    <button
                                        disabled={isSubmitting}
                                        class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr class="mb-6 border-t" />
                                <div class="text-center">
                                    <a
                                        class="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                        href="#"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                                <div class="text-center">
                                    <a
                                        class="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                        href="./index.html"
                                    >
                                        Already have an account? Login!
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;

// <div class="md:ml-2">
//                                         <label
//                                             class="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
//                                             for="c_password"
//                                         >
//                                             Confirm Password
//                                         </label>
//                                         <input
//                                             class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                             id="c_password"
//                                             type="password"
//                                             placeholder="******************"
//                                         />
//                                     </div>
