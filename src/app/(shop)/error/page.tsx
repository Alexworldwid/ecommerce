import Link from 'next/link';
import React from 'react';

const error = () => {
    return (
        <div>
            <p>error signin </p>
            <Link href="../login">try again</Link>
        </div>
    );
};

export default error;