import React from 'react';

interface AppliedFilterProps {
    color: string,
    category: string[],
    size: string,
    setIsFilterMenuOpen?: (isOpen: boolean) => void;
    isFilterMenuOpen?: boolean;
}

const AppliedFilter = ({color, category, size, setIsFilterMenuOpen, isFilterMenuOpen}: AppliedFilterProps) => {
    const handleFilterToggle = () => {
        if (setIsFilterMenuOpen) {
            setIsFilterMenuOpen(!isFilterMenuOpen);
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
                <p className='text-black text-sm font-medium font-inter leading-normal'>Applied Filters</p>
                <span className="md:hidden"  onClick={handleFilterToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,96a32,32,0,1,0,32,32A32,32,0,0,0,128,96Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,128,144Zm0-64A32,32,0,1,0,96,48,32,32,0,0,0,128,80Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,128,32Zm0,144a32,32,0,1,0,32,32A32,32,0,0,0,128,176Zm0,48a16,16,0,1,1,16-16A16,16,0,0,1,128,224Z"></path></svg>
                </span>
            </div>
            <div className='flex gap-4 flex-wrap'>
                {
                    color && <p className='border border-gray-500 p-2 px-4 rounded-[100px] justify-start text-gray-900 text-xs font-medium font-inter capitalize leading-normal'>color: {color}</p>
                }
                {
                    category && category.map((cat) => (
                        <p className='border border-gray-500 p-2 px-4 rounded-[100px] justify-start text-gray-900 text-xs font-medium font-inter capitalize leading-normal' key={cat}>{cat}</p>
                    ))
                }
                {
                    size && <p className='border border-gray-500 p-2 px-4 rounded-[100px] justify-start text-gray-900 text-xs font-medium font-inter capitalize leading-normal'>size: {size}</p>
                }
            </div>
        </div>
    );
};

export default AppliedFilter;