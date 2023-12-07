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
        path: '/management',
        roles: ['ADMIN'],
        icon: <HiOutlineShoppingCart />,
        subMenu: [
            {
                key: 'Members',
                label: 'Members',
                path: '/members',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Trainers',
                label: 'Trainers',
                path: '/pts',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Exercises',
                label: 'Exercises',
                path: '/exercises-management',
                icon: <HiOutlineCube />,
            },
        ],
    },

    {
        key: 'Management',
        label: 'Management',
        path: '/table',
        roles: ['PERSONAL_TRAINER'],
        icon: <HiOutlineShoppingCart />,
        subMenu: [
            {
                key: 'Trainees',
                label: 'Trainees',
                path: '/management/personal-trainer/members',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Exercises',
                label: 'Exercises',
                path: '/exercises-management',
                icon: <HiOutlineCube />,
            },
        ],
    },
    {
        key: 'Management',
        label: 'Management',
        path: '/members',
        roles: ['MEMBER'],
        icon: <HiOutlineShoppingCart />,
        subMenu: [
            {
                key: 'Personal_Statistics',
                label: 'Personal Statistics',
                path: '/members/personal-information',
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
