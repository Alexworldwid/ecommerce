import React from 'react';

interface SortByProps {
    sortType: string;
    setSortType: (sort: string) => void;
}


const SortBy = ({setSortType, sortType}: SortByProps) => {


    return (
        <div className="absolute top-10 right-0 w-44 bg-white fadein flex flex-col shadow-lg rounded-md overflow-hidden">
            <button
                onClick={() => setSortType("newest")}
                className={`px-4 py-2 text-left transition-all duration-150 ease hover:bg-gray-100 ${
                sortType === "newest" ? "bg-gray-200 font-semibold" : ""
                }`}
            >
                🕒 Newest
            </button>

            <button
                onClick={() => setSortType("oldest")}
                className={`px-4 py-2 text-left transition-all duration-150 ease hover:bg-gray-100 ${
                sortType === "oldest" ? "bg-gray-200 font-semibold" : ""
                }`}
            >
                🕰️ Oldest
            </button>

            <button
                onClick={() => setSortType("lowest")}
                className={`px-4 py-2 text-left transition-all duration-150 ease hover:bg-gray-100 ${
                sortType === "lowest" ? "bg-gray-200 font-semibold" : ""
                }`}
            >
                ⬇️ Lowest Rated
            </button>

            <button
                onClick={() => setSortType("highest")}
                className={`px-4 py-2 text-left transition-all duration-150 ease hover:bg-gray-100 ${
                sortType === "highest" ? "bg-gray-200 font-semibold" : ""
                }`}
            >
                ⬆️ Top Rated
            </button>
        </div>

    );
};

export default SortBy;