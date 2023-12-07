import React, { useState } from 'react';
import { CircleSlider } from 'react-circle-slider';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ToolService from '../../services/ToolService';
import MemberService from '../../services/MemberService';

const CaloriesCalculator = ({ type }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const account = useSelector((state) => state.account);
    const [age, setAge] = useState(25);
    const [height, setHeight] = useState(165);
    const [weight, setWeight] = useState(50);
    const [result, setResult] = useState(null);

    const onSubmit = async (data) => {
        // Xử lý logic khi form được submit
        console.log(type);
        console.log(data);
        let response;
        switch (type) {
            case 'calories-calculator':
                response = await ToolService.getCaloriesResult(
                    data.activityLevel,
                    data.goal,
                    height,
                    weight,
                    age,
                    data.calculator.gender,
                );
                break;
            case 'bmi-calculator':
                response = await ToolService.getBMIResult(
                    height,
                    weight,
                    age,
                    data.calculator.gender,
                );
                break;
            case 'personal-information-config':
                response = await MemberService.updatePersonalInfoConfig(
                    account.memberId,
                    height,
                    weight,
                    age,
                    data.calculator.gender,
                    data.bmi,
                    data.fat,
                );
                break;
        }

        setResult(response);
        console.log(response);
    };
    return (
        <div className="bg-[#151212] w-full min-h-min p-6 mb-[10%]">
            {type === 'calories-calculator' && (
                <div className="text-white flex flex-col self-start mb-[10%]">
                    <label className="text-[40px] font-bold ">
                        Calorie Calculator
                    </label>
                    <p className="text-white text-[15px] font-thin italic w-[500px]">
                        The Calorie Calculator can be used to estimate the
                        calories you need to consume each day. This calculator
                        can also provide some simple guidelines if you want to
                        gain or lose weight. This calculator uses the Revised
                        Harris-Benedict equation to calculate your calorie
                        needs.
                    </p>
                </div>
            )}

            {type === 'bmi-calculator' && (
                <div className="text-white flex flex-col self-start mb-[10%]">
                    <label className="text-[40px] font-bold ">
                        BMI Calculator
                    </label>
                    <p className="text-white text-[15px] font-thin italic w-[500px]">
                        Macronutrients (macros) are typically defined as the
                        three substrates that are used by the body for the
                        production of energy. Those energy substrates are
                        carbohydrates, fats, and proteins. Together, the
                        macronutrients create the caloric total for a food
                    </p>
                </div>
            )}
            {type === 'personal-information-config' && (
                <div className="text-white flex flex-col self-start mb-[10%]">
                    <label className="text-[40px] font-bold ">
                        Update Personal information
                    </label>
                    <p className="text-white text-[15px] font-thin italic w-[500px]">
                        Update your information for tracking your progress
                    </p>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div class="container mx-auto mt-8 p-4 bg-white w-[40%] h-[100px]">
                        <form className="flex flex-col items-center">
                            {/* <div class="mb-4 w-full flex flex-col items-center space-x-3">
                                <label class="block text-gray-700 font-bold mb-2">
                                    Units:
                                </label>
                                <div class="flex justify-between w-full px-8 items-center">
                                    <label class="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="calculator.units"
                                            value="imperial"
                                            class="form-radio text-blue-500"
                                            {...register('calculator.units')}
                                        />
                                        <span class="ml-2">Imperial</span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="calculator.units"
                                            value="metric"
                                            class="form-radio text-blue-500"
                                            {...register('calculator.units')}
                                        />

                                        <span class="ml-2">Metric</span>
                                    </label>
                                </div>
                            </div> */}

                            <div class="mb-4 w-full flex flex-col items-center space-x-3">
                                <label class="block text-gray-700 font-bold mb-2">
                                    Sex:
                                </label>
                                <div class="flex  justify-between w-full px-10 items-center">
                                    <label class="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            name="calculator.sex"
                                            value="male"
                                            class="form-radio text-blue-500"
                                            {...register('calculator.gender', {
                                                required:
                                                    'This field is required',
                                            })}
                                        />

                                        <span class="ml-2">Male</span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="calculator.sex"
                                            value="female"
                                            class="form-radio text-blue-500"
                                            {...register('calculator.gender', {
                                                required:
                                                    'This field is required',
                                            })}
                                        />
                                        <span class="ml-2">Female</span>
                                    </label>
                                </div>
                                {errors.calculator?.gender && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.calculator?.gender.message}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-wrap justify-around">
                        <div className="font-sans relative flex items-center text-center justify-center">
                            <div className="w-[150px] h-[150px] leading-[70px] rounded-full flex flex-col item justify-center text-[80px] text-center text-[#ff5722] absolute">
                                <div className="text-[18px] leading-[15px] ">
                                    Age
                                </div>
                                <div className="my-3">{age}</div>
                                <div className="text-[18px] leading-[15px] ">
                                    Years
                                </div>
                            </div>
                            <CircleSlider
                                value={age}
                                size={300}
                                stepSize={5}
                                max={100}
                                knobRadius={20}
                                progressWidth={20}
                                circleWidth={3}
                                progressColor="#FDB11B"
                                knobColor="#ff5722"
                                tooltipColor="#6ab6e1"
                                gradientColorFrom="#ec008c"
                                gradientColorTo="#fc6767"
                                tooltipSize={20}
                                onChange={(value) => setAge(value)}
                            />
                        </div>

                        <div className="font-sans relative flex items-center text-center justify-center">
                            <div className="w-[150px] h-[150px] leading-[70px] rounded-full flex flex-col item justify-center text-[80px] text-center text-[#ff5722] absolute">
                                <div className="text-[18px] leading-[15px] ">
                                    Weight
                                </div>
                                <div className="my-3">{weight}</div>
                                <div className="text-[18px] leading-[15px] ">
                                    Kilograms
                                </div>
                            </div>
                            <CircleSlider
                                value={weight}
                                size={300}
                                stepSize={5}
                                max={100}
                                knobRadius={20}
                                progressWidth={20}
                                circleWidth={3}
                                progressColor="#FDB11B"
                                knobColor="#ff5722"
                                tooltipColor="#6ab6e1"
                                gradientColorFrom="#ec008c"
                                gradientColorTo="#fc6767"
                                tooltipSize={20}
                                onChange={(value) => setWeight(value)}
                            />
                        </div>

                        <div className="font-sans relative flex items-center text-center justify-center">
                            <div className="w-[150px] h-[150px] leading-[70px] rounded-full flex flex-col item justify-center text-[80px] text-center text-[#ff5722] absolute">
                                <div className="text-[18px] leading-[15px] ">
                                    Height
                                </div>
                                <div className="my-3">{height}</div>
                                <div className="text-[18px] leading-[15px] ">
                                    Metres
                                </div>
                            </div>
                            <CircleSlider
                                value={height}
                                size={300}
                                stepSize={5}
                                max={200}
                                knobRadius={20}
                                progressWidth={20}
                                circleWidth={3}
                                progressColor="#FDB11B"
                                knobColor="#ff5722"
                                tooltipColor="#6ab6e1"
                                gradientColorFrom="#ec008c"
                                gradientColorTo="#fc6767"
                                tooltipSize={20}
                                onChange={(value) => setHeight(value)}
                            />
                        </div>
                    </div>
                </div>
                {type === 'personal-information-config' && (
                    <div></div>
                    // <div className="w-full">
                    //     <div className="mt-8 ">
                    //         <div className="mb-4">
                    //             <label
                    //                 htmlFor="fat"
                    //                 className="block text-white text-sm font-bold mb-2"
                    //             >
                    //                 Fat
                    //             </label>
                    //             <input
                    //                 {...register('fat', {
                    //                     required: 'This field is required',
                    //                 })}
                    //                 type="number"
                    //                 defaultValue={0}
                    //                 className="w-full p-2 border"
                    //             />
                    //             {errors.fat && (
                    //                 <p className="text-red-500 text-xs mt-1">
                    //                     {errors.fat.message}
                    //                 </p>
                    //             )}
                    //         </div>
                    //         {/*
                    //     <div className="mb-4">
                    //         <label
                    //             htmlFor="date"
                    //             className="block text-white text-sm font-bold mb-2"
                    //         >
                    //             Date
                    //         </label>
                    //         <input
                    //             {...register('date')}
                    //             type="date"
                    //             defaultValue="2023-12-04"
                    //             className="w-full p-2 border"
                    //         />
                    //     </div> */}

                    //         <div className="mb-4">
                    //             <label
                    //                 htmlFor="bmi"
                    //                 className="block text-white text-sm font-bold mb-2"
                    //             >
                    //                 BMI
                    //             </label>
                    //             <input
                    //                 {...register('bmi', {
                    //                     required: 'This field is required',
                    //                 })}
                    //                 type="number"
                    //                 defaultValue={0}
                    //                 className="w-full p-2 border"
                    //             />
                    //             {errors.bmi && (
                    //                 <p className="text-red-500 text-xs mt-1">
                    //                     {errors.bmi.message}
                    //                 </p>
                    //             )}
                    //         </div>
                    //     </div>
                    // </div>
                )}
                {type === 'calories-calculator' && (
                    <div className="flex justify-between mt-[5%] w-full">
                        <div className="w-[48%]">
                            <select
                                id="countries"
                                {...register('activityLevel', {
                                    required: 'This field is required',
                                })}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Choose a Activity Level
                                </option>
                                <option value="SEDENTARY">
                                    Little to no exercise
                                </option>
                                <option value="LIGHTLY_ACTIVE">
                                    Light exercise (1-3 days per week)
                                </option>
                                <option value="MODERATELY_ACTIVE">
                                    Moderate exercise (3-5 days per week){' '}
                                </option>
                                <option value="VERY_ACTIVE">
                                    Heavy exercise (6-7 days per week){' '}
                                </option>
                                <option value="EXTRA_ACTIVE">
                                    Very heavy exercise (twice per day, extra
                                    heavy workouts)
                                </option>
                            </select>
                            {errors.activityLevel && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.activityLevel.message}
                                </p>
                            )}
                        </div>

                        <div className="w-[48%]">
                            <select
                                id="countries"
                                {...register('goal', {
                                    required: 'This field is required',
                                })}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="" disabled selected>
                                    Goal Per Week
                                </option>
                                <option value="WEIGHT_LOSS">
                                    Lose 2 Pounds per Week{' '}
                                </option>
                                <option value="WEIGHT_LOSS">
                                    Lose 1.5 Pounds per Week{' '}
                                </option>
                                <option value="WEIGHT_LOSS">
                                    Lose 1 Pounds per Week{' '}
                                </option>
                                <option value="WEIGHT_LOSS">
                                    Lose 0.5 Pounds per Week
                                </option>
                                <option value="MAINTENANCE">
                                    Stay the Same Weight{' '}
                                </option>
                                <option value="WEIGHT_GAIN">
                                    Gain 0.5 Pound per Week
                                </option>
                                <option value="WEIGHT_GAIN">
                                    Gain 1 Pound per Week{' '}
                                </option>
                                <option value="WEIGHT_GAIN">
                                    Gain 1.5 Pounds per Week{' '}
                                </option>
                                <option value="WEIGHT_GAIN">
                                    Gain 2 Pounds per Week{' '}
                                </option>
                            </select>
                            {errors.goal && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.goal.message}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                <div class="mt-6">
                    {type === 'calories-calculator' && (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            class=" text-red-800 py-2 px-4 w-full border-2 border-red-800 bg-white rounded hover:bg-red-900 hover:border-white hover:text-white focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        >
                            You would have to consume:{' '}
                            {result === null ? '0' : result}
                        </button>
                    )}

                    {type === 'bmi-calculator' && (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            class=" text-red-800 py-2 px-4 w-full border-2 border-red-800 bg-white rounded hover:bg-red-900 hover:border-white hover:text-white focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        >
                            {result !== null
                                ? `Fat: ${result?.fat}g, BMI: ${result?.bmi}g, Rating: ${result?.rating}`
                                : `Calculate BMI`}
                        </button>
                    )}
                    {type === 'personal-information-config' && (
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                class=" text-red-800 py-2 px-4 w-full border-2 border-red-800 bg-white rounded hover:bg-red-900 hover:border-white hover:text-white focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                            >
                                Update
                            </button>
                            {result !== null ? (
                                <p className="text-green-700 text-xs mt-1">
                                    Updated Successfully
                                </p>
                            ) : (
                                `Calculate BMI`
                            )}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CaloriesCalculator;
