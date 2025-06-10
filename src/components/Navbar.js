import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";

function Navbar() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/logout", {
        credentials: "include",
        method: "GET",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        localStorage.removeItem("User");
        setTimeout(() => {
          router.push("/admin/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")).name);
  }, []);

  return (
    <nav className="w-full h-full max-w-[1440px] mx-auto">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link href="/admin/dashboard" className="text-2xl">
            Admin Panel
          </Link>

          <div className="flex justify-center items-center">
            <div className="mx-2 sm:mx-4 text-lg">Hello, {user}</div>
            <button
              className="px-4 py-2 rounded-[.5rem] border-2 border-Green text-Green font-bold hover:bg-Green/20 flex items-center text-xl"
              onClick={logoutHandler}
            >
              <LuLogOut size={20} className="mx-2" />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
