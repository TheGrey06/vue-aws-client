import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import express from "express";
var router = express.Router();

router.delete("/bucket/:bucket_name/object/:object_name", async (req, res) => {
  try {
    // Extract AWS credentials from headers
    const accessKeyId = req.headers["x-aws-access-key-id"];
    const secretAccessKey = req.headers["x-aws-access-key-secret"];

    if (!accessKeyId || !secretAccessKey) {
      return res.status(400).json({ error: "AWS credentials are required" });
    }

    // Initialize S3 client with dynamic credentials
    const s3Client = new S3Client({
      region: "eu-west-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Extract bucket name and optional LocationConstraint from request body
    const { bucket_name, object_name } = req.params;

    // Validate required fields
    if (!bucket_name) {
      return res.status(400).json({ error: "Bucket name is required" });
    }
    if (!object_name) {
      return res.status(400).json({ error: "Object name is required" });
    }

    // Prepare input for CreateBucketCommand
    const input = {
      Bucket: bucket_name,
      Key: object_name,
    };
    // Send CreateBucketCommand to AWS
    const command = new DeleteObjectCommand(input);
    const response = await s3Client.send(command);

    // Respond with success
    res.status(200).json({ message: "Object deleted successfully", response });
  } catch (error) {
    console.error("Error deleting object:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

export default router;
