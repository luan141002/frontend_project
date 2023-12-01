import React, { useState } from 'react';
import { CircleSlider } from 'react-circle-slider';

const CaloriesCalculator = () => {
    const [value, changeValue] = useState();
    return (
        <div className="bg-[#151212] w-full min-h-min p-6">
            <div className="text-white flex flex-col self-start mb-[10%]">
                <label className="text-[40px] font-bold ">
                    Calorie Calculator
                </label>
                <p className="text-white text-[15px] font-thin italic w-[500px]">
                    The Calorie Calculator can be used to estimate the calories
                    you need to consume each day. This calculator can also
                    provide some simple guidelines if you want to gain or lose
                    weight. This calculator uses the Revised Harris-Benedict
                    equation to calculate your calorie needs.
                </p>
            </div>
            <div className="flex">
                <div class="container mx-auto mt-8 p-4 bg-white w-[40%] h-[200px]">
                    <form className="flex flex-col items-center">
                        <div class="mb-4 w-full flex flex-col items-center space-x-3">
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
                                    />
                                    <span class="ml-2">Imperial</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="calculator.units"
                                        value="metric"
                                        class="form-radio text-blue-500"
                                    />
                                    <span class="ml-2">Metric</span>
                                </label>
                            </div>
                        </div>

                        <div class="mb-4 w-full flex flex-col items-center space-x-3">
                            <label class="block text-gray-700 font-bold mb-2">
                                Sex:
                            </label>
                            <div class="flex justify-between w-full px-8 items-center">
                                <label class="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        name="calculator.sex"
                                        value="male"
                                        class="form-radio text-blue-500"
                                    />
                                    <span class="ml-2">Male</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="calculator.sex"
                                        value="female"
                                        class="form-radio text-blue-500"
                                    />
                                    <span class="ml-2">Female</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-wrap justify-around">
                    <div className="font-sans relative flex items-center text-center justify-center">
                        <div className="w-[150px] h-[150px] leading-[70px] rounded-full flex flex-col item justify-center text-[80px] text-center text-[#ff5722] absolute">
                            {value}
                            <div className="text-[18px] leading-[15px] ">
                                MINUTES
                            </div>
                        </div>
                        <CircleSlider
                            value={value}
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
                            onChange={(value) => changeValue(value)}
                        />
                    </div>

                    <div className="font-sans relative flex items-center text-center justify-center">
                        <div className="w-[150px] h-[150px] leading-[70px] rounded-full flex flex-col item justify-center text-[80px] text-center text-[#ff5722] absolute">
                            {value}
                            <div className="text-[18px] leading-[15px] ">
                                MINUTES
                            </div>
                        </div>
                        <CircleSlider
                            value={value}
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
                            onChange={(value) => changeValue(value)}
                        />
                    </div>

                    <div className="font-sans relative flex items-center text-center justify-center">
                        <div className="w-[150px] h-[150px] leading-[70px] rounded-full flex flex-col item justify-center text-[80px] text-center text-[#ff5722] absolute">
                            {value}
                            <div className="text-[18px] leading-[15px] ">
                                MINUTES
                            </div>
                        </div>
                        <CircleSlider
                            value={value}
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
                            onChange={(value) => changeValue(value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-[5%]">
                <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[48%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                </select>

                <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[48%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                </select>
            </div>
            <div class="mt-6">
                <button
                    type="submit"
                    class=" text-red-800 py-2 px-4 w-full border-2 border-red-800 bg-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                    You would have to consume: 2111
                </button>
            </div>
        </div>
    );
};

export default CaloriesCalculator;