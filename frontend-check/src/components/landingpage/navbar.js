import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Periksa token JWT di localStorage saat komponen dimuat
        const token = localStorage.getItem('token'); // Periksa token dengan kunci yang benar
        setIsLoggedIn(!!token); // Update state isLoggedIn berdasarkan keberadaan token
    }, []); // Hanya dijalankan saat komponen dimuat

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        // Hapus token dari localStorage saat logout
        localStorage.removeItem('token');// Pastikan kunci token sesuai
        localStorage.removeItem('user');
        setIsLoggedIn(false); // Update state setelah logout
        window.location.href = '/login'; // Redirect ke halaman login
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
                <a href='#servis' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Servis</a>
                <a href='#kontak' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Kontak</a>
                <a href='/inputdata' className='text-gray-700 hover:text-blue-600 transition-colors duration-300 px-4 py-2 md:py-0'>Input data</a>
                
                {/* Tampilkan tombol login jika belum login */}
                {!isLoggedIn ? (
                    <a href='/login' className='py-2 px-5 text-[18px] font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors duration-300 mx-4 md:mx-0'>Login</a>
                ) : (
                    // Tampilkan ikon profil jika sudah login
                    <div className='relative'>
                        <FaUserCircle 
                            className='text-3xl text-blue-600 cursor-pointer'
                            onClick={toggleProfileMenu}
                        />
                        {isProfileOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md'>
                                <a href='/ubah-password' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Ubah Password</a>
                                <button onClick={handleLogout} className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
