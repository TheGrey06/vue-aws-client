import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import express from "express";
var router = express.Router();

router.get("/buckets", async (req, res) => {
  try {
    const accessKeyId = req.headers["x-aws-access-key-id"];
    const secretAccessKey = req.headers["x-aws-access-key-secret"];

    if (!accessKeyId || !secretAccessKey) {
      return res.status(400).json({ error: " AWS credentials are required" });
    }

    const s3Client = new S3Client({
      region: "eu-west-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const input = {};
    const command = new ListBucketsCommand(input);
    const response = await s3Client.send(command);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
