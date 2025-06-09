import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [contact, setContact] = useState("");
  const [contactError, setContactSetError] = useState("");
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid = inputValidation();

    if (isValid) {
      try {
        const formData = {
          contactNumber: contact.toString(),
        };
        const res = await fetch("/api/sendOtp", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorMessage = await res.json();
          toast.error(errorMessage.message);
          return;
        }

        const data = await res.json();

        toast.success(data.message);

        setTimeout(() => {
          router.push("/admin/verifyOtp");
        }, 1000);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const inputValidation = () => {
    let isValid;

    if (contact === "") {
      setContactSetError("Please enter a admin contact no");
      isValid = false;
      return;
    } else {
      setContactSetError("");
      isValid = true;
    }

    if (contact.length > 10 || contact.length < 10) {
      setContactSetError("Please enter a valid contact no");
      isValid = false;
    } else {
      setContactSetError("");
      isValid = true;
    }
    return isValid;
  };

  const inputHandler = (value) => {
    // console.log(value, /[0-9]/.test(value.key));

    if (value.keyCode !== 8) {
      if (!/[0-9]/.test(value.key)) {
        value.preventDefault();
      }
    }

    if (value.keyCode == 13) {
      submitHandler(value);
    }
  };
  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center bg-[#33333] select-auto">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%]">
        <div className="mb-5">
          <h1 className="text-[2rem] text-Black font-Nayuki">Admin Login</h1>
          <p className="text-[1rem] text-PrimaryGray font-Outfit">
            Access your admin dashboard to securely manage and monitor all user
            activities.
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div>
            <label className="block text-[1rem] font-Outfit text-[.95rem]">
              Enter Admin Contact No
            </label>
            <input
              type="text"
              placeholder="e.g. 9326549507"
              className="p-2 mt-2 w-full rounded-[.5rem] border border-2 border-SecondaryGray focus:border-Green/80 outline-none"
              onChange={(e) => setContact(e.target.value)}
              onKeyDown={(e) => inputHandler(e)}
              maxLength={10}
            />
            <p className="mt-1 mx-1 text-[1rem] text-Red">{contactError}</p>
          </div>
          <button
            type="submit"
            className="w-full p-2 border border-2 border-Green my-4 rounded-[.5rem] font-semibold text-Green  bg:White hover:bg-Green/20"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
