import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <div className='px-5 py-2 w-full flex justify-between items-center bg-white shadow-md'>
            {/* Logo */}
            <div>
                <Link to='/' className='font-bold text-2xl text-blue-600'>Pertamina</Link>
            </div>

            {/* Hamburger Icon */}
            <div className='md:hidden' onClick={toggleMenu}>
                {isOpen ? <FaTimes className='text-2xl text-blue-600' /> : <FaBars className='text-2xl text-blue-600' />}
            </div>

            {/* Links */}
            <div className={`flex-col md:flex md:flex-row items-center md:space-x-5 absolute md:static top-14 right-0 left-0 md:top-0 bg-white md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? 'flex' : 'hidden'}`}>
                <Link to='/' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Home</Link>
                <Link to='#servis' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Servis</Link>
                <Link to='#kontak' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Kontak</Link>
                
                {isLoggedIn && (
                    <Link to='/halaman3' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Input data</Link>
                )}

                {!isLoggedIn ? (
                    <Link to='/login' className='py-2 px-5 text-[18px] font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300 mx-4 md:mx-0'>Login</Link>
                ) : (
                    <div className='relative'>
                        <FaUserCircle 
                            className='text-3xl text-blue-600 cursor-pointer'
                            onClick={toggleProfileMenu}
                        />
                        {isProfileOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50'>
                                <Link to='/ubah-password' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Ubah Password</Link>
                                <button onClick={handleLogout} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left'>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
