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
import {
    FaCompass,
    FaCalendarWeek,
    FaPeopleGroup,
    FaFileContract,
    FaClipboardList,
    FaRegIdCard,
    HiOutlineSearch,
} from 'react-icons/fa6';

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
        icon: <FaCompass />,
        subMenu: [
            {
                key: 'Members',
                label: 'Members',
                path: '/members',
                icon: <FaPeopleGroup />,
            },
            {
                key: 'Trainers',
                label: 'Trainers',
                path: '/pts',
                icon: <FaPeopleGroup />,
            },
            // {
            //     key: 'Exercises',
            //     label: 'Exercises',
            //     path: '/exercises-management',
            //     icon: <FaClipboardList />,
            // },
        ],
    },

    {
        key: 'Management',
        label: 'Management',
        path: '',
        roles: ['PERSONAL_TRAINER'],
        icon: <FaCompass />,
        subMenu: [
            {
                key: 'Trainees',
                label: 'Trainees',
                path: '/management/personal-trainer/members',
                icon: <FaPeopleGroup />,
            },
            {
                key: 'Exercises',
                label: 'Exercises',
                path: '/exercises-management',
                icon: <FaClipboardList />,
            },
        ],
    },
    {
        key: 'Management',
        label: 'Management',
        path: '/members',
        roles: ['MEMBER'],
        icon: <FaCompass />,
        subMenu: [
            {
                key: 'Personal_Statistics',
                label: 'Personal Statistics',
                path: '/members/personal-information',
                icon: <FaRegIdCard />,
            },
        ],
    },
    {
        key: 'Personal',
        label: 'Personal Information Update',
        roles: ['MEMBER'],
        path: '/members/personal-config',
        icon: <FaFileContract />,
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
