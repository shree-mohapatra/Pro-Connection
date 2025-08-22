import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";

import userRoutes from "./routes/user.routes.js";
dotenv.config({ path: "../.env" });

const app = express();

app.use(cors());

app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"));

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => console.log("connected to the server"))
  .catch((err) => console.log(err));

app.listen(9090, () => {
  console.log(`listening on port ${9090}`);
});
