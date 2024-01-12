import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import list from "express-list-endpoints";
import userRouter from "./users/userRouter.js";
import dashboardRouter from "./dashboard/dashboardRouter.js";
import passport from "passport";
import loginRouter from "./login.js";
import "./middleware/google.js";

const port = process.env.PORT || 3001;
const server = express();
server.use(cors());
server.use(express.json());

server.use(passport.initialize());

server.use("/profile", userRouter);
server.use("/dashboard", dashboardRouter);
server.use("/login", loginRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(port, () => {
      console.log("server is listening to port 🚀: " + port);
      console.table(list(server));
    });
  })
  .catch(() => {
    console.log("Errore nella connessione al DB");
  });
