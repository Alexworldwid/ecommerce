import Link from 'next/link';
import React from 'react';

const FooterLink = () => {
    return (
        <section className='w-full flex items-center justify-center flex-col pt-4 md:pt-20 px-3'>
            <article className='max-w-[1116px] w-full flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 justify-between pb-12 gap-y-10 md:gap-y-8'>
                <div className='inline-flex flex-col justify-start items-start gap-10'>
                    <div>
                        {/* logo */}
                        <Link href="/" className='flex items-center gap-2'>
                            <div className='relative w-10 h-10 flex items-center justify-center border-gray-700 border-solid border rounded-lg'>
                                <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg" className=''>
                                    <path d="M12.4769 4.34848L6.20402 0.555028C5.61195 0.192858 4.93884 0.00143753 4.25319 0.000244141C2.20945 0.000244141 0.334752 1.71219 0.334752 4.10496V18.3073L12.4769 10.9669C14.9083 9.49459 14.9083 5.8199 12.4769 4.34848ZM3.84837 11.4479V3.86787L10.1163 7.6566L3.84837 11.4479Z" fill="black"/>
                                    <path d="M15.8489 25.9844C15.8489 26.0273 3.99081 25.966 3.99081 25.966L2.94336 25.8425C1.24672 25.644 -0.0557464 24.1232 0.00196809 22.3346C0.00196809 22.2917 0.00565199 22.2518 0.00810792 22.2102C0.0547076 21.4364 0.326076 20.6961 0.78582 20.0884C0.972526 19.8461 1.20091 19.6425 1.45916 19.4882L10.4782 14.0724C12.3414 12.9534 13.8931 12.562 14.6999 10.534C14.9974 9.77562 15.126 8.95611 15.0757 8.13784L15.0446 7.58649L15.9651 12.9204C16.083 13.8263 15.9013 14.7537 15.4211 15.5168C15.1326 15.9784 14.7475 16.3652 14.2951 16.6478L3.82954 21.8943C3.81908 21.9005 3.80897 21.9074 3.79925 21.9148C3.51273 22.1292 3.68955 22.6068 4.04034 22.5867L12.7515 22.6402C14.4433 22.5416 15.8526 24.2111 15.8489 25.9844Z" fill="black"/>
                                </svg>
                            </div>
                            <p className='text-gray-900 text-xl font-extrabold font-manrope capitalize'>Ecommerce</p>
                        </Link>
                    </div>
                    <ul className='inline-flex justify-start items-start gap-4'>
                        <li className='relative'>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19V17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26V19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z" fill="#5C5F6A"/>
                            </svg>
                        </li>
                        <li></li>
                    </ul>
                </div>

                <div className='flex w-full md:inline-flex flex-col justify-center items-center md:justify-start md:items-start gap-4 md:gap-10'>
                    <div>
                        <h2 className='text-gray-950 text-sm font-medium font-inter leading-normal uppercase'>Support</h2>
                    </div>
                    <ul className=' inline-flex flex-col justify-center items-center md:justify-start md:items-start gap-4'>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>FAQ</Link>
                        </li>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>Terms Of Use</Link>
                        </li>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
                <div className='inline-flex flex-col justify-center items-center md:justify-start md:items-start gap-4 md:gap-10'>
                    <div>
                        <h2 className='text-gray-950 text-sm font-medium font-inter leading-normal uppercase'>Company</h2>
                    </div>
                    <ul className='inline-flex flex-col justify-center items-center md:justify-start md:items-start gap-4'>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>About Us</Link>
                        </li>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>Contact</Link>
                        </li>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>Careers</Link>
                        </li>
                    </ul>
                </div>
                <div className='inline-flex flex-col items-center justify-center md:justify-start md:items-start gap-4 md:gap-10 md:col-start-2 lg:col-start-auto'>
                    <div>
                        <h2 className='text-gray-950 text-sm font-medium font-inter leading-normal uppercase'>Shop</h2>
                    </div>
                    <ul className='inline-flex flex-col justify-center items-center md:justify-start md:items-start gap-4'>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>My Account</Link>
                        </li>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>Checkout</Link>
                        </li>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:text-gray-900'>Cart</Link>
                        </li>
                    </ul>
                </div>
                <div className='inline-flex flex-col items-center justify-center md:justify-start md:items-start gap-4 md:gap-10'>
                    <div>
                        <h2 className='text-gray-950 text-sm font-medium font-inter leading-normal uppercase'>Accepted Payments</h2>
                    </div>
                    <ul className='inline-flex justify-start items-center gap-4'>
                        <li>
                            <svg className='group' width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_5438_34)">
                                    <path d="M15.017 22.85C13.3637 24.2432 11.27 25.005 9.108 25C4.078 25 0 20.97 0 16C0 11.03 4.078 7.00002 9.108 7.00002C11.363 7.00002 13.426 7.81002 15.017 9.15002C16.67 7.75705 18.7633 6.99526 20.925 7.00002C25.955 7.00002 30.033 11.03 30.033 16C30.033 20.97 25.955 25 20.925 25C18.7633 25.0048 16.67 24.243 15.017 22.85Z" fill="" className='fill-[#5C5F6A] transition-all duration-150 ease-in group-hover:fill-[#ED0006]'/>
                                    <path d="M15.017 22.85C16.0186 22.0115 16.8242 20.9636 17.377 19.7801C17.9299 18.5966 18.2166 17.3063 18.217 16C18.217 13.257 16.975 10.8 15.017 9.15002C16.67 7.75705 18.7633 6.99526 20.925 7.00002C25.955 7.00002 30.033 11.03 30.033 16C30.033 20.97 25.955 25 20.925 25C18.7633 25.0048 16.67 24.243 15.017 22.85Z"  className='fill-[#4C5F6A] transition-all duration-150 ease-in group-hover:fill-[#F9A000]'/>
                                    <path d="M15.017 22.85C16.975 21.2 18.217 18.743 18.217 16C18.217 13.257 16.975 10.8 15.017 9.15002C14.0154 9.98856 13.2098 11.0365 12.657 12.22C12.1041 13.4035 11.8174 14.6938 11.817 16C11.817 18.743 13.058 21.2 15.017 22.85Z"  className='fill-[#5C5F1A] transition-all duration-150 ease-in group-hover:fill-[#FF5E00]'/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_5438_34">
                                        <rect width="30.033" height="32" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </li>
                        <li>
                            <svg className='group' width="57" height="32" viewBox="0 0 57 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.224 10L5.03296 21.826H11.248L12.018 19.941H13.779L14.55 21.827H21.39V20.387L22 21.827H25.54L26.149 20.357V21.827H40.376L42.106 19.99L43.726 21.827L51.033 21.842L45.825 15.946L51.033 10H43.839L42.155 11.803L40.586 10H25.109L23.779 13.053L22.42 10H16.219V11.39L15.529 10H10.226H10.224ZM11.427 11.68H14.457L17.9 19.699V11.679H21.219L23.879 17.429L26.329 11.679H29.633V20.166H27.623L27.607 13.516L24.677 20.166H22.88L19.935 13.516V20.166H15.801L15.018 18.263H10.783L10.001 20.164H7.78696L11.427 11.679V11.68ZM39.64 11.68H31.47V20.16H39.513L42.106 17.35L44.605 20.16H47.217L43.42 15.945L47.217 11.679H44.718L42.138 14.458L39.64 11.679V11.68ZM12.9 13.115L11.506 16.505H14.294L12.901 13.115H12.9ZM33.487 14.985V13.435H38.585L40.809 15.912L38.486 18.404H33.487V16.712H37.944V14.986H33.487V14.985Z"  className='fill-[#4C5F6A] transition-all duration-150 ease-in group-hover:fill-[#016FD0]'/>
                            </svg>
                        </li>
                        <li>
                            <svg className='group' width="43" height="14" viewBox="0 0 43 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.515 7.91772e-05C28.5598 -0.00452076 29.5959 0.191351 30.567 0.577079L30.104 3.50308L29.796 3.36008C29.003 2.9927 28.1355 2.81468 27.262 2.84008C25.919 2.84008 25.316 3.43108 25.302 4.00808C25.302 4.64308 26.032 5.06108 27.222 5.68108C29.182 6.64708 30.09 7.82908 30.077 9.37108C30.049 12.1841 27.725 14.0001 24.155 14.0001C22.629 13.9851 21.159 13.6531 20.361 13.2791L20.837 10.2361L21.285 10.4531C22.391 10.9581 23.119 11.1731 24.477 11.1731C25.457 11.1731 26.507 10.7551 26.52 9.84808C26.52 9.25608 26.073 8.82408 24.757 8.16008C23.469 7.51108 21.747 6.43008 21.775 4.48408C21.789 1.84508 24.155 7.91772e-05 27.515 7.91772e-05ZM14.831 13.7981H18.233L20.361 0.246079H16.959L14.831 13.7981Z"  className='fill-[#4C5F6A] transition-all duration-150 ease-in group-hover:fill-[#00579F]'/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M39.288 0.246079H36.657C35.845 0.246079 35.229 0.491079 34.878 1.37008L29.825 13.7981H33.395L34.109 11.7651H38.477C38.575 12.2411 38.883 13.7981 38.883 13.7981H42.033L39.288 0.246079ZM35.088 8.99608L36.448 5.20608C36.441 5.21608 36.486 5.09008 36.552 4.90108C36.65 4.62108 36.795 4.20808 36.895 3.90808L37.132 5.07508C37.132 5.07508 37.777 8.31908 37.917 8.99708H35.089L35.088 8.99608Z" className='fill-[#4C5F6A] transition-all duration-150 ease-in group-hover:fill-[#00579F]'/>
                                <path d="M8.65696 9.48708L11.989 0.246079H15.587L10.239 13.7841H6.64096L3.58896 1.93208C5.74496 3.10008 7.67696 5.45008 8.29296 7.61208L8.65696 9.48708Z" className='fill-[#4C5F6A] transition-all duration-150 ease-in group-hover:fill-[#00579F]' />
                                <path d="M5.56296 0.246079H0.0889592L0.032959 0.519079C4.30296 1.64408 7.13096 4.35508 8.29296 7.61308L7.10296 1.38508C6.90696 0.519079 6.30496 0.275079 5.56296 0.245079V0.246079Z" className='fill-[#4C5F6A] transition-all duration-150 ease-in group-hover:fill-[#FAA61A]'/>
                            </svg>
                        </li>
                    </ul>
                </div>
            </article>

            <article className='w-full flex items-center justify-center'>
                <div className='max-w-[1116px] w-full py-7 border-t border-neutral-300 inline-flex justify-center items-center gap-2.5 overflow-hidden'>
                    <p className='text-gray-600 text-sm font-normal font-inter leading-normal'>&copy; 2025 StackHaven. All rights reserved.</p>
                </div>
            </article>
        </section>
    );
};

export default FooterLink;