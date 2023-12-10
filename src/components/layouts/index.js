import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '../../routes';
import { Fragment } from 'react';
import DefaultLayout from './defaultLayout';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
    return (
        <Router>
            <div className="w-full h-screen bg-[#151212] scrollbar-hide">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        const type = route.type || null;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page type={type} />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <div className="toast-container">
                    <ToastContainer limit={2} />
                </div>
            </div>
        </Router>
    );
}

export default Layout;
