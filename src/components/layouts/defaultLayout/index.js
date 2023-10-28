import React from 'react';
import Header from '../../header';
import SideBar from '../../sidebar';
// import Footer from '../../Footer';
const defaultLayout = ({ children }) => {
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex flex-col w-full h-screen bg-[#151212]'>
                <Header />
                <div className=' w-full bg-[#151212] justify-self-center mt-[90px] h-screen  '>
                    {children}
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default defaultLayout;
