import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='px-5 py-2 w-full flex justify-between items-center bg-white shadow-md'>
            {/* Logo */}
            <div>
                <a href='/' className='font-bold text-2xl text-blue-600'>Pertamina</a>
            </div>

            {/* Hamburger Icon */}
            <div className='md:hidden' onClick={toggleMenu}>
                {isOpen ? <FaTimes className='text-2xl text-blue-600' /> : <FaBars className='text-2xl text-blue-600' />}
            </div>

            {/* Links */}
            <div className={`flex-col md:flex md:flex-row items-center md:space-x-5 absolute md:static top-14 right-0 left-0 md:top-0 bg-white md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? 'flex' : 'hidden'}`}>
                <a href='/' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Home</a>
                <a href='/#servis' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Servis</a>
                <a href='/#kontak' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Kontak</a>
                <a href='/#aboutus' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>About Us</a>
                <a href='/inputdata' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Input data</a>
                <a href='/login' className='py-2 px-5 text-[18px] font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300 mx-4 md:mx-0'>Login</a>
            </div>
        </div>
    );
}

export default Navbar;







// // src/components/landingpage/navbar.js
// import React from 'react';

// const Navbar = () => {
//     return (
//         <div className='px-5 py-2 w-full flex justify-between items-center'>
//            {/* logo */}
//            <div>

//             <a href='/' className='font-blod text-2xl'>pertamina</a>
//                 </div>

//              {/*links  */}
             
           
//            <div className='flex-wrap flex items-center'>
//                 <a href='/'>Home</a>
//                 <a href='/servis'>Servis</a>
//                 <a href='/kontak'>Kontak</a>
//                 <a href='/about us'>About Us</a>
//                 <a href='/about us' className='py-3 px-5 text-[18px] font-bold text-white bg-indigo-500 rounded-full'>Login</a>

//            </div>
//         </div>
//     );
// }

// export default Navbar;
