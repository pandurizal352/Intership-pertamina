import React from 'react';
import '../../App.css';

const Servis = () => {
    return (
        <div className='services flex flex-col md:flex-row gap-5 justify-between items-center p-5'>
           
            <div className='card py-5 px-5 shadow-lg text-center bg-blue-600 rounded-lg transition-transform transform hover:scale-105'>
                <h1 className='font-bold text-white text-xl md:text-2xl mb-2'>Login</h1>
                <p className='subtext text-white text-sm md:text-base'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>

            <div className='card py-5 px-5 shadow-lg text-center bg-blue-600 rounded-lg transition-transform transform hover:scale-105'>
                <h1 className='font-bold text-white text-xl md:text-2xl mb-2'>membuat layanan</h1>
                <p className='subtext text-white text-sm md:text-base'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>
          
            <div className='card py-5 px-5 shadow-lg text-center bg-blue-600 rounded-lg transition-transform transform hover:scale-105'>
                <h1 className='font-bold text-white text-xl md:text-2xl mb-2'></h1>
                <p className='subtext text-white text-sm md:text-base'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>
           
            <div className='card py-5 px-5 shadow-lg text-center bg-blue-600 rounded-lg transition-transform transform hover:scale-105'>
                <h1 className='font-bold text-white text-xl md:text-2xl mb-2'>Login</h1>
                <p className='subtext text-white text-sm md:text-base'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>
        </div>
    );
}

export default Servis;
