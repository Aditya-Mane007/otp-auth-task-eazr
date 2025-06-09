import { users } from "@/utils/utils";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;



    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.headers.cookie) {
      const parsedCookies = parse(req.headers.cookie);
      token = parsedCookies.token;
    }
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }


    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

      if (decoded.id === "123456789") {
        const filteredUsers = users.filter((user) => user.id === id);
        return res.status(200).json({
          users: filteredUsers[0],
          message: "Get User By Id",
        });
      } else {
        return res.status(404).json({
          users: [],
          message: "Something went wrong",
        });
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
