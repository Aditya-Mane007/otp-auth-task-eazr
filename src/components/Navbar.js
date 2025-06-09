import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

function Navbar() {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/logout");
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      }

      toast.success(data.message);

      setTimeout(() => {
        router.push("/admin/login");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full h-full max-w-[1440px] mx-auto">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl">
            Admin Dashboard
          </Link>
          <div>
            <button
              className="px-4 py-2 rounded-[.5rem] border-2 border-Green text-Green font-bold hover:bg-Green/20"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
