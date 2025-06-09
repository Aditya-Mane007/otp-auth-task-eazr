export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
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
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Invalid Request" });
  }
}
