"use client"

import { signOutAction } from "@/app/action";
import { clearCartLocal } from "@/store/cartslice";
import { clearWishlistLocal } from "@/store/wishlistslice";
import { useDispatch } from "react-redux";




export default function LogoutButton() {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(clearCartLocal())
    dispatch(clearWishlistLocal())
    await signOutAction();
  }

  return (
    <form action={handleLogout} className="action">
        <button
            type="submit"
            className="text-md group w-full text-gray-500 hover:text-black hover:bg-gray-100 px-4 py-2 rounded-md flex gap-3 items-center transition-all duration-150 ease-in"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-gray-600 group-hover:fill-black" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>
        Logout
        </button>
    </form>
  );
}
