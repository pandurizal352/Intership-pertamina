import React from 'react';
import heroimg from '../../assets/roket.png';

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row w-[90%] items-center py-10 px-8 gap-12 h-full my-12 mx-auto bg-white shadow-lg rounded-lg">
            {/* Left side: Form section */}
            <div className="flex-1 md:text-left space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                        required 
                    />
                </div>
                <button className="w-full bg-[#45a049] text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                    Login
                </button>
                <p className="text-center text-gray-600 mt-4">
                    Belum memiliki akun? <a href="/register" className="text-indigo-600 hover:underline">Register</a>
                </p>
            </div>

            {/* Right side: Image section */}
            <div className="flex-1 flex justify-center items-center">
                <img 
                    src={heroimg} 
                    alt="Login" 
                    className="w-[240px] sm:w-[300px] md:w-[380px] lg:w-[450px] h-auto object-cover transition-transform transform hover:scale-105 duration-300 ease-in-out"
                />
            </div>
        </div>
    );
}

export default Login;
