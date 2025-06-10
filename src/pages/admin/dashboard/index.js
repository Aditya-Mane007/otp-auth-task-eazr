import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Dashboard({ users, status, messageText }) {
  const [data, setData] = useState(users);
  // const fetchUsers = async () => {
  //   try {
  //     const res = await fetch("/api/getUsers", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await res.json();

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // fetchUsers();
    if (status === 200) {
      toast.success(messageText);
    } else {
      toast.error(messageText);
    }
  }, []);

  return (
    <div className="w-full h-full max-w-[1440px] mx-auto p-4 flex-1">
      <h1 className="text-2xl">Users</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((user) => (
          <div className=" rounded-[.8rem] bg-SecondaryGray flex cursor-pointer">
            <div className="w-[50%] h-[10rem]  bg-PrimaryGray rounded-[.8rem] flex justify-center items-center ">
              <Image
                src="/No_image_available.svg.webp"
                width={100}
                height={100}
                alt={user.name}
              />
            </div>
            <div className="w-[50%] flex flex-col p-2">
              <p title={user.name}>{user.name}</p>
              <p
                className="overflow-hidden text-ellipsis ..."
                title={user.email}
              >
                {user.email}
              </p>
              <Link href={`/admin/users/${user.id}`}>Read More</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { req } = context;

  const token = req.cookies.token;
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/getUsers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        props: {
          users: data.users,
          status: res.status,
          messageText: data.message,
        },
      };
    }

    return {
      props: {
        users: data.users,
        status: 200,
        messageText: data.message,
      },
    };
  } catch (error) {
    return {
      props: {
        users: [],
        status: 500,
        messageText: "Internal Server Error",
      },
    };
  }
};

Dashboard.getLayout = function getLayout(page) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      {page}
    </div>
  );
};

export default Dashboard;
