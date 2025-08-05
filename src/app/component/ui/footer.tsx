import React from 'react';
import SubscribeForm from '../subscribeForm';
import FooterLink from './footerLink';



const Footer = () => {
    return (
        <footer>
            <section className='bg-neutral-100 w-full flex items-center justify-center'>
                <article className='w-full md:h-[200px] max-w-[1116px] px-3 py-16 flex flex-col md:flex-row items-center justify-center gap-8'>
                    <div className='md:w-1/2 flex flex-col items-center justify-center md:items-start'>
                        <h2 className='text-gray-900 text-2xl font-bold font-inter text-center md:text-start'>Join Our Newsletter</h2>
                        <p className='text-gray-600 text-sm font-normal font-inter leading-normal text-center md:text-start'>We love to surprise our subscribers with occasional gifts.</p>
                    </div>
                    
                    <SubscribeForm />
                </article>
            </section>

            <FooterLink />
        </footer>
    );
};

export default Footer;