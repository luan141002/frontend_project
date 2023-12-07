import React from 'react';
import ProgramCard from '../../components/programCard';
import { useForm, Controller } from 'react-hook-form';

const About = () => {
    const programs = [
        {
            title: 'BODY RECOMPOSITION',
            description: [
                'Goal: increase muscle while minimizing body fat ',
                'Accompanied by a specialized weight training program',
                'Suitable goals: develop muscle, lose fat, change your body dramatically',
            ],
            image: 'https://www.muscleandfitness.com/wp-content/uploads/2017/11/hany-jeremy.jpg?quality=86&strip=all',
        },
        {
            title: 'FAT LOSS',
            description: [
                'Goal: Rapid and Safe Fat Loss',
                'Improve lipid profiles and cardiovascular health',
                "Follow an athlete's diet",
                'Appropriate goal: Weight loss, fat burning, rapid body composition changes',
            ],
            image: 'https://athleticsweekly.com/wp-content/uploads/2020/11/PT-image-via-OriGym.jpg',
        },
        {
            title: 'REHABILITATION - FUNCTIONAL TRAINING',
            description: [
                'Program with multiple objectives to enhance the quality of life',
                'Guide precise execution of fundamental movements in daily activities',
                'Target audience: seniors, individuals recovering from injuries, obese individuals, those with posture misalignment',
            ],
            image: 'https://www.basic-fit.com/on/demandware.static/-/Library-Sites-basic-fit-shared-library/default/dwf0cbd84f/Roots/Blog/Blog-Header/1088x612/19-07-Blog-fitness-training-personal-training.png',
        },
        {
            title: 'STRENGTH TRAINING',
            description: [
                'Build muscle mass, enhance neural adaptability, cardiovascular fitness',
                'Train muscles, tendons, ligaments, increase bone density, and improve joint function',
                'Facilitate lifting the maximum weight with ease',
                'Appropriate goals: increase strength, gain weight, body conditioning',
            ],
            image: 'https://www.muscleandfitness.com/wp-content/uploads/2018/12/Personal-Trainer-Training-Partner-GettyImages-654427364.jpg?quality=86&strip=all',
        },
    ];
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // You can handle form submission here
        console.log(data);
    };
    return (
        <section
            className="px-4 flex flex-col items-center min-h-fit  overflow-scroll scrollbar-hide w-full bg-[#151212]"
            id="about"
        >
            <div
                className="text-white flex flex-col self-start mb-[3%] w-full bg-cover
                    bg-center p-6 h-[300px] "
                style={{
                    backgroundImage:
                        'url("https://i.ytimg.com/vi/-8xSX8M6Y80/maxresdefault.jpg")',
                }}
            >
                <label className="text-red-700 text-[45px] font-bold ">
                    Program Packages
                </label>
                <p className="text-red-800 text-[18px] font-thin italic">
                    List of Program Package
                </p>
            </div>
            <div className="mt-8 mx-auto text-white w-[80%] flex flex-col items-center">
                <h2 className="text-3xl font-black uppercase text-center lg:text-left">
                    A little about Program Packages
                </h2>
                <nav className="h-8 mt-7">
                    <ul className="text-sm font-medium flex justify-center lg:justify-start gap-4">
                        <li className="hover:text-sbPallet-accent hover:border-sbPallet-accent hover:border-b-2 pb-3 cursor-pointer">
                            About the service
                        </li>
                        <li className="hover:text-sbPallet-accent hover:border-sbPallet-accent hover:border-b-2 pb-3 cursor-pointer">
                            Who suits
                        </li>
                        <li className="hover:text-sbPallet-accent hover:border-sbPallet-accent hover:border-b-2 pb-3 cursor-pointer">
                            Levels
                        </li>
                    </ul>
                </nav>

                <div className="max-w-[572px] lg:mt-12">
                    <p className="text-sm text-center">
                        These projects is designed to help you achieve the
                        desired shape for the benefit of your health. An
                        individual diet will be developed for each participant,
                        taking into account your daily routine, as well as
                        medical indications. You will learn to eat the right
                        foods in the right amount, as a result of which the
                        weight will melt without a trace and without return. And
                        for this you do not have to starve!
                    </p>
                    <p className="mt-7 text-sm text-center">
                        Also, if you wish, you can choose a training program,
                        and under the supervision of experienced trainers, do it
                        right at home. Your progress will be recorded weekly in
                        your profile in your personal account.
                    </p>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 h-fit gap-2 mt-[5%]">
                {programs.map((program, index) => (
                    <ProgramCard key={index} program={program} />
                ))}
            </div>

            <div
                className="w-full space-y-3 text-white flex items-center justify-center bg-red-900 bg-center bg-no-repeat bg-cover mt-[5%]"
                style={{
                    backgroundImage:
                        'url("https://images.ctfassets.net/8urtyqugdt2l/2c8YKdEPsP9CfRhbmzT3CX/8f46c3d884d12e14a2b8eed10dcf291c/Gymshark_Legacy_Collection_2023.jpg")',
                }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3 w-[60%] h-[500px] flex flex-col justify-center items-center"
                >
                    <label className="text-2xl leading-8 font-semibold my-5">
                        CONTACT US
                    </label>
                    <div className=" w-[90%]">
                        <input
                            type="text"
                            className="w-full p-2 border-b-2 border-red-800 text-black"
                            placeholder="Full Name"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div className="flex space-x-3 w-[90%]">
                        <div className=" w-[50%]">
                            <input
                                type="text"
                                className="w-full p-2 border-b-2 border-red-800 text-black"
                                placeholder="Email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: /^\S+@\S+$/i,
                                })}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div className=" w-[50%]">
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Phone Number"
                                className="w-full p-2 border-b-2 border-red-800 text-black"
                                {...register('phone', {
                                    required: 'Phone is required',
                                })}
                            />
                            {errors.phone && (
                                <p className="text-red-600">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="w-[90%]">
                        <textarea
                            className="w-full p-2 border-b-2 border-red-800 text-black"
                            placeholder="Message"
                            {...register('message', {
                                required: 'Message is required',
                            })}
                        />
                        {errors.message && <p>{errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="submitButton mr-[45px] flex self-end  justify-center items-center w-[120px] h-[50px] py-1 hover:border hover:border-white text-black bg-white  my-6 text-base leading-6 font-normal"
                    >
                        SEND
                    </button>
                </form>
            </div>
        </section>
    );
};

export default About;
