import React from 'react';

const ExerciseCard = ({ exercise }) => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img
                class="w-full"
                src="https://toplist.vn/images/800px/roronoa-zoro-one-piece-1175911.jpg"
                alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{exercise?.name}</div>
                <label className="text-gray-600  text-sm">
                    {exercise?.level} · {exercise?.type}
                </label>
                <p class="text-gray-700 text-base">{exercise?.description}</p>
            </div>
        </div>
    );
};

export default ExerciseCard;
