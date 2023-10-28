// file này để dễ dàng kiểm soát route có trong hệ thống

// pages
import Home from '../pages/Home';
import Blog from '../pages/Blog';
// Layouts
import DefaultLayout from '../components/layouts/defaultLayout';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/blog',
        component: Blog,
        layout: DefaultLayout,
    },
];
const privateRoutes = [
    {
        path: '/admin',
        component: '',
    },
    {
        path: '/seller',
        component: '',
    },
];

export { publicRoutes, privateRoutes };
