import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import express from "express";
var router = express.Router();

router.get("/bucket/:bucket_name/objects", async (req, res) => {
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

    // Extract bucket name and optional LocationConstraint from request body
    const { bucket_name } = req.params;

    // Validate required fields
    if (!bucket_name) {
      return res.status(400).json({ error: "Bucket name is required" });
    }
    // Prepare input for CreateBucketCommand
    const input = {
      Bucket: bucket_name,
    };

    const command = new ListObjectsCommand(input);
    const response = await s3Client.send(command);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
