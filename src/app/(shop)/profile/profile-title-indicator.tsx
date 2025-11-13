import React from 'react';

interface ProfileTitleIndicatorProps {
    title: string;
}

const ProfileTitleIndicator = ({title}: ProfileTitleIndicatorProps) => {
    return (
        <h2 className='text-[#0E1422] font-inter font-semibold'>
            {title}
        </h2>
    );
};

export default ProfileTitleIndicator;