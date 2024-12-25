import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import express from "express";
import multer from "multer";

// Set up multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.put("/bucket/:bucket_name", upload.single("file"), async (req, res) => {
  try {
    const accessKeyId = req.headers["x-aws-access-key-id"];
    const secretAccessKey = req.headers["x-aws-access-key-secret"];

    if (!accessKeyId || !secretAccessKey) {
      return res.status(400).json({ error: "AWS credentials are required" });
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
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    // Check if file is present in the request
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    // Prepare input for CreateBucketCommand
    const input = {
      Bucket: bucket_name,
      Body: req.file.buffer,
      Key: req.file.originalname,
    };
    // Send CreateBucketCommand to AWS
    const command = new PutObjectCommand(input);
    const response = await s3Client.send(command);

    // Respond with success
    res.status(200).json({ message: "File uploaded successfully", response });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
});

export default router;
