import {
  IAMClient,
  ListAttachedUserPoliciesCommand,
} from "@aws-sdk/client-iam"; // ES Modules import
import express from "express";
var router = express.Router();

router.get("/user/:user_name", async (req, res, next) => {
  try {
    const accessKeyId = req.headers["x-aws-access-key-id"];
    const secretAccessKey = req.headers["x-aws-access-key-secret"];

    if (!accessKeyId || !secretAccessKey) {
      return res.status(400).json({ error: " AWS credentials are required" });
    }

    const s3Client = new IAMClient({
      region: "eu-west-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const { user_name } = req.params;
    if (!user_name) {
      return res.status(400).json({ error: "Bucket name is required" });
    }

    const input = {
      UserName: user_name,
    };

    const command = new ListAttachedUserPoliciesCommand(input);
    const response = await s3Client.send(command);
    res.json(response);
  } catch (error) {
    next(error);
  }
});
export default router;
