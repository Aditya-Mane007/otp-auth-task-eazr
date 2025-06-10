import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Image from "next/image";

function UserById({ userData, messageText }) {
  const router = useRouter();

  // const fetchUser = async () => {
  //   try {
  //     const res = await fetch(
  //       process.env.NEXT_PUBLIC_API_URL + `/api/getUserById/123456789`,
  //       {
  //         method: "GET",
  //         credentials: "include",
  //       }
  //     );
  //     const data = await res.json();

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (router.query.id) {
  //     fetchUser();
  //   }
  // }, []);
  return (
    <div className="w-full h-full max-w-[1440px] mx-auto flex-1 flex flex-col">
      <div className="p-4 w-full mx-auto md:flex ">
        <div className="w-[10rem] h-[10rem] mx-auto">
          <Image
            src="/No_image_available.svg.webp"
            width={100}
            height={100}
            className="w-full h-full object-contain"
            alt={userData.name}
          />
        </div>
        <div className="w-full text-xl px-4 mx-auto flex flex-col items-center md:items-start justify-center ">
          <div>Name : {userData.name}</div>
          <div>Email : {userData.email}</div>
          <div>Phone : {userData.phone}</div>
        </div>
      </div>
      <div className="flex-1 text-xl flex justify-center items-center border-t-2 border-PrimaryGray">
        No Activities Yet
      </div>
      {/* {router.query.id} */}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { id } = context.params;

  const token = req.cookies.token;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/api/getUserById/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch User");
    }

    return {
      props: {
        userData: data.users,
        messageText: data.message,
      },
    };
  } catch (error) {
    return {
      props: {
        userData: [],
        messageText: "Internal Server Error",
      },
    };
  }
};

UserById.getLayout = function getLayout(page) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      {page}
    </div>
  );
};

export default UserById;
