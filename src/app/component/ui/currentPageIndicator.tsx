import React from 'react';

interface CurrentPageIndicatorProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalItems: number;
}

const CurrentPageIndicator = ({currentPage, setCurrentPage, totalItems}: CurrentPageIndicatorProps) => {
    const totalPages = Math.ceil(totalItems / 9); // Assuming 9 items per page

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    }


    return (
        <>
            {
                totalPages > 1 && (
                    <div className='flex items-center justify-center gap-4 my-4'>
                        <button className="" onClick={prevPage} disabled={currentPage === 1}>
                            <svg className='fill-gray-600 hover:fill-black' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>
                        </button>
                        {
                            totalPages > 5 && (
                                <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
                                    <span>1</span>
                                </button>
                            )
                        }
                        {
                            totalPages > 5 && (
                                <button onClick={() => handlePageClick(2)} disabled={currentPage === 2}>
                                    <span>2</span>
                                </button>
                            )
                        }
                        {
                            currentPage > 3 && (
                                <p>...</p>
                            )
                        }
                        {
                            totalPages > 5 && (
                                <button onClick={() => handlePageClick(totalPages - 1)} disabled={currentPage === totalPages - 1}>
                                    <span>{totalPages - 1}</span>
                                </button>
                            )
                        }
                        {
                            totalPages > 5 && (
                                <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
                                    <span>{totalPages}</span>
                                </button>
                            )
                        }
                        <button onClick={nextPage}>
                            <svg className='fill-gray-600 hover:fill-black' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
                        </button>
                    </div>
                ) 
            }
        </>
    );
};

export default CurrentPageIndicator;