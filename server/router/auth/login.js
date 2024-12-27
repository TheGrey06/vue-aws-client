import express from "express";
var router = express.Router();

router.post("/auth/login", (req, res) => {
  const { accessKeyId, secretAccessKey } = req.body;

  if (!accessKeyId || !secretAccessKey) {
    return res.status(400).json({ error: "AWS credentials are required" });
  }

  // Store AWS credentials in session
  req.session.awsCredentials = {
    accessKeyId,
    secretAccessKey,
  };

  res.json({
    message: "Login successful",
    sessionExpiry: req.session.cookie.maxAge,
  });
});

export default router;
