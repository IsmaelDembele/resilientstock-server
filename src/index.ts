import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import { insert, displayAll } from "./db/utils";
import router from "./routes/routes";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  method: ["GET", "POST"],
  credentials: false,
};

const PORT = process.env.PORT || 5000;

// insert();
// displayAll();

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/strongstock");

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(corsOptions));
  app.use(router);

  app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
  });
};

main().catch(err => console.log(err));
