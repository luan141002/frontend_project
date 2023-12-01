import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../../services/AuthService';
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const navigate = useNavigate();
    const account = useSelector((state) => state.account);
    const password = watch('password', '');
    const onSubmit = async (data) => {
        // You can handle form submission logic here
        console.log(data);
        const userId = 6;
        try {
            await AuthService.changePassword(
                account.memberId,
                data.password,
                data.verifyCode,
            );
            navigate('/');
        } catch (err) {}
    };
    return (
        <div>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form
                            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
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
                            <div>
                                <label
                                    for="verificationCode"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    id="verifyCode"
                                    placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register('verifyCode', {
                                        required: 'verifyCode is required',
                                        minLength: 8,
                                        maxLength: 8,
                                    })}
                                />
                                {errors.verifyCode && (
                                    <span>{errors.verifyCode.message}</span>
                                )}
                            </div>
                            <div>
                                <label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            <div>
                                <label
                                    for="confirm-password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register('matchingPassword', {
                                        required:
                                            'Confirm Password is required',
                                        validate: (value) =>
                                            value === password ||
                                            'The passwords do not match',
                                    })}
                                />
                                {errors.matchingPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.matchingPassword.message}
                                    </p>
                                )}
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input
                                        id="newsletter"
                                        aria-describedby="newsletter"
                                        type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                    />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label
                                        for="newsletter"
                                        class="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{' '}
                                        <a
                                            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                class="w-full bg-green-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Reset passwod
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResetPassword;
