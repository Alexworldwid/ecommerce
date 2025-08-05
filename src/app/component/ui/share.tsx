"use client";


import React, {useEffect, useRef} from 'react';
import toast from 'react-hot-toast';


type ShareProps = {
    currentUrl: string;
    setOpenShareMenu?: (open: boolean) => void | undefined;
}

const Share = ({currentUrl, setOpenShareMenu}: ShareProps) => {
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check this out!')}&url=${encodeURIComponent(currentUrl)}`;
    const shareRef = useRef<HTMLDivElement>(null);


    const handleCopy = () => {
        if (currentUrl) {
            navigator.clipboard.writeText(currentUrl)
                .then(() => {
                    toast.success('Link copied to clipboard!');
                    if (setOpenShareMenu) {
                        setOpenShareMenu(false);
                    }
                })
                .catch((err) => {
                    console.error('Failed to copy: ', err);
                    toast.error('Failed to copy link.');
                });
        }
    };

    const handleshareClick = () => {
        if (setOpenShareMenu) {
            setOpenShareMenu(false);
        }
    }

    

    // Attach the event listener for clicks outside the component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
                if (setOpenShareMenu) {
                    setOpenShareMenu(false);
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setOpenShareMenu]);



    return (
        <div ref={shareRef} className='fadein absolute top-10 right-0 bg-gray-50 w-full max-w-[240px] p-4 rounded-md shadow-lg z-10 flex flex-col gap-4'>
            <div className='flex flex-col gap-2 '>
                <div>
                    <h2 className='justify-start text-gray-900 text-base font-semibold font-inter'>Copy Link</h2>
                </div>
                <div className='flex flex-row gap-2 items-center '>
                    <p className='justify-start text-zinc-700 text-sm font-normal font-inter leading-normal overflow-ellipsis overflow-hidden whitespace-nowrap px-3.5 py-2.5 rounded-md outline outline-1 outline-offset-[-1px] outline-gray-200'>{currentUrl}</p>

                    <button className='w-full max-w-11 h-11 rounded-md outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-center items-center' onClick={handleCopy} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#7a7a71" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32Zm-8,128H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg>
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <div>
                    <h2 className='justify-start text-gray-900 text-base font-semibold font-inter'>Share</h2>
                </div>
                <div className='flex flex-row gap-4 items-center justify-start rounded-md'>
                    <a onClick={handleshareClick} href={`${facebookShareUrl}`} target='_blank' rel='noopener noreferrer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#7a7a71" viewBox="0 0 256 256"><path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z"></path></svg>
                    </a>
                    <a onClick={handleshareClick} href={`${twitterShareUrl}`} target='_blank' rel='noopener noreferrer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#7a7a71" viewBox="0 0 256 256"><path d="M215,219.85a8,8,0,0,1-7,4.15H160a8,8,0,0,1-6.75-3.71l-40.49-63.63L53.92,221.38a8,8,0,0,1-11.84-10.76l61.77-68L41.25,44.3A8,8,0,0,1,48,32H96a8,8,0,0,1,6.75,3.71l40.49,63.63,58.84-64.72a8,8,0,0,1,11.84,10.76l-61.77,67.95,62.6,98.38A8,8,0,0,1,215,219.85Z"></path></svg>
                    </a>
                    <a onClick={handleshareClick} href={`${whatsappShareUrl}`} target='_blank' rel='noopener noreferrer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#7a7a71" viewBox="0 0 256 256"><path d="M152.58,145.23l23,11.48A24,24,0,0,1,152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155ZM232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-40,24a8,8,0,0,0-4.42-7.16l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88A40,40,0,0,0,192,152Z"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Share;