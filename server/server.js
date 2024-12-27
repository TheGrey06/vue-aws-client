import express from "express";
import cors from "cors";
import get_all_buckets from "./router/s3/get_all_buckets.js";
import post_one_bucket from "./router/s3/post_one_bucket.js";
import delete_one_bucket from "./router/s3/delete_one_bucket.js";
import put_one_object from "./router/s3/put_one_object.js";
import get_all_objects from "./router/s3/get_all_objects.js";
import delete_one_object from "./router/s3/delete_one_object.js";
import get_user_policy from "./router/iam/get_user_policy.js";

const app = express();
app.use(express.json());
app.use(cors());

app.options("/api/v1/buckets", cors());
app.use("/api/v1/", get_all_buckets);

app.options("/api/v1/bucket", cors());
app.use("/api/v1/", post_one_bucket);

app.options("/api/v1/bucket", cors());
app.use("/api/v1/", delete_one_bucket);

app.options("/api/v1/bucket", cors());
app.use("/api/v1/", put_one_object);

app.options("/api/v1/bucket", cors());
app.use("/api/v1/", get_all_objects);

app.options("/api/v1/bucket", cors());
app.use("/api/v1/", delete_one_object);

app.options("/api/v1/user", cors());
app.use("/api/v1/", get_user_policy);

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(err.status || 500).json({
    error: err.message || "An unexpected error occurred",
  });
  next();
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
