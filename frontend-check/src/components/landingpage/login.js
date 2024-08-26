import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroimg from '../../assets/roket.png';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        alert('Login gagal: ' + response.statusText);
        return;
      }
      
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        const payload = JSON.parse(atob(data.token.split('.')[1]));  // Assuming JWT is Base64 encoded
        const userRole = payload.role;

        if (userRole === 'sopir') {
          navigate('/user');
        } else if (userRole === 'petugas') {
          navigate('/admin');
        } else {
          alert('Role tidak dikenal');
        }
      } else {
        alert('Login gagal: Token tidak diterima');
      }
    } catch (error) {
      console.error('Error saat login:', error);
      alert('Terjadi kesalahan saat login. Silakan coba lagi.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-[90%] items-center py-10 px-8 gap-12 h-full my-12 mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex-1 md:text-left space-y-6">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
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
          <button
            type="submit"
            className="w-full bg-[#45a049] text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Belum memiliki akun? <a href="/register" className="text-indigo-600 hover:underline">Register</a>
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img
          src={heroimg}
          alt="Login"
          className="w-[240px] sm:w-[300px] md:w-[380px] lg:w-[450px] h-auto object-cover transition-transform transform hover:scale-105 duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Login;
