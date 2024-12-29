import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import express from "express";
var router = express.Router();

router.get("/bucket/:bucket_name/objects", async (req, res) => {
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

    // Extract bucket name from params
    const { bucket_name } = req.params;

    // Validate required fields
    if (!bucket_name) {
      return res.status(400).json({ error: "Bucket name is required" });
    }

    // Prepare input for ListObjectsCommand
    const input = {
      Bucket: bucket_name,
      MaxKeys: 100, // Limit the number of results, can be adjusted
    };

    // Send ListObjectsCommand to AWS
    const command = new ListObjectsCommand(input);
    const response = await s3Client.send(command);

    // Return list of objects, paginated if necessary
    res.status(200).json({
      objects: response.Contents || [], // If no objects, return empty array
      nextToken: response.NextContinuationToken || null, // Include token for pagination
    });
  } catch (error) {
    console.error("Error listing objects:", error);
    res.status(500).json({
      error: error.message || "Server error",
    });
  }
});

export default router;
