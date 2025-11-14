import Link from 'next/link';
import React from 'react';

const error = () => {
    return (
        <div className='py-40'>
            <p>error signin </p>
            <Link href="../login">try again</Link>
        </div>
    );
};

export default error;