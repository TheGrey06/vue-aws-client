import { S3Client, DeleteBucketCommand } from "@aws-sdk/client-s3";
import express from "express";
var router = express.Router();

router.delete("/bucket/:bucket_name", async (req, res) => {
  try {
    // Retrieve AWS credentials from the session
    const credentials = req.session.awsCredentials;

    if (!credentials) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first." });
    }

    const { accessKeyId, secretAccessKey } = credentials;

    // Initialize S3 client with session credentials
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
    // Send CreateBucketCommand to AWS
    const command = new DeleteBucketCommand(input);
    const response = await s3Client.send(command);

    // Respond with success
    res.status(200).json({ message: "Bucket deleted successfully", response });
  } catch (error) {
    console.error("Error deleting bucket:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

export default router;
