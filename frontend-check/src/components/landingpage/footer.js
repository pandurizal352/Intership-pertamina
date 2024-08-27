import React from 'react';
import heroimg from '../../assets/pertamina.png';

const Footer = () => {
    const TautanLinks = [
        { href: "#promosi", text: "Promosi" },
        { href: "#pengadaan", text: "Pengadaan" },
        { href: "#subsidi-tepat", text: "Subsidi Tepat" },
        { href: "#laporan-tahunan", text: "Laporan Tahunan" },
        { href: "#keberlanjutan", text: "Keberlanjutan" }
    ];

    const SitusTerkaitLinks = [
        { href: "#pertamina-persero", text: "Pertamina (Persero)" },
        { href: "#mypertamina", text: "MyPertamina" },
        { href: "#pertamina-delivery-service", text: "Pertamina Delivery Service" },
        { href: "#pertamina-lubricants", text: "Pertamina Lubricants" },
        { href: "#pertamina-retail", text: "Pertamina Retail" },
        { href: "#pertamina-petrochemical-trading", text: "Pertamina Petrochemical Trading" }
    ];

    const PatraTradingLinks = [
        { href: "#pertamina-maintenance-construction", text: "Pertamina Maintenance & Construction" },
        { href: "#pertamina-patra-logistik", text: "Pertamina Patra Logistik" },
        { href: "#patra-sk", text: "Patra SK" },
        { href: "#pertamina-international-timor-sa", text: "Pertamina International Timor SA" }
    ];

    return (
        <footer className='mt-20 border-t py-8 border-neutral-700 bg-gradient-to-r from-[#025fa4] to-[#03396c] text-neutral-300 text-sm'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <div className='flex flex-col items-start'>
                    <img src={heroimg} alt='Pertamina Logo' className='mb-4 w-32' />
                    <p>
                    Jl. R. E. Martadinata, Mata, Kec. Kendari, Kota Kendari, Sulawesi Tenggara 93121
                    </p>
                    <div className='flex space-x-4'>
                        <a href='#' className='hover:text-white transition duration-300'><i className='fab fa-instagram text-xl'></i></a>
                        <a href='#' className='hover:text-white transition duration-300'><i className='fab fa-tiktok text-xl'></i></a>
                        <a href='#' className='hover:text-white transition duration-300'><i className='fab fa-twitter text-xl'></i></a>
                        <a href='#' className='hover:text-white transition duration-300'><i className='fab fa-facebook-f text-xl'></i></a>
                        <a href='#' className='hover:text-white transition duration-300'><i className='fab fa-youtube text-xl'></i></a>
                    </div>
                </div>
                <div>
                    <h3 className='text-lg font-semibold mb-4'>Tautan</h3>
                    <ul className='space-y-3'>
                        {TautanLinks.map((link, index) => (
                            <li key={index}>
                                <a className='hover:text-white transition duration-300 hover:pl-1' href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg font-semibold mb-4'>Situs Terkait</h3>
                    <ul className='space-y-3'>
                        {SitusTerkaitLinks.map((link, index) => (
                            <li key={index}>
                                <a className='hover:text-white transition duration-300 hover:pl-1' href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg font-semibold mb-4'>Patra Trading</h3>
                    <ul className='space-y-3'>
                        {PatraTradingLinks.map((link, index) => (
                            <li key={index}>
                                <a className='hover:text-white transition duration-300 hover:pl-1' href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='text-center mt-8 text-xs text-neutral-400'>
                © {new Date().getFullYear()} Pertamina. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
