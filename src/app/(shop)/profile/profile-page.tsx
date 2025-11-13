"use client";

import LogoutButton from "@/app/component/ui/logout";
import PageIndicator from "@/app/component/ui/pageIndicator";
import { useState } from "react";
import ProfileTitleIndicator from "./profile-title-indicator";
import AccountOrders from "@/app/component/ui/account-orders";
import AccountWishlist from "@/app/component/ui/account-wishlist";
import ProfileAddressForm from "@/app/component/forms/profile-address";
import ProfileDetailForm from "@/app/component/forms/profile-detail";
import UpdatePasswordForm from "@/app/component/forms/updatePasswordForm";




export default function ProfilePage () {
   const [activeSection, setActiveSection] = useState<'orders' | 'wishlist' | 'address' | 'password' | 'account'>('orders');

    // Handlers
    const switchToOrders = () => setActiveSection('orders');
    const switchToWishlist = () => setActiveSection('wishlist');
    const switchToAddress = () => setActiveSection('address');
    const switchToPassword = () => setActiveSection('password');
    const switchToAccount = () => setActiveSection('account');




    return (
        <section className='pt-[130px] w-full flex flex-col items-center'>
            <article className='bg-neutral-100 py-8 w-full flex flex-col items-center'>
                <div className='w-full max-w-[1113px] px-3'>
                    <h2 className='justify-start text-gray-900 text-2xl font-bold font-inter'>My Account</h2>
                    <PageIndicator pageTitle='My Account' />
                </div>
            </article>

            <article className='flex w-full max-w-[1113px] px-3 py-12 gap-10 md:flex-row flex-col divide-x divide-gray-200'>
                <aside className="flex flex-col gap-8 w-full max-w-[250px] py-12">
                    <button onClick={switchToOrders} className={`flex gap-3 items-center py-2 px-4 rounded-md transition-all duration-150 ease-in ${activeSection === 'orders' ? 'font-bold text-black bg-neutral-200' : 'text-gray-600 hover:text-black hover:bg-neutral-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  className={`${activeSection === "orders" ? "fill-black" : "fill-gray-600"}`} viewBox="0 0 256 256"><path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path></svg>
                        <span>
                            orders
                        </span>
                    </button>
                    <button onClick={switchToWishlist} className={`flex gap-3 items-center py-2 px-4 rounded-md transition-all duration-150 ease-in ${activeSection === 'wishlist' ? 'font-bold text-black bg-neutral-200' : 'text-gray-600 hover:text-black hover:bg-neutral-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${activeSection === "wishlist" ? "fill-black" : "fill-gray-600"}`} viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
                        <span>
                            wishlist
                        </span>
                    </button>
                    <button onClick={switchToAddress} className={`flex gap-3 items-center py-2 px-4 rounded-md transition-all duration-150 ease-in ${activeSection === 'address' ? 'font-bold text-black bg-neutral-200' : 'text-gray-600 hover:text-black hover:bg-neutral-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${activeSection === "address" ? "fill-black" : "fill-gray-600"}`} viewBox="0 0 256 256"><path d="M255.42,117l-14-35A15.93,15.93,0,0,0,226.58,72H192V64a8,8,0,0,0-8-8H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H49a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,255.42,117ZM192,88h34.58l9.6,24H192ZM32,72H176v64H32ZM80,208a16,16,0,1,1,16-16A16,16,0,0,1,80,208Zm81-24H111a32,32,0,0,0-62,0H32V152H176v12.31A32.11,32.11,0,0,0,161,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,192,208Zm48-24H223a32.06,32.06,0,0,0-31-24V128h48Z"></path></svg>
                        <span>
                            address
                        </span>
                    </button>
                    <button onClick={switchToPassword} className={`flex gap-3 items-center py-2 px-4 rounded-md transition-all duration-150 ease-in ${activeSection === 'password' ? 'font-bold text-black bg-neutral-200' : 'text-gray-600 hover:text-black hover:bg-neutral-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${activeSection === "password" ? "fill-black" : "fill-gray-600"}`} viewBox="0 0 256 256"><path d="M216.57,39.43A80,80,0,0,0,83.91,120.78L28.69,176A15.86,15.86,0,0,0,24,187.31V216a16,16,0,0,0,16,16H72a8,8,0,0,0,8-8V208H96a8,8,0,0,0,8-8V184h16a8,8,0,0,0,5.66-2.34l9.56-9.57A79.73,79.73,0,0,0,160,176h.1A80,80,0,0,0,216.57,39.43ZM224,98.1c-1.09,34.09-29.75,61.86-63.89,61.9H160a63.7,63.7,0,0,1-23.65-4.51,8,8,0,0,0-8.84,1.68L116.69,168H96a8,8,0,0,0-8,8v16H72a8,8,0,0,0-8,8v16H40V187.31l58.83-58.82a8,8,0,0,0,1.68-8.84A63.72,63.72,0,0,1,96,95.92c0-34.14,27.81-62.8,61.9-63.89A64,64,0,0,1,224,98.1ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg>
                        <span>
                            password
                        </span>
                    </button>
                    <button onClick={switchToAccount} className={`flex gap-3 items-center py-2 px-4 rounded-md transition-all duration-150 ease-in ${activeSection === 'account' ? 'font-bold text-black bg-neutral-200' : 'text-gray-600 hover:text-black hover:bg-neutral-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={`${activeSection === "account" ? "fill-black" : "fill-gray-600"}`} viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
                        <span>
                            Account Details
                        </span>
                    </button>
                    <LogoutButton />
                </aside>


                <div className="pl-12 w-full ">
                    <ProfileTitleIndicator title={activeSection} />

                    {
                        activeSection === 'orders' && (
                            <AccountOrders />
                        )
                    }

                    {
                        activeSection === 'wishlist' && (
                            <AccountWishlist />
                        )
                    }

                    {
                        activeSection === 'address' && (
                            <ProfileAddressForm />
                        )
                    }

                    {
                        activeSection === 'password' && (
                            <UpdatePasswordForm />
                        )
                    }

                    {
                        activeSection === 'account' && (
                            <ProfileDetailForm />                        
                        )
                    }
                </div>
            </article>
        </section>
    )
}
