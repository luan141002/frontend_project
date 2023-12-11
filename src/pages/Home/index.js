import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
    faCircle,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import pic_1 from '../../public/gym_picture_1.jpg';
import pic_2 from '../../public/gym_picture_2.jpg';
import pic_3 from '../../public/gym_picture_3.jpg';
import pic_4 from '../../public/gym_picture_4.jpg';

import pic_story from '../../public/story_1.jpg';
import './home.css';
const Home = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    const backgroundImages = [
        'https://bestprint.vn/wp-content/uploads/2022/08/gymshark_header_image.png',
        'https://images.ctfassets.net/8urtyqugdt2l/2c8YKdEPsP9CfRhbmzT3CX/8f46c3d884d12e14a2b8eed10dcf291c/Gymshark_Legacy_Collection_2023.jpg',
        'https://cdn.oktra.co.uk/content/uploads/2020/01/27122959/DSC_6421_19.08.01_GYMSHARK_GSLC_HI-RES_19.08.01_GYMSHARK_GSLC_JPG_2640x1980_acf_cropped.jpg',
        'https://images.ctfassets.net/8urtyqugdt2l/292uEh1TWV6d9hcqUL2izM/132e3f0c7bed523929502e837f2690e2/The_Official_Gymshark_Story_2023_-_How_Ben_Francis_Created_Gymshark.jpg',
        'https://i.pinimg.com/736x/31/93/3b/31933bc8416f9684447062e39e4cc2f2.jpg',
        'https://www.buyandship.com.sg/contents/uploads/2022/11/image.png',
        'https://images.ctfassets.net/8urtyqugdt2l/5IOTxbsIxbVgaIPUBBSSBp/a8a78fb93d93c451f83839ec393da191/Three_Bodybuilders_Wearing_Gymshark_Heritage_Collection.jpg',
    ];
    const currentBackground = useMemo(
        () => backgroundImages[backgroundIndex],
        [backgroundIndex],
    );
    useEffect(() => {
        // Thiết lập một timeout sau 2 giây để thay đổi nền
        const timer = setTimeout(() => {
            setBackgroundIndex((backgroundIndex + 1) % backgroundImages.length);
        }, 2000);

        // Xóa timeout khi component unmount hoặc khi backgroundIndex thay đổi
        return () => clearTimeout(timer);
    }, [backgroundIndex, backgroundImages]);

    // handle contact form
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
        <div className="bg-[#151212] w-full min-h-min ">
            {/* Thumbnail */}
            <div className="flex flex-col mb-[30px] ">
                <div
                    className="w-[98%] px-[10px] duration-700  lg:h-[550px] mx-auto flex justify-between  items-center bg-no-repeat bg-cover bg-center md:h-[400px] sm:h-[400px] min-[320px]:h-[200px] "
                    style={{
                        backgroundImage: `url(${currentBackground})`,
                    }}
                >
                    <button
                        className="mb-[10px] mr-[5px] w-[50px] h-[50px] bg-black opacity-60 rounded-full text-white flex justify-center items-center"
                        onClick={() => {
                            setBackgroundIndex((prev) => {
                                const prevIndex =
                                    prev > 0
                                        ? prev - 1
                                        : backgroundImages.length - 1;
                                console.log(prevIndex);
                                return prevIndex;
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button
                        className="mb-[10px] mr-[5px] w-[50px] h-[50px] bg-black opacity-60 rounded-full text-white flex justify-center items-center"
                        onClick={() => {
                            setBackgroundIndex(
                                (prev) => (prev + 1) % backgroundImages.length,
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
                <div className="flex justify-center mt-2">
                    {backgroundImages.map((image, index) => {
                        return (
                            <button
                                key={index}
                                className="mb-[10px] mr-[5px] text-[#520404]"
                                onClick={() => {
                                    setBackgroundIndex(index);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className={`hover:border hover:border-white rounded-full ${
                                        index === backgroundIndex
                                            ? 'border border-white'
                                            : ''
                                    }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* OUR SERVICE */}
            <div className="py-5 my-8  text-center text-white ">
                <label className="text-2xl leading-8 font-semibold">
                    OUR SERVICES
                </label>
                <p className="text-center text-xs font-sm">
                    Practicing at UNIVERSE will help you achieve your health
                    goals
                    <br />
                    and body shape.
                </p>
            </div>

            <div className="w-full bg-[#151212] gap-y-12  grid lg:grid-cols-2  sm:grid-cols-1 min-[320px]:grid-cols-1 p-4 ">
                <div
                    className="flex bg-cover p-[25px] lg:w-[600px] min-[320px]:w-full lg:h-[300px] min-[320px]:h-[200px] m-auto"
                    style={{
                        backgroundImage: `url('https://sport.exeter.ac.uk/media/universityofexeter/campusservices/sport/images930x500/Tracey_spot_checking_-_website.png')`,
                    }}
                >
                    <div className="text-white flex flex-col self-start">
                        <label className="text-[40px] font-bold ">
                            Personal Program
                        </label>
                        <p className="text-white text-[15px] font-thin italic">
                            BUILD YOUR PERFECT BODY ACCORDING TO AGE AND
                            STRENGTH YOUR BMI
                        </p>
                    </div>
                    <div className="flex self-end">
                        <Link to={'/about'}>
                            <button className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center  text-white  text-medium  hover:border hover:border-white">
                                See more
                            </button>
                        </Link>
                    </div>
                </div>
                <div
                    className="flex bg-cover p-[25px] lg:w-[600px] min-[320px]:w-full lg:h-[300px] min-[320px]:h-[200px] m-auto"
                    style={{
                        backgroundImage: `url('https://sport.exeter.ac.uk/media/universityofexeter/campusservices/sport/images930x500/healthandfitness/UoE18032019_RobCoombe-430-930x500.jpg')`,
                    }}
                >
                    <div className="text-white flex flex-col self-start">
                        <label className="text-[40px] font-bold ">
                            Personal Program
                        </label>
                        <p className="text-white text-[15px] font-thin italic">
                            BUILD YOUR PERFECT BODY ACCORDING TO AGE AND
                            STRENGTH YOUR BMI
                        </p>
                    </div>

                    <div className="flex self-end">
                        <Link to={'/about'}>
                            <button className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center  text-white  text-medium  hover:border hover:border-white">
                                See more
                            </button>
                        </Link>
                    </div>
                </div>
                <div
                    className="flex bg-cover p-[25px] lg:w-[600px] min-[320px]:w-full lg:h-[300px] min-[320px]:h-[200px] m-auto"
                    style={{
                        backgroundImage: `url('https://sport.exeter.ac.uk/media/universityofexeter/campusservices/sport/images930x500/Ride_Class.png')`,
                    }}
                >
                    <div className="text-white flex flex-col self-start">
                        <label className="text-[40px] font-bold ">
                            Personal Program
                        </label>
                        <p className="text-white text-[15px] font-thin italic">
                            BUILD YOUR PERFECT BODY ACCORDING TO AGE AND
                            STRENGTH YOUR BMI
                        </p>
                    </div>
                    <div className="flex self-end">
                        <Link to={'/about'}>
                            <button className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center  text-white  text-medium  hover:border hover:border-white">
                                See more
                            </button>
                        </Link>
                    </div>
                </div>
                <div
                    className="flex bg-cover p-[25px] lg:w-[600px] min-[320px]:w-full lg:h-[300px] min-[320px]:h-[200px] m-auto"
                    style={{
                        backgroundImage: `url('https://canadianfitness.net/wp-content/uploads/2021/11/group-fitness-class-2021.jpg')`,
                    }}
                >
                    <div className="text-white flex flex-col self-start">
                        <label className="text-[40px] font-bold ">
                            Personal Program
                        </label>
                        <p className="text-white text-[15px] font-thin italic">
                            BUILD YOUR PERFECT BODY ACCORDING TO AGE AND
                            STRENGTH YOUR BMI
                        </p>
                    </div>
                    <div className="flex self-end">
                        <Link to={'/about'}>
                            <button className="bg-[#C30C0C] w-[160px] h-[55px] text-[15px] text-center  text-white  text-medium  hover:border hover:border-white">
                                See more
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* OUR STORY */}
            <div className="py-5 my-8 mt-[200px]  text-center text-white ">
                <label className="text-2xl leading-8 font-semibold">
                    OUR STORY
                </label>
                <p className="text-center text-xs font-sm">
                    Practicing at UNIVERSE will help you achieve your health
                    goals
                    <br />
                    and body shape.
                </p>
            </div>
            <div className="flex px-[20px] gap-4 mb-[80px]">
                <div className="basis-[50%]">
                    <p className="text-stone-300 text-lg text-justify font-thin">
                        In reality, having three meals a day helps you stay
                        consistently energized, and it has almost become a
                        cultural habit for the majority of people, representing
                        a part of our lifestyle. From a scientific perspective,
                        having three meals a day does not adversely affect your
                        weight loss gym diet, as long as you can balance your
                        own meals accordingly. It also helps maintain stable
                        blood sugar levels, reducing the feeling of hunger and
                        thereby limiting your snack intake. However, having
                        three meals a day can be monotonous, and occasionally,
                        you may opt for fast food or skip breakfast when you
                        don't truly feel hungry. But that should only be
                        occasional. In addition, it helps keep your blood sugar
                        levels stable, reducing the urge to snack. But having
                        three meals a day can become monotonous, and
                        occasionally, you might grab fast food or skip breakfast
                        when you're not truly hungry. However, that should be
                        only occasional.
                    </p>
                </div>
                <img src={pic_story} className="w-[55%]" alt="our story" />
            </div>
            <button className="fifth flex mx-auto self-center justify-center w-[635px] hover:border hover:border-white text-black bg-white  py-2 my-6 text-base leading-6 font-normal">
                See More
            </button>
            <div className="container mx-auto px-4 mt-[15%]">
                <div className="grid grid-cols-2 h-[500px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.485398972338!2d106.76704217655366!3d10.850637630263792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1697007169514!5m2!1svi!2s"
                        className="w-[95%] h-[95%] border-0 basis-[50%] mx-auto"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="basis-[50%] space-y-3 text-white">
                        <label className="text-2xl leading-8 font-semibold ">
                            CONTACT US
                        </label>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
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

                            <div className="w-[90%]">
                                <textarea
                                    className="w-full p-2 border-b-2 border-red-800 text-black"
                                    placeholder="Message"
                                    {...register('message', {
                                        required: 'Message is required',
                                    })}
                                />
                                {errors.message && (
                                    <p>{errors.message.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="submitButton flex  justify-center w-[120px] py-1 hover:border hover:border-white text-black bg-white  my-6 text-base leading-6 font-normal"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
