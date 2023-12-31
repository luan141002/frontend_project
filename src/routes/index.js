// file này để dễ dàng kiểm soát route có trong hệ thống

// pages
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import Exercises from '../pages/Exercises';
import PartTrainGuide from '../pages/PartTrainGuide';
import TextEditor from '../components/addPost';
import Schedule from '../pages/Schedule';
import ExercisesByCategoryName from '../pages/ExercisesByCategory';
import UserProfile from '../pages/UserProfile';
import UploadExercise from '../pages/UploadExcercise';
import Table from '../components/Table';
import Center from '../pages/Schedule/Center';
import CaloriesCalculator from '../pages/CalorieCalculator';
import PickTrainer from '../pages/PickTrainerPage';
import ForgetPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';
import OTPVerification from '../pages/OTPVerification';
import BlogPage from '../pages/BlogPage';
import About from '../pages/About';
import TargetPage from '../pages/TargetPage';
import WaitingPage from '../pages/WaitingPage';

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
        path: '/exercises/exercise-category/name/:categoryName',
        component: ExercisesByCategoryName,
        layout: DefaultLayout,
    },
    {
        path: '/user/user-profile',
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
        layout: null,
    },
    {
        path: '/table',
        component: Table,
        layout: AdminLayout,
    },
    {
        path: '/tools/calories-calculator',
        component: CaloriesCalculator,
        layout: DefaultLayout,
        type: 'calories-calculator',
    },
    {
        path: '/tools/bmi-calculator',
        component: CaloriesCalculator,
        layout: DefaultLayout,
        type: 'bmi-calculator',
    },
    {
        path: '/members/personal-config',
        component: CaloriesCalculator,
        layout: AdminLayout,
        type: 'personal-information-config',
    },
    {
        path: '/trainer-pick',
        component: PickTrainer,
        layout: DefaultLayout,
    },
    {
        path: '/forget-password',
        component: ForgetPassword,
        layout: null,
    },
    {
        path: '/reset-password',
        component: ResetPassword,
        layout: null,
    },
    {
        path: '/otp/:email',
        component: OTPVerification,
        layout: null,
    },
    {
        path: '/members/:memberIdTerm/schedule',
        component: Center,
        layout: null,
    },
    {
        path: '/posts/:blogId',
        component: BlogPage,
        layout: DefaultLayout,
    },
    {
        path: '/members/personal-information',
        component: Table,
        layout: AdminLayout,
        type: 'personal-config',
    },
    {
        path: '/members',
        component: Table,
        layout: AdminLayout,
        type: 'members',
    },
    {
        path: '/pts',
        component: Table,
        layout: AdminLayout,
        type: 'pts',
    },
    {
        path: '/exercises-management',
        component: Table,
        layout: AdminLayout,
        type: 'exercises',
    },
    {
        path: '/management/personal-trainer/members',
        component: Table,
        layout: AdminLayout,
        type: 'membersOfPT',
    },
    {
        path: '/about',
        component: About,
        layout: DefaultLayout,
    },
    {
        path: '/target/:ptId',
        component: TargetPage,
        layout: null,
    },
    {
        path: '/waiting-for-plan',
        component: WaitingPage,
        layout: null,
    },
];
const privateRoutes = [
    {
        path: '/admin',
        component: '',
    },
    {
        path: '/exercises',
        component: Exercises,
        layout: DefaultLayout,
    },
    {
        path: '/personal-trainer',
        component: '',
    },
];

export { publicRoutes, privateRoutes };
