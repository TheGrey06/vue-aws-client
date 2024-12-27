import express from "express";
var router = express.Router();

router.post("/auth/logout", (req, res) => {
  // Destroy the user's session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res
        .status(500)
        .json({ error: "Failed to log out. Please try again." });
    }

    // Optionally clear the cookie
    res.clearCookie("connect.sid"); // Adjust the cookie name if it's different

    res.json({ message: "Logout successful" });
  });
});

export default router;
