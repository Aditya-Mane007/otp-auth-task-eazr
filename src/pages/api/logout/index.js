// import { serialize } from "cookie";

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       let token;

//       if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//       ) {
//         token = req.headers.authorization.split(" ")[1];
//       }

//       if (!token && req.headers.cookie) {
//         const parsedCookies = parse(req.headers.cookie);
//         token = parsedCookies.token;
//       }
//       if (!token) {
//         return res
//           .status(401)
//           .json({ message: "Unauthorized: No token provided" });
//       }

//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (decoded.id === "123456789") {
//           const cookie = serialize("token", "", {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             path: "/",
//             maxAge: 0,
//           });
//           res.setHeader("Set-Cookie", cookie);
//           return res.status(200).json({ message: "Logout successful" });
//         } else {
//           return res.status(404).json({
//             users: [],
//             message: "Something went wrong",
//           });
//         }
//       } catch (error) {
//         return res.status(401).json({ message: "Invalid or expired token" });
//       }
//     } catch (error) {
//       return res.status(500).json({
//         message: "Internal Server Error",
//       });
//     }
//   } else {
//     return res.status(405).json({ message: "Invalid Request" });
//   }
// }

import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Invalid Request" });
  }

  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Immediately expire the cookie
  });

  res.setHeader("Set-Cookie", [cookie]);
  return res.status(200).end(); // Don’t send JSON
}
