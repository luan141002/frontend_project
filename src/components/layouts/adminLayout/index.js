import React from 'react';
import Sidebar from './shared/Sidebar.jsx';
import Header from './shared/Header.jsx';

export default function Layout({ children }) {
    return (
        <div className="bg-[#151212] h-screen   min-w-fit max-w-full flex flex-row ">
            <Sidebar />
            <div className="flex flex-col flex-1 ">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-scroll w-full min-w-fit mt-16  ">
                    {children}
                </div>
            </div>
        </div>
    );
}
