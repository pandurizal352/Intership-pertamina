import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroimg from '../../assets/login1.jpeg';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Simpan token dan informasi user
                // Di komponen Login setelah login berhasil
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token, );
                const { role, nama_perusahaan } = data.user;
                console.log('Nama Perusahaan:', nama_perusahaan);
                // Set user state di parent component jika diperlukan
                if (setUser) {
                    setUser(data.user);
                }

                // Cek role dan navigasi berdasarkan role
                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'user') {
                    navigate(window.location.href = '/');
                } else {
                    alert('Role tidak dikenal');
                }
            } else {
                alert(`Login gagal: ${data.error || data.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Terjadi kesalahan saat login.');
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-[90%] items-center py-10 px-8 gap-12 h-full my-12 mx-auto bg-white shadow-lg rounded-lg">
            {/* Left side: Form section */}
            <div className="flex-1 md:text-left space-y-6">
                <form onSubmit={handleLogin}>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            required 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            required 
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#45a049] text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Belum memiliki akun? <a href="/register" className="text-indigo-600 hover:underline">Register</a>
                </p>
            </div>

            {/* Right side: Image section */}
            <div className="flex-2 flex justify-center items-center">
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