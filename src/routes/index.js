// file này để dễ dàng kiểm soát route có trong hệ thống

// pages
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import Exercises from '../pages/Exercises';
import PartTrainGuide from '../pages/PartTrainGuide';
import TextEditor from '../components/addPost';
import Schedule from '../pages/Schedule';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import ExercisesByCategoryName from '../pages/ExercisesByCategory';
import UserProfile from '../pages/UserProfile';
import UploadExercise from '../pages/UploadExcercise';
import Table from '../components/Table';
import Center from '../pages/Schedule/Center';
// Layouts
import DefaultLayout from '../components/layouts/defaultLayout';
import AdminLayout from '../components/layouts/adminLayout';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/blogs',
        component: Blog,
        layout: DefaultLayout,
    },
    {
        path: '/exercises',
        component: Exercises,
        layout: DefaultLayout,
    },
    {
        path: '/exercises/:exerciseId',
        component: PartTrainGuide,
        layout: DefaultLayout,
    },
    {
        path: '/add-post',
        component: TextEditor,
        layout: DefaultLayout,
    },
    {
        path: '/kanban',
        component: Schedule,
        layout: null,
    },
    {
        path: '/login',
        component: LoginPage,
        layout: AdminLayout,
    },
    {
        path: '/register',
        component: RegisterPage,
        layout: null,
    },
    {
        path: '/exercises/exercise-category/name/:categoryName',
        component: ExercisesByCategoryName,
        layout: DefaultLayout,
    },
    {
        path: '/user/:id/user-profile',
        component: UserProfile,
        layout: DefaultLayout,
    },
    {
        path: '/exercises/upload',
        component: UploadExercise,
        layout: DefaultLayout,
    },
    {
        path: '/dashboard',
        component: Center,
        layout: AdminLayout,
    },
];
const privateRoutes = [
    {
        path: '/admin',
        component: '',
    },
    {
        path: '/personal-trainer',
        component: '',
    },
];

export { publicRoutes, privateRoutes };
