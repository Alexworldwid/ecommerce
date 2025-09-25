import { signOutAction } from "@/app/action";



export default function LogoutButton() {
  return (
    <form action={signOutAction} className="action">
        <button
            type="submit"
            className="text-sm text-gray-500 hover:text-black"
        >
        Logout
        </button>
    </form>
  );
}
