import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";
const PORT = process.env.PORT || 9090;
import userRoutes from "./routes/user.routes.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "../.env" });
} else {
  dotenv.config();
}

const app = express();

app.use(
  cors({
    origin: "https://pro-connection.vercel.app",
    credentials: true,
  })
);

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
