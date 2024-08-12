import React from 'react';
import heroimg from '../../assets/pertamina.png';
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
    return (
        <div className='flex flex-col md:flex-row w-[90%] items-center py-5 px-6 gap-8 h-full my-9 mx-auto'>
            {/* Left side: Text section */}
            <div className='flex-1  md:text-left'>
                <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-5 leading-tight'>
                    Let's go join<br />
                </h1>
                <p className='my-5 text-[#afaeae] text-sm sm:text-base md:text-lg'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className='flex items-center gap-3 py-3 px-4 rounded-full shadow-lg justify-between mx-auto md:mx-0 hover:shadow-xl transition-all duration-300 ease-in-out' 
                    style={{ backgroundColor: "#45a049", maxWidth: "190px" }}>
                    <span className='font-bold text-white text-sm sm:text-base'>Learn More</span>
                    <FaArrowRightLong className='font-bold text-white'/>
                </div>
            </div>

            {/* Right side: Image section */}
            <div className='flex-1 justify-center flex mt-8 md:mt-0'>
                <img 
                    src={heroimg} 
                    alt='Hero' 
                    className='w-[240px] sm:w-[300px] md:w-[380px] lg:w-[450px] h-auto object-cover transition-transform transform hover:scale-105 duration-300 ease-in-out'/>
            </div>
        </div>
    );
}

export default Hero;
