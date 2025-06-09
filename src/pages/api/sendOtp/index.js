export default async function handler(req, res) {
  if (req.method === "POST") {
    const { contactNumber } = req.body;

    if (!contactNumber) {
      return res.status(404).json({
        message: "Please enter a admin contact no",
      });
    }

    if (contactNumber !== "7710957578") {
      return res.status(401).json({
        message: "Please enter a valid contact no",
      });
    }

    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(405).json({ message: "Invalid Request" });
  }
}
