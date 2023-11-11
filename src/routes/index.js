// file này để dễ dàng kiểm soát route có trong hệ thống

// pages
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import Exercises from '../pages/Exercises';
import PartTrainGuide from '../pages/PartTrainGuide';
import TextEditor from '../components/addPost'
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
    {
        path: '/exercises',
        component: Exercises,
        layout: DefaultLayout,
    },
    {
        path: '/guide',
        component: PartTrainGuide,
        layout: DefaultLayout,
    },
    {
        path: '/add-post',
        component: TextEditor,
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
