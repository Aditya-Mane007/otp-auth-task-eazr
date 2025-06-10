import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { otp } = req.body;

      if (!otp) {
        return res.status(404).json({
          message: "Please enter the otp",
        });
      }

      if (otp !== "7710") {
        return res.status(401).json({
          message: "Please enter valid otp",
        });
      }

      const userData = {
        name: "Admin",
        id: "123456789",
        contactNumber: "7710957578",
      };

      const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      const cookie = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      res.setHeader("Set-Cookie", cookie);
      return res
        .status(200)
        .json({ user: userData, message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({
      message: "Bad Request",
    });
  }
}
