import React from 'react';
import { resourcesLinks, platfromLinks, CommunityLinks } from "../../assets/datanya";

const Footer = () => {
    return (
        <footer className='mt-20 border-t py-10 border-neutral-700 bg-[#025fa4]'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
                <div className='text-center'>
                    <h3 className='text-md font-semibold mb-4 text-neutral-300'>Resources</h3>
                    <ul className='space-y-2'>
                        {resourcesLinks.map((link, index) => (
                            <li key={index}>
                                <a className='text-neutral-300 hover:text-white' href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className='text-center'>
                    <h3 className='text-md font-semibold mb-4 text-neutral-300'>Resources</h3>
                    <ul className='space-y-2'>
                        {platfromLinks.map((link, index) => (
                            <li key={index}>
                                <a className='text-neutral-300 hover:text-white' href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='text-center'>
                    <h3 className='text-md font-semibold mb-4 text-neutral-300'>Resources</h3>
                    <ul className='space-y-2'>
                        {CommunityLinks.map((link, index) => (
                            <li key={index}>
                                <a className='text-neutral-300 hover:text-white' href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
