import React from 'react';
import heroimg from '../../assets/pertamina.png';
import foto from '../../assets/bghero.jpeg';
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
    return (
        <div className='relative w-full h-screen flex items-center justify-center'>
            {/* Background Image */}
            <div
                className='absolute inset-0 bg-cover bg-center z-0'
                style={{ backgroundImage: `url(${foto})` }}
            ></div>

            {/* Overlay to darken background */}
            <div className='absolute inset-0 bg-black opacity-50 z-1'></div>

            {/* Content */}
            <div className='relative z-10 flex flex-col md:flex-row items-center w-[90%] gap-8'>
                {/* Left side: Text section */}
                <div className='flex-1 text-center md:text-left'>
                    <h1 className='font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-5 leading-tight text-white'>
                        Let's go join <br />
                    </h1>
                    <p className='my-5 text-[#afaeae] text-sm sm:text-base md:text-lg text-white'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className='flex items-center gap-3 py-3 px-4 rounded-full shadow-lg justify-between mx-auto md:mx-0 hover:shadow-xl transition-all duration-300 ease-in-out' 
                        style={{ backgroundColor: "#45a049", maxWidth: "190px" }}>
                        <span className='font-bold text-white text-sm sm:text-base'><a href="/register">Learn More</a></span>
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
        </div>
    );
}

export default Hero;
