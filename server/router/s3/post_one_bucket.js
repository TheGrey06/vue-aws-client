import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
import express from "express";
var router = express.Router();

router.post("/bucket", async (req, res) => {
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
    const { Bucket, LocationConstraint } = req.body;

    // Validate required fields
    if (!Bucket) {
      return res.status(400).json({ error: "Bucket name is required" });
    }

    // Prepare input for CreateBucketCommand
    const input = {
      Bucket,
      CreateBucketConfiguration: LocationConstraint
        ? { LocationConstraint }
        : undefined,
    };

    // Send CreateBucketCommand to AWS
    const command = new CreateBucketCommand(input);
    const response = await s3Client.send(command);

    // Respond with success
    res.status(200).json({ message: "Bucket created successfully", response });
  } catch (error) {
    console.error("Error creating bucket:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

export default router;
