import React from 'react';
import '../../App.css';

const Kontak = () => {
    return (
        <div className='kontak'>
            <div className='kontak_container'>
                <div className='flex-justify-between w-full items-center mb-5'>
                    <div>
                        <h3 className='uppcase mt-3' style={{ fontWeight:"500", color:"#45a049" }}>KONTAK</h3>
                        <h1 className='font-bold mt-4' style={{ fontSize:"40px" }}>Kontak profil<br/> untuk orang campany</h1>    
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full justify-between items-center'>
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className='py-5 px-5 bg-white shadow-lg'>
                            <img src="" className="w-[100px] h-[100px] rounded-lg shadow-xl mb-5" alt="foto-profile"/>
                            <h1 className='font-bold text-xl'>Jr. Supervisor Quality & Quantitiy</h1>
                            <span className='font-semibold text-[10px] my-5' style={{ color:"gray", marginTop:"25px" }}>
                                Nama panggilan orang-perusahaan  Supervisor / 
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Kontak;
