import React, { useState, useEffect } from 'react';
import accountsSlices from '../../redux/accountsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import MemberService from '../../services/MemberService';

const UserProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const navigate = useNavigate();
    const [isAccountEdit, setIsAccountEdit] = useState(false);
    const account = useSelector((state) => state.account);
    const [userProfile, setUserProfile] = useState();

    const loadPage = async () => {
        const userProfile = await MemberService.getMemberByEmail(account.email);

        setUserProfile(userProfile);
    };

    useEffect(() => {
        console.log(userProfile);
        loadPage();
    }, []);

    const onSubmit = async (data) => {
        // You can handle form submission logic here
        console.log(data);
    };
    return (
        <div className="w-full flex flex-col items-start justify-center min-h-fit">
            <section class="w-[50%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-10 space-y-3">
                <div className="flex justify-between ">
                    <div className="flex space-x-3">
                        <img
                            className="w-[60px] h-[60px] rounded-full bg-cover bg-center border border-whiteS"
                            src={userProfile?.user?.avatar}
                            alt="blog avatar"
                        />

                        <div className="">
                            <label
                                htmlFor=""
                                className="text-xl capitalize text-gray-800 font-medium"
                            >
                                {userProfile?.firstName +
                                    ' ' +
                                    userProfile?.lastName}
                            </label>
                            <p>{account?.email}</p>
                            <p className="text-xs">{account?.roles[0]?.name}</p>
                        </div>
                    </div>

                    <button
                        type="reset"
                        className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  hover:opacity-80"
                        onClick={() => setIsAccountEdit((state) => !state)}
                    >
                        Edit Account
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="grid gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label
                                class="text-gray-800 dark:text-gray-200"
                                for="firstName"
                            >
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder={userProfile?.firstName}
                                class="block w-full px-4 py-2 mt-2 te/xt-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('firstName')}
                            />
                        </div>

                        <div>
                            <label
                                class="text-gray-800 dark:text-gray-200"
                                for="lastName"
                            >
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder={userProfile?.lastName}
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('lastName')}
                            />
                        </div>

                        <div>
                            <label
                                class="text-gray-800 dark:text-gray-200"
                                for="Email"
                            >
                                Email Address
                            </label>
                            <input
                                id="Email"
                                type="email"
                                value={account?.email}
                                disabled
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('email')}
                            />
                        </div>

                        <div>
                            <label
                                class="text-gray-800 dark:text-gray-200"
                                for="memberLevel"
                            >
                                Member Level
                            </label>
                            <input
                                id="memberLevel"
                                type="text"
                                value={userProfile?.memberLevel}
                                disabled
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                {...register('memberLevel')}
                            />
                        </div>

                        <div>
                            <label
                                class="text-gray-800 dark:text-gray-200"
                                for="personalLevel"
                            >
                                Personal Level
                            </label>
                            <input
                                id="personalLevel"
                                type="text"
                                value={userProfile?.personalLevel}
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                memberLevel
                                {...register('personalLevel')}
                            />
                        </div>

                        <div>
                            <label
                                class="text-gray-800 dark:text-gray-200"
                                for="dob"
                            >
                                Date Of Birth
                            </label>
                            <input
                                id="dob"
                                type="date"
                                class="block w-full px-4 py-2 mt-2 text-g/ray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label
                                class="text-gray-800 dark:text-gray-200"
                                for="personalTrainer"
                            >
                                Personal Trainer
                            </label>
                            <input
                                id="personalTrainer"
                                type="textarea"
                                disabled
                                value={
                                    userProfile?.personalTrainer?.firstName +
                                    ' ' +
                                    userProfile?.personalTrainer?.lastName
                                }
                                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            ></input>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-800">
                                Image
                            </label>
                            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <svg
                                        class="mx-auto h-12 w-12 text-gray-700"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <div class="flex text-sm text-gray-800 ">
                                        <label
                                            for="file-upload"
                                            class="relative cursor-pointer text-gray-800  bg-white rounded-md font-medium  hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span class="">Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                class="sr-only"
                                            />
                                        </label>
                                        <p class="pl-1 text-gray-800">
                                            or drag and drop
                                        </p>
                                    </div>
                                    <p class="text-xs text-gray-800">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            class="px-8 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-800 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </section>
            {/* {isAccountEdit && (
                <section class="w-[50%] p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
                    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                        Account settings
                    </h2>

                    <form>
                        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label
                                    class="text-gray-700 dark:text-gray-200"
                                    for="username"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={userProfile.user.email}
                                    disabled
                                    class="block w-full px-4 py-2 mt-2 te/xt-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label
                                    class="text-gray-700 dark:text-gray-200"
                                    for="emailAddress"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="emailAddress"
                                    type="email"
                                    class="block w-full px-4 py-2 mt/-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label
                                    class="text-gray-700 dark:text-gray-200"
                                    for="password"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={userProfile.user.password}
                                    disabled
                                    class="block w-full px-4 py-2 mt-/2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label
                                    class="text-gray-700 dark:text-gray-200"
                                    for="passwordConfirmation"
                                >
                                    Password Confirmation
                                </label>
                                <input
                                    id="passwordConfirmation"
                                    type="password"
                                    class="block w-full p/x-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                        </div>

                        <div class="flex justify-end mt-6">
                            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Save
                            </button>
                        </div>
                    </form>
                </section>
            )} */}
        </div>
    );
};

export default UserProfile;
