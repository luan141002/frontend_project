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
        path: '/',
        icon: <HiOutlineViewGrid />,
    },
    {
        key: 'userSchedules',
        label: 'User Schedules',
        path: '/kanban',
        icon: <HiOutlineCube />,
        subMenu: [
            {
                key: 'user_1',
                label: 'user_2',
                path: '/products',
                icon: <HiOutlineCube />,
            },
            {
                key: 'products',
                label: 'Products',
                path: '/products',
                icon: <HiOutlineCube />,
            },
        ],
    },
    {
        key: 'Management',
        label: 'Management',
        path: '/management',
        icon: <HiOutlineShoppingCart />,
        subMenu: [
            {
                key: 'Trainers',
                label: 'Trainers',
                path: '/trainers',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Trainees',
                label: 'Trainees',
                path: '/trainees',
                icon: <HiOutlineCube />,
            },
            {
                key: 'Exercises',
                label: 'Exercises',
                path: '/exercises',
                icon: <HiOutlineCube />,
            },
        ],
    },
    {
        key: 'Personal',
        label: 'Customers',
        path: '/customers',
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
