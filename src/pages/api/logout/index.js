import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const cookie = serialize("token", "", {
        domain:
          process.env.NODE_ENV === "production"
            ? "otp-auth-task-eazr.vercel.app"
            : undefined,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });

      res.setHeader("Set-Cookie", cookie);
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } else {
    return res.status(405).json({ message: "Invalid Request" });
  }
}
