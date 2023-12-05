import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog,
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        roles: ['PERSONAL_TRAINER'],
        path: '/',
        icon: <HiOutlineViewGrid />,
    },

    {
        key: 'Management',
        label: 'Management',
        path: '/table',
        roles: ['PERSONAL_TRAINER'],
        icon: <HiOutlineShoppingCart />,
        subMenu: [
            {
                key: 'Trainers',
                label: 'Trainers',
                path: '/table',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Trainees',
                label: 'Trainees',
                path: '/table',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Exercises',
                label: 'Exercises',
                path: '/table',
                icon: <HiOutlineCube />,
            },
        ],
    },
    {
        key: 'Management',
        label: 'Management',
        path: '/table',
        roles: ['MEMBER'],
        icon: <HiOutlineShoppingCart />,
        subMenu: [
            {
                key: 'Trainers',
                label: 'Trainers',
                path: '/table',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Trainees',
                label: 'Trainees',
                path: '/table',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Exercises',
                label: 'Exercises',
                path: '/table',
                icon: <HiOutlineCube />,
            },
        ],
    },
    {
        key: 'Personal',
        label: 'Personal Information Update',
        roles: ['MEMBER'],
        path: '/members/personal-config',
        icon: <HiOutlineUsers />,
    },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />,
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '/support',
        icon: <HiOutlineQuestionMarkCircle />,
    },
];
