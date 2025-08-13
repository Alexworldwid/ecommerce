import React from 'react';

interface PaginationInfoProps {
    totalItems: number;
    setSortTypeString: (string: string) => void;
    sortMenuOpen: boolean;
    setSortMenuOpen: (boolean: boolean) => void;
    sortType: string;
    start: number;
    end: number;
}

const PaginationInfo = ({start, end, totalItems, setSortTypeString, sortMenuOpen, setSortMenuOpen, sortType}: PaginationInfoProps) => {

    const handleSortChange = (sortType: string) => {
        setSortTypeString(sortType);
        setSortMenuOpen(false);
    }

    return (
        <div className='flex items-center justify-between mt-2'>
           <span className='justify-start text-gray-600 text-xs font-medium font-inter capitalize leading-normal'> Showing  {totalItems < 1 ? 0 : start} - {end} of {totalItems} items</span>
           <span className='relative flex items-center gap-2 cursor-pointer'>
                <p onClick={() => setSortMenuOpen(!sortMenuOpen)} className='cursor-pointer justify-start text-gray-600 text-xs font-medium font-inter uppercase leading-normal tracking-wide'>SORT BY</p> 
                <svg onClick={() => setSortMenuOpen(!sortMenuOpen)}
                    className={`${sortMenuOpen ? '-rotate-180' : ''} transition-all duration-150 ease-in cursor-pointer`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>

                {
                    sortMenuOpen && (
                        <div
                            className="absolute w-48 bg-white shadow-lg rounded-md border border-gray-200 right-0 top-10 z-20 fadein overflow-hidden"
                        >
                            <button
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortType === "highest-rated" ? 'bg-gray-100' : ''}`}
                            onClick={() => handleSortChange("highest-rated")}
                            >
                            Highest Rated
                            </button>
                            <button
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortType === "lowest-rated" ? 'bg-gray-100' : ''}`}                            
                            onClick={() => handleSortChange("lowest-rated")}
                            >
                            Lowest Rated
                            </button>
                            <div className="border-t border-gray-200"></div>
                            <button
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortType === "lowest-price" ? 'bg-gray-100' : ''}`}
                            onClick={() => handleSortChange("lowest-price")}
                            >
                            Lowest Price
                            </button>
                            <button
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortType === "highest-price" ? 'bg-gray-100' : ''}`}
                            onClick={() => handleSortChange("highest-price")}
                            >
                            Highest Price
                            </button>
                        </div>
                    )
                }
           </span>

        </div>
    );
};

export default PaginationInfo;