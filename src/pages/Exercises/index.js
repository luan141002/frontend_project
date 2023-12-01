import React, { useEffect, useRef, useState } from 'react';
import Dumbbell from '../../public/dumbbells.jpg';
import BodyWeight from '../../public/bodyweight.jpg';
import ExerciseBall from '../../public/exerciseball.jpg';
import Cables from '../../public/cables.jpg';
import Ezbar from '../../public/ezbar.jpg';
import Machine from '../../public/machine.jpg';
import Barbell from '../../public/barbell.jpg';
import MaleSide from '../../components/maleSide';
import FemaleSide from '../../components/femaleSide';

import TopRank from '../../components/top_rank';
import PostService from '../../services/PostService';
import ExerciseService from '../../services/ExerciseService';
import './exercises.css';

const Exercises = () => {
    const [TopArticles, setTopArticles] = useState();
    const loadPage = async () => {
        //const topArticleList = await PostService.getTopPosts();
        //setTopArticles(topArticleList.slice(0, 5));
    };

    useEffect(() => {
        loadPage();
    }, []);

    const ListEquipment = [
        {
            EquipmentImg: Dumbbell,
            EquipmentName: 'Dumbbell Exercises',
            EquipmentLink: '',
        },
        {
            EquipmentImg: BodyWeight,
            EquipmentName: 'BodyWeight Exercises',
            EquipmentLink: '',
        },
        {
            EquipmentImg: ExerciseBall,
            EquipmentName: 'Exercise Ball Exercises',
            EquipmentLink: '',
        },
        {
            EquipmentImg: Cables,
            EquipmentName: 'Cables Exercises',
            EquipmentLink: '',
        },
        {
            EquipmentImg: Ezbar,
            EquipmentName: 'Ezbar Exercises',
            EquipmentLink: '',
        },
        {
            EquipmentImg: Machine,
            EquipmentName: 'Machine Exercises',
            EquipmentLink: '',
        },
        {
            EquipmentImg: Barbell,
            EquipmentName: 'Barbell Exercises',
            EquipmentLink: '',
        },
        {
            EquipmentImg: Machine,
            EquipmentName: 'Machine Exercises',
            EquipmentLink: '',
        },
    ];
    const ListMechanics = [
        {
            EquipmentImg: Dumbbell,
            EquipmentName: 'Compound Exercises',
            EquipmentLink: '',
        },
        {
            EquipmentImg: BodyWeight,
            EquipmentName: 'Isolation Exercises',
            EquipmentLink: '',
        },
    ];
    const [open, setOpen] = useState(true);

    return (
        <div className="bg-gray-300 flex-col  w-full min-h-min">
            <div className=" flex justify-around w-full ">
                <div className="flex justify-center flex-nowrap w-[55%]">
                    <div className="mt-[5%] flex-col space-y-2 w-full">
                        <div className="text-white  flex flex-col self-start mb-[8%]">
                            <label className="text-[37px] font-bold ">
                                EXCERCISES BY MUSCLE GROUP
                            </label>
                            <p className="text-white text-[15px] font-thin italic">
                                Choose the muscle group you want to target. Once
                                in the muscle group, use the sort and filter
                                options <br /> to find the best exercises for
                                the equipment you have, your training
                                experience, and goals.
                            </p>
                        </div>
                        <div className="w-full h-[100%] ">
                            {open ? <MaleSide /> : <FemaleSide />}
                        </div>
                    </div>
                </div>
                <div className="w-[350px] bg-white h-screen flex self-start mt-[15%]  rounded-lg">
                    <div>
                        <div className="flex items-center space-x-3 p-5">
                            <span class=" text-sm font-medium text-gray-900 dark:text-gray-300">
                                Male
                            </span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={open}
                                    class="sr-only peer"
                                    onClick={() => setOpen(!open)}
                                />
                                <div class="w-11 h-6 bg-blue-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-300"></div>
                            </label>
                            <span class=" text-sm font-medium text-gray-900 dark:text-gray-300">
                                Female
                            </span>
                        </div>
                        <h1 className="font-bold text-2xl leading-6 ml-[20px]">
                            TOP MOST POPULAR
                            <br />
                            EXERCISES
                        </h1>
                        <div className="w-full space-y-1 mt-[20px] pl-3">
                            {TopArticles?.map((article, index) => {
                                return (
                                    <TopRank
                                        key={index}
                                        post={article}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                        <div className="w-full flex justify-center items-center mt-[30px]">
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100069291070202&tabs=time&width=320&height=200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                className="w-[320px] h-[200px] ml-[15px]"
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2 mt-[200px] space-y-3 text-center text-[#070A52] ">
                <label className="text-4xl leading-8 font-bold">
                    EXCERCISES BY EQUIPMENT
                </label>
                <p className="text-center text-base font-sm text-gray-700">
                    Don't have access to a gym? No problem. You can view
                    exercises by equipment required. Check out
                    <br />
                    our 5 day dumbbell workout for a dumbbell-only plan.
                </p>
            </div>
            <div class="lg:grid lg:grid-cols-4 md:grid-cols-3 items-center container mx-auto my-auto mt-[3%]">
                {ListEquipment?.map((equipment, index) => {
                    return (
                        <div
                            class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-transparent my-12 mx-8"
                            key={index}
                        >
                            <img
                                src={equipment?.EquipmentImg}
                                alt=""
                                class="overflow-hidden"
                            />

                            <div class="p-4 text-center">
                                <h3 class="font-semibold tracking-wide text-gray-800 text-lg my-2 leading-5 uppercase">
                                    {equipment?.EquipmentName}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="py-2 mt-[200px] space-y-3 text-center text-[#070A52] ">
                <label className="text-4xl leading-8 font-bold">
                    EXCERCISES BY MECHANICS
                </label>
                <p className="text-center text-base font-sm text-gray-700">
                    View all exercises by mechanics
                    <br />
                </p>
            </div>
            <div class="lg:grid lg:grid-cols-2 p-4 items-center container mx-auto my-auto mt-[3%] ">
                {ListMechanics?.map((mechanic, index) => {
                    return (
                        <div
                            class=" w-[70%] mx-auto shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-transparent my-12 "
                            key={index}
                        >
                            <img
                                src={mechanic?.EquipmentImg}
                                alt=""
                                className="overflow-hidden w-full"
                            />

                            <div class="p-4 text-center">
                                <h3 class="font-semibold tracking-wide text-gray-800 text-lg my-2 leading-5 uppercase">
                                    {mechanic?.EquipmentName}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Exercises;
