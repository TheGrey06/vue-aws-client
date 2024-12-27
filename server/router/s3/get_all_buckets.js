import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import express from "express";
var router = express.Router();

router.get("/buckets", async (req, res) => {
  try {
    const credentials = req.session.awsCredentials;

    if (!credentials) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first." });
    }

    const { accessKeyId, secretAccessKey } = credentials;

    const s3Client = new S3Client({
      region: "eu-west-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
