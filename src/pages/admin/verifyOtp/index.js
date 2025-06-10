import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

function index() {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid = inputValidation();

    if (isValid) {
      try {
        const formData = {
          otp: otp.toString(),
        };
        const res = await fetch("/api/verifyOtp", {
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

        localStorage.setItem("User", JSON.stringify(data.user));

        toast.success(data.message);

        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const inputValidation = () => {
    let isValid;

    if (otp === "") {
      setOtpError("Please enter otp");
      isValid = false;
      return;
    } else {
      setOtpError("");
      isValid = true;
    }

    if (otp.length > 4 || otp.length < 1) {
      setOtpError("Please enter a valid otp");
      isValid = false;
    } else {
      setOtpError("");
      isValid = true;
    }
    return isValid;
  };

  const inputHandler = (value) => {
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
    <div className="w-full h-full min-h-screen flex justify-center items-center">
      <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%]">
        <div className="mb-5">
          <h1 className="text-[2rem] text-Black font-Nayuki">
            Two-Step Verification
          </h1>
          <p className="text-[1rem] text-PrimaryGray font-Outfit">
            Verify your identity with the One-Time Password (OTP) sent to your
            registered contact number.
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div>
            <label className="block text-[1rem] font-Outfit text-[.95rem]">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="e.g. 1234"
              className="p-2 mt-2 w-full rounded-[.5rem] border border-2 border-SecondaryGray focus:border-Green/80 outline-none"
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => inputHandler(e)}
              maxLength={4}
            />
            <p className="mt-1 mx-1 text-[1rem] text-Red">{otpError}</p>
          </div>
          <button
            type="submit"
            className="w-full p-2 border border-2 border-Green my-4 rounded-[.5rem] font-semibold text-Green  bg:White hover:bg-Green/20"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default index;
