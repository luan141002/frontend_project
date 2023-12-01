import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ({ exercise }) => {
    const video_thumbnail = get_youtube_thumbnail(
        'https://www.youtube.com/watch?v=hSTm7yQEggI',
        'medium',
    );
    return (
        <Link to={`/exercises/${1}`}>
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white min-h-fit ">
                <img
                    class="w-full"
                    src={video_thumbnail}
                    alt="Sunset in the mountains"
                />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{exercise?.name}</div>
                    <label className="text-gray-600  text-sm">
                        {exercise?.experienceLevel} · {exercise?.type}
                    </label>
                    <br />
                    <label className="text-gray-600  text-sm">
                        {exercise?.createdDate}
                    </label>
                    <p class="text-gray-700 text-base overflow-hidden h-[50px]">
                        {exercise?.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ExerciseCard;

function get_youtube_thumbnail(url, quality) {
    if (url) {
        var video_id, thumbnail, result;
        if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
            video_id = result.pop();
        } else if ((result = url.match(/youtu.be\/(.{11})/))) {
            video_id = result.pop();
        }

        if (video_id) {
            if (typeof quality == 'undefined') {
                quality = 'high';
            }

            var quality_key = 'maxresdefault'; // Max quality
            if (quality == 'low') {
                quality_key = 'sddefault';
            } else if (quality == 'medium') {
                quality_key = 'mqdefault';
            } else if (quality == 'high') {
                quality_key = 'hqdefault';
            }

            var thumbnail =
                'http://img.youtube.com/vi/' +
                video_id +
                '/' +
                quality_key +
                '.jpg';
            return thumbnail;
        }
    }
    return false;
}
