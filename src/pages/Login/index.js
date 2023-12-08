import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import MemberService from '../../services/MemberService.js';
import { useDispatch } from 'react-redux';
import accountSlices from '../../redux/accountsSlice.js';

const LoginPage = ({
    setOpenLoginModal,
    setAuthenticated,
    setOpenRegisterModal,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const password = watch('password', '');
    const onSubmit = async (data) => {
        // You can handle form submission logic here
        console.log(data);
        setOpenLoginModal(false);
        try {
            const { user } = await AuthService.login(data.email, data.password);
            console.log(user.roles[0].name);
            if (user.roles[0].name === 'MEMBER') {
                const member = await MemberService.getMemberByEmail(data.email);
                dispatch(
                    accountSlices.actions.setAccount({
                        memberId: member.id,
                        firstName: member.firstName,
                        lastName: member.lastName,
                        email: user.email,
                        id: user.id,
                        roles: user.roles,
                        hasProgram: member.hasProgram,
                    }),
                );
                if (member.hasProgram === false) {
                    navigate('/tools/bmi-calculator');
                } else {
                    navigate('/');
                }
            }
            if (user.roles[0].name === 'PERSONAL_TRAINER') {
                const pts = await MemberService.getPTs();
                console.log(pts);
                const pt = pts.find((pt) => pt.user.id === user.id);
                console.log(pt);
                dispatch(
                    accountSlices.actions.setAccount({
                        memberId: pt.id,
                        firstName: pt.firstName,
                        lastName: pt.lastName,
                        email: pt.user.email,
                        id: user.id,
                        roles: user.roles,
                    }),
                );
                navigate('/');
            }
        } catch (err) {}
    };

    return (
        <div
            className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50
        justify-center items-center flex bg-[#00000080] "
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setOpenLoginModal(false);
            }}
        >
            <div
                class="py-16 scrollbar-hide overflow-y-scroll max-h-[95vh]
                bg-white text-black font-bold shadow-md shadow-[#364e7e1a]
                max-w-3xl mx-auto w-full px-8  rounded-xl"
            >
                <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div
                        class="hidden lg:block lg:w-1/2 bg-no-repeat bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://origympersonaltrainercourses.co.uk/files/img_cache/39553/1920_1692618507_personaltrainermarketingreferral.jpeg?1692618955')",
                        }}
                    ></div>
                    <div class="w-full p-8 lg:w-1/2">
                        <h2 class="text-2xl font-semibold text-gray-700 text-center">
                            Brand
                        </h2>
                        <p class="text-xl text-gray-600 text-center">
                            Welcome back!
                        </p>
                        <a
                            href="#"
                            class="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                        >
                            <div class="px-4 py-3">
                                <svg class="h-6 w-6" viewBox="0 0 40 40">
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#FFC107"
                                    />
                                    <path
                                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                        fill="#FF3D00"
                                    />
                                    <path
                                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                        fill="#4CAF50"
                                    />
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#1976D2"
                                    />
                                </svg>
                            </div>
                            <h1 class="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                                Sign in with Google
                            </h1>
                        </a>
                        <div class="mt-4 flex items-center justify-between">
                            <span class="border-b w-1/5 lg:w-1/4"></span>
                            <a
                                href="#"
                                class="text-xs text-center text-gray-500 uppercase"
                            >
                                or login with email
                            </a>
                            <span class="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="mt-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">
                                    Email Address
                                </label>
                                <input
                                    class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="email"
                                    id="email"
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
                            </div>
                            <div class="mt-4">
                                <div class="flex justify-between">
                                    <label class="block text-gray-700 text-sm font-bold mb-2">
                                        Password
                                    </label>
                                    <Link
                                        to={'/forget-password'}
                                        class="text-xs text-gray-500"
                                    >
                                        Forget Password?
                                    </Link>
                                </div>
                                <input
                                    class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    id="password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: 6,
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div class="mt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                                    // onClick={() => {
                                    //     setOpenLoginModal(false);
                                    //     // setAuthenticated(true);
                                    // }}
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div class="mt-4 flex items-center justify-between">
                            <span class="border-b w-1/5 md:w-1/4"></span>
                            <div
                                class="text-xs text-gray-500 uppercase hover:text-orange-600 "
                                onClick={() => {
                                    setOpenLoginModal(false);
                                    setOpenRegisterModal(true);
                                }}
                            >
                                or sign up
                            </div>
                            <span class="border-b w-1/5 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
