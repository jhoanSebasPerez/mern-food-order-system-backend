import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./routes/user-route";

mongoose
  .connect(process.env.MONGO_URL_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/wealth", (req, res) => {
  res.send("Everything is fine");
});

// USER ROUTES 
app.use("/api/v1/users", UserRoutes);


app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
