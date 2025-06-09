// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const reqBody = await request.json();
  if (req.method === "POST") {
    res.status(200).json({ message: "Send OTP" });
  } else {
    res.status(404).json({ message: "Invalid Request" });
  }
}
