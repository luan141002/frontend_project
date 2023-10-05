import React from 'react';
import Header from '../../header';
// import Footer from '../../Footer';
const defaultLayout = ({ children }) => {
    return (
        <div className='flex flex-col w-full h-screen bg-[#151212]'>
            <Header />
            <div className=' w-full self-center mt-[80px] p-[20px] h-screen '>
                {children}
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default defaultLayout;
