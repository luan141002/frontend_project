import React from 'react';
import Sidebar from './shared/Sidebar.jsx';
import Header from './shared/Header.jsx';

export default function Layout({ children }) {
    return (
        <div className="bg-[#151212] h-screen w-screen overflow-hidden flex flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
