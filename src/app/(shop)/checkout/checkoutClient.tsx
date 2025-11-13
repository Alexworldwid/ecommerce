"use client"
import PageIndicator from '@/app/component/ui/pageIndicator';
import PlaceOrder from '@/app/component/ui/placeOrder';
import ShippingAddress from '@/app/component/ui/shippingAddress';
import React, { useRef } from 'react';


const CheckoutClient = () => {

    const formRef = useRef<HTMLFormElement | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleOutsideSubmit = async () => {
        if (formRef.current) {
            setLoading(true);
            try {
                await formRef.current.requestSubmit();   
            } finally {
                setLoading(false);
            }
        }
    };


    return (
            <section className='pt-[130px] w-full flex flex-col items-center justify-center'>
                <article className='w-full flex flex-col items-center gap-4 bg-neutral-100'>
                    <div className='w-full max-w-[1113px] px-3 py-8'>
                        <h2 className='justify-start text-gray-900 text-2xl font-bold font-inter'>Checkout</h2>
                        <PageIndicator pageTitle='Checkout' />
                    </div>
                </article>

                <article className='w-full max-w-[1113px] px-3 flex flex-col md:flex-row items-start gap-16 md:gap-0 justify-between py-8'>
                    <ShippingAddress formRef={formRef} />
                    <div className='w-full md:w-[1px] h-[1px] md:h-[500px] bg-gray-200'></div>
                    <PlaceOrder submit={handleOutsideSubmit} Loading={loading} />
                </article>
            </section>
    );
};

export default CheckoutClient;