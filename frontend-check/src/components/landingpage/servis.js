import React from 'react';
import '../../App.css';

const Servis = () => {
    return (
        <div className='services flex flex-col md:flex-row gap-5 justify-between items-stretch p-5'>
            {/* Menambahkan items-stretch agar tinggi kotak sama */}
            <div className='card flex-1 py-5 px-5 shadow-lg text-center bg-blue-600 rounded-lg transition-transform transform hover:scale-105'>
                <h1 className='font-bold text-white text-xl md:text-2xl mb-2'>Login</h1>
                <p className='subtext text-white text-sm md:text-base'>
                    Customer dapat register untuk memiliki akun. Ketika sudah memiliki akun, maka customer dapat login.
                </p>
            </div>

            <div className='card flex-1 py-5 px-5 shadow-lg text-center bg-blue-600 rounded-lg transition-transform transform hover:scale-105'>
                <h1 className='font-bold text-white text-xl md:text-2xl mb-2'>Menginput Data Layanan</h1>
                <p className='subtext text-white text-sm md:text-base'>
                    Customer dapat menginput data untuk proses pemeriksaan terkait.
                </p>
            </div>
          
            <div className='card flex-1 py-5 px-5 shadow-lg text-center bg-blue-600 rounded-lg transition-transform transform hover:scale-105'>
                <h1 className='font-bold text-white text-xl md:text-2xl mb-2'>Menginput Data Perusahaan</h1>
                <p className='subtext text-white text-sm md:text-base'>
                    Customer dapat menginput nama perusahaan sesuai perusahaan customer.
                </p>
            </div>
           
            <div className='card flex-1 py-5 px-5 shadow-lg text-center bg-blue-600 rounded-lg transition-transform transform hover:scale-105'>
                <h1 className='font-bold text-white text-xl md:text-2xl mb-2'>Verifikasi</h1>
                <p className='subtext text-white text-sm md:text-base'>
                    Menunggu verifikasi dari admin terkait kecocokan pemeriksaan customer.
                </p>
            </div>
        </div>
    );
}

export default Servis;
