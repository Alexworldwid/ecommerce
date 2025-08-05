import React from 'react';

const Features = () => {
    return (
        <section className='w-full flex items-center justify-center pt-12'>
            <div className='w-full max-w-[1116px] px-3 pb-12 inline-flex justify-between items-center flex-col md:flex-row'>
                <article className='w-full h-40 max-w-80 relative overflow-hidden flex flex-col gap-2 items-center justify-center'>
                    <div className='w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-full'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7007 16.7309V5.0985C15.7007 4.15172 14.9332 3.38422 13.9864 3.38422H2.91838C1.97162 3.38422 1.2041 4.15172 1.2041 5.0985V16.4568C1.2041 17.4036 1.97162 18.171 2.91838 18.171H4.2041M22.7959 11.4969H15.7031M20.489 17.8512H21.0799C22.0267 17.8512 22.7942 17.0837 22.7942 16.1369V10.9924L20.4072 6.10522C20.1197 5.5166 19.5219 5.14328 18.8667 5.14328H16.0099M14.7037 18.1707H9.66797M4.28914 18.2226C4.28914 18.8573 4.54128 19.4661 4.99008 19.9149C5.43888 20.3637 6.04758 20.6158 6.68229 20.6158C7.31699 20.6158 7.92569 20.3637 8.37449 19.9149C8.82329 19.4661 9.07543 18.8573 9.07543 18.2226C9.07543 17.5879 8.82329 16.9792 8.37449 16.5304C7.92569 16.0816 7.31699 15.8295 6.68229 15.8295C6.04758 15.8295 5.43888 16.0816 4.99008 16.5304C4.54128 16.9792 4.28914 17.5879 4.28914 18.2226ZM15.1526 18.2226C15.1526 18.8573 15.4047 19.4661 15.8535 19.9149C16.3023 20.3637 16.911 20.6158 17.5457 20.6158C18.1804 20.6158 18.7891 20.3637 19.2379 19.9149C19.6867 19.4661 19.9389 18.8573 19.9389 18.2226C19.9389 17.5879 19.6867 16.9792 19.2379 16.5304C18.7891 16.0816 18.1804 15.8295 17.5457 15.8295C16.911 15.8295 16.3023 16.0816 15.8535 16.5304C15.4047 16.9792 15.1526 17.5879 15.1526 18.2226Z" stroke="#0E1422" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <h2 className='text-gray-800 text-base font-semibold font-inter'>Free Shipping</h2>
                        <p className='text-gray-600 text-sm font-normal font-inter leading-normal max-w-64 text-center'>Upgrade your style today and get FREE shipping on all orders! Don&apos;t miss out.</p>
                    </div>
                </article>
                <article className='w-full max-w-80 h-40 relative overflow-hidden flex flex-col gap-2 items-center justify-center'>
                    <div className='w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-full'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.05174 13.2695L3 18.5764L6.29748 17.6893L7.18103 21L9.82887 16.3955M17.9483 13.2695L21 18.5764L17.7025 17.6893L16.819 21L14.1712 16.3955M18.8587 9.88992C18.8587 13.6951 15.7862 16.7799 11.9962 16.7799C8.20619 16.7799 5.13379 13.6951 5.13379 9.88992C5.13379 6.08472 8.20619 3 11.9962 3C15.7862 3 18.8587 6.08472 18.8587 9.88992ZM12.277 6.14906L13.2223 8.05825C13.2434 8.10653 13.277 8.14832 13.3194 8.17934C13.3619 8.21036 13.4119 8.2295 13.4641 8.23481L15.5635 8.55486C15.6236 8.5627 15.6801 8.58754 15.7266 8.62646C15.7731 8.66539 15.8076 8.7168 15.826 8.77467C15.8444 8.83256 15.8461 8.89452 15.8308 8.95329C15.8154 9.01208 15.7837 9.06527 15.7394 9.10664L14.1896 10.5854C14.1665 10.6297 14.1544 10.6789 14.1544 10.7289C14.1544 10.7789 14.1665 10.8281 14.1896 10.8724L14.4864 12.9692C14.499 13.0298 14.4939 13.0928 14.4716 13.1505C14.4493 13.2082 14.4108 13.2582 14.3608 13.2945C14.3108 13.3307 14.2513 13.3515 14.1897 13.3545C14.1281 13.3575 14.067 13.3425 14.0137 13.3113L12.1451 12.318C12.0968 12.2961 12.0443 12.2848 11.9912 12.2848C11.9382 12.2848 11.8857 12.2961 11.8373 12.318L9.96876 13.3113C9.9155 13.3425 9.85434 13.3575 9.79273 13.3545C9.73113 13.3515 9.6717 13.3307 9.62168 13.2945C9.57164 13.2582 9.53315 13.2082 9.51087 13.1505C9.48857 13.0928 9.48345 13.0298 9.49612 12.9692L9.84786 10.8724C9.86298 10.8237 9.86587 10.772 9.85629 10.722C9.84669 10.6719 9.82491 10.625 9.79289 10.5854L8.24307 9.0956C8.20196 9.0538 8.1731 9.00143 8.15966 8.94426C8.14623 8.88706 8.14873 8.82727 8.1669 8.77143C8.18505 8.71559 8.21818 8.66583 8.26263 8.62763C8.30709 8.58943 8.36116 8.56425 8.41893 8.55486L10.5183 8.24585C10.5706 8.24054 10.6205 8.2214 10.663 8.19038C10.7055 8.15935 10.739 8.11756 10.7602 8.06928L11.7055 6.1601C11.7307 6.10605 11.7706 6.06019 11.8205 6.0277C11.8704 5.99521 11.9283 5.97737 11.9878 5.97622C12.0473 5.97508 12.1059 5.99065 12.157 6.02121C12.2081 6.05175 12.2497 6.09604 12.277 6.14906Z" stroke="#0E1422" strokeWidth="1.43" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <h2 className='text-gray-800 text-base font-semibold font-inter'>Satisfaction Guarantee</h2>
                        <p className='text-gray-600 text-sm font-normal font-inter leading-normal max-w-64 text-center'>Shop confidently with our Satisfaction Guarantee: Love it or get a refund.</p>
                    </div>
                </article>
                <article className='w-full max-w-80 h-40 relative overflow-hidden flex flex-col gap-2 items-center justify-center'>
                    <div className='w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-full'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7272 8.27901L10.7633 13.8604L8.28131 11.9999M12.443 19.9176C12.1579 20.0275 11.842 20.0275 11.5569 19.9176C9.33201 19.0638 7.41857 17.5557 6.06934 15.5921C4.7201 13.6287 3.99856 11.3024 4 8.92041V5.2301C4 4.90386 4.12967 4.59097 4.36048 4.36029C4.5913 4.1296 4.90435 4 5.23077 4H18.7692C19.0956 4 19.4087 4.1296 19.6395 4.36029C19.8703 4.59097 20 4.90386 20 5.2301V8.92041C20.0014 11.3024 19.2799 13.6287 17.9307 15.5921C16.5814 17.5557 14.6679 19.0638 12.443 19.9176Z" stroke="#0E1422" strokeWidth="1.43" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <h2 className='text-gray-800 text-base font-semibold font-inter'>Secure Payment</h2>
                        <p className='text-gray-600 text-sm font-normal font-inter leading-normal max-w-64 text-center'>Your security is our priority. Your payments are secure with us.</p>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Features;