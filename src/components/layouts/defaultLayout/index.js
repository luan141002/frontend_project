import React from 'react';
import Header from '../../header';
import SideBar from '../../sidebar';
// import Footer from '../../Footer';
const defaultLayout = ({ children }) => {
    return (
        <div className="flex w-full h-screen  bg-[#151212]">
            <SideBar />
            <div className="flex flex-col pl-20 flex-wrap w-full h-screen bg-[#151212]">
                <Header />
                <div className=" w-full bg-[#151212] justify-self-center mt-[90px] h-[100px]  ">
                    {children}
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default defaultLayout;
