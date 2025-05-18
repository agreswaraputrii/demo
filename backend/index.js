import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import CatatanRoute from "./routes/CatatanRoute.js";
import UserRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://c-03-450907.uc.r.appspot.com"],
  })
);
app.get("/", (req, res) => res.render("index"));
app.use(express.json());
app.use(CatatanRoute, UserRoute);

app.listen(5000, () => console.log("Server connected"));