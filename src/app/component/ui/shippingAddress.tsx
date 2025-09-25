import React from 'react';
import ShippingAddressForm from '../forms/shippingAddressForm';

interface ShippingAddressProps {
    formRef: React.RefObject<HTMLFormElement | null>
}

const ShippingAddress = ({formRef}: ShippingAddressProps) => {
    return (
        <div className='w-full md:max-w-[40%] lg:max-w-[540px] flex flex-col gap-10'>
            <p className='text-gray-900 text-base font-semibold font-inter pt-4'>Shipping Address</p>
            <ShippingAddressForm formRef={formRef} />
        </div>
    );
};

export default ShippingAddress;