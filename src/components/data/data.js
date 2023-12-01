const data = [
    {
        name: 'Deadlift',
        experienceLevel: 'Advanced',
        equipment: 'Barbell',
        forceType: 'Pull',
        secondaryMuscles: 'Lower Back, Hamstrings, Glutes',
        type: 'Strength',
        createdDate: '2023-11-22',
        tips: 'Maintain a neutral spine and engage your core. Lift the bar with your hips and legs, not your back.',
        videos: [
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-Barbell-barbell-deadlift-front.mp4#t=0.1',
                title: 'Deadlift Front',
            },
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-Barbell-barbell-deadlift-side.mp4#t=0.1',
                title: 'Deadlift Side',
            },
        ],
        steps: [
            {
                serial: 1,
                content:
                    'Stand with your feet hip-width apart and the barbell in front of you.',
            },
            {
                serial: 2,
                content:
                    'Bend at your hips and knees, keeping your back straight, to grip the barbell.',
            },
            {
                serial: 3,
                content:
                    'Lift the barbell by straightening your hips and knees, keeping it close to your body.',
            },
        ],
        description:
            'The deadlift is a compound exercise that targets the posterior chain and lower back.',
        category: {
            id: 2,
        },
    },
    {
        name: 'Bench Press',
        experienceLevel: 'Intermediate',
        equipment: 'Barbell',
        forceType: 'Push',
        secondaryMuscles: 'Triceps',
        type: 'Strength',
        createdDate: '2023-11-20',
        tips: 'Grab the bar with a medium grip-width (thumbs around the bar!)',
        videos: [
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-front.mp4#t=0.1',
                title: 'Bench Press Male Front ',
            },
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-bench-press-side_KciuhbB.mp4#t=0.1',
                title: 'Bench Press Male Side ',
            },
        ],
        steps: [
            {
                serial: 1,
                content: 'Lie on the bench with your feet flat on the floor.',
            },
            {
                serial: 2,
                content: 'Grip the barbell with hands shoulder-width apart.',
            },
            {
                serial: 3,
                content:
                    'Lower the barbell to your chest and press it back up.',
            },
        ],
        description:
            'The bench press is a compound exercise that targets the chest and triceps.',
        category: {
            id: 1,
        },
    },
    {
        name: 'Squat',
        experienceLevel: 'Intermediate',
        equipment: 'Barbell',
        forceType: 'Compound',
        secondaryMuscles: 'Quadriceps, Hamstrings, Glutes',
        type: 'Strength',
        createdDate: '2023-11-21',
        tips: 'Maintain a straight back and engage your core throughout the movement.',
        videos: [
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-Barbell-barbell-squat-front.mp4#t=0.1',
                title: 'Squat Front',
            },
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-Barbell-barbell-squat-side.mp4#t=0.1',
                title: 'Squat Side',
            },
        ],
        steps: [
            {
                serial: 1,
                content:
                    'Stand with your feet shoulder-width apart and the barbell across your upper back.',
            },
            {
                serial: 2,
                content:
                    'Lower your body by bending your knees and hips, keeping your back straight.',
            },
            {
                serial: 3,
                content:
                    'Push through your heels to return to the starting position.',
            },
        ],
        description:
            'The squat is a compound exercise that targets the lower body muscles.',
        category: {
            id: 3,
        },
    },

    {
        name: 'Lat Pulldown',
        experienceLevel: 'Beginner',
        equipment: 'Cable Machine',
        forceType: 'Pull',
        secondaryMuscles: 'Biceps, Rhomboids',
        type: 'Strength',
        createdDate: '2023-11-24',
        tips: 'Keep your chest up and pull the bar down to the upper chest, not behind the neck.',
        videos: [
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-machine-pulldown-front.mp4#t=0.1',
                title: 'Lat Pulldown Front',
            },
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-machine-pulldown-side.mp4#t=0.1',
                title: 'Lat Pulldown Side',
            },
        ],
        steps: [
            {
                serial: 1,
                content:
                    'Sit facing the cable machine with a straight posture and grab the bar with an overhand grip.',
            },
            {
                serial: 2,
                content:
                    'Pull the bar down to the upper chest, squeezing your shoulder blades together.',
            },
            {
                serial: 3,
                content:
                    'Slowly release the bar back to the starting position.',
            },
        ],
        description:
            'The lat pulldown is an exercise that targets the muscles in the back and arms.',
        category: {
            id: 2,
        },
    },

    {
        name: 'Shoulder Press',
        experienceLevel: 'Intermediate',
        equipment: 'Barbell or Dumbbells',
        forceType: 'Push',
        secondaryMuscles: 'Deltoids, Triceps',
        type: 'Strength',
        createdDate: '2023-11-23',
        tips: 'Keep your core engaged and press the weight directly overhead.',
        videos: [
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-overhead-press-front_wHKQjdY.mp4#t=0.1',
                title: 'Shoulder Press Front',
            },
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-barbell-overhead-press-side_1DIUbfS.mp4#t=0.1',
                title: 'Shoulder Press Side',
            },
        ],
        steps: [
            {
                serial: 1,
                content:
                    'Sit or stand with a straight back and hold the barbell or dumbbells at shoulder height.',
            },
            {
                serial: 2,
                content:
                    'Press the weight directly overhead, extending your arms fully.',
            },
            {
                serial: 3,
                content:
                    'Lower the weight back to shoulder height with control.',
            },
        ],
        description:
            'The shoulder press is a compound exercise that targets the shoulder muscles.',
        category: {
            id: 4,
        },
    },

    {
        name: 'Dumbbell Fly',
        experienceLevel: 'Intermediate',
        equipment: 'Dumbbells',
        forceType: 'Push',
        secondaryMuscles: 'Pectorals, Front Deltoids',
        type: 'Strength',
        createdDate: '2023-11-25',
        tips: 'Maintain a slight bend in your elbows and control the movement to avoid overstretching.',
        videos: [
            {
                link: 'https://www.example.com/dumbbell_fly_tutorial',
                title: 'https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-lateral-raise-front.mp4#t=0.1',
            },
            {
                link: 'https://media.musclewiki.com/media/uploads/videos/branded/male-Dumbbells-dumbbell-lateral-raise-side.mp4#t=0.1',
                title: 'Dumbbell Fly Side',
            },
        ],
        steps: [
            {
                serial: 1,
                content:
                    'Lie on a flat bench with a dumbbell in each hand, arms extended above your chest.',
            },
            {
                serial: 2,
                content:
                    'Lower the dumbbells out to the sides with a slight bend in your elbows.',
            },
            {
                serial: 3,
                content:
                    'Bring the dumbbells back up to the starting position, squeezing your chest muscles.',
            },
        ],
        description:
            'The dumbbell fly is an isolation exercise that targets the chest muscles.',
        category: {
            id: 4,
        },
    },
];

export default data;
