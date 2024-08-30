import React from 'react';
import '../../App.css';

import img1 from '../../assets/ah.jpeg'; 
import img2 from '../../assets/pa.jpeg'; 
import img3 from '../../assets/da.jpeg'; 
import img4 from '../../assets/am.jpeg'; 
import img5 from '../../assets/ri.jpeg'; 
import img6 from '../../assets/ho.jpeg';
import img7 from '../../assets/muz.jpeg'; 
import img8 from '../../assets/su.jpeg';  
import img9 from '../../assets/ma.jpeg';  



const Kontak = () => {
    const contacts = [
        { role: "INTERGRATED TERMINAL MANAGER", name: "SUPRIYONO AGUNG NUGROHO", imgSrc: img9 },
        { role: "LEAD OPR. FUEL DIST", name: "AHMAD RIZAL EFENDI", imgSrc: img5 },
        { role: "SPV. REC. STRG. & DIST", name: "MUZAWIR", imgSrc: img7 },
        { role: "SPV. MAINT. PLAN & SERVICE", name: "ABDULLAH BUSTAN", imgSrc: img3 },
        { role: "JR. SPV. HSSE & FLEET SAFETY", name: "THOMAS AGUNG SP", imgSrc: img6 },     
        { role: "JR. SPV. SALES SERVICE & GA", name: "MOHAMAD AMHAR", imgSrc: img4 },
        { role: "JR. SPV. FUEL DIST", name: "ACHMAD RIFQI R.", imgSrc: img1 },
        { role: "JR. SPV. REC. & STRG.", name: "SENDI MUH. JULIANTO", imgSrc: img2 },
        { role: "JR. SPV. REC. & STRG.", name: "SUDIN", imgSrc: img8 },
       
       
    ];

    return (
        <div className='kontak'>
            <div className='kontak_container'>
                <div className='flex-justify-between w-full items-center mb-5'>
                    <div>
                        <h3 className='uppercase mt-3' style={{ fontWeight:"500", color:"#45a049" }}>Profile</h3>
                        <h1 className='font-bold mt-4' style={{ fontSize:"40px" }}> Profile Company</h1>    
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full justify-between items-center'>
                    {contacts.map((contact, index) => (
                        <div key={index} className={`py-5 px-5 bg-white shadow-lg`}>
                            <img src={contact.imgSrc} className="w-[100px] h-[100px] rounded-lg shadow-xl mb-5" alt="foto-profile"/>
                            <h1 className='font-bold text-xl'>{contact.role}</h1>
                            <span className='font-semibold text-[10px] my-5' style={{ color:"gray", marginTop:"25px" }}>
                                {contact.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Kontak;
