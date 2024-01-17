import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import list from "express-list-endpoints";
import userRouter from "./users/userRouter.js";
import dashboardRouter from "./dashboard/dashboardRouter.js";
import session from "express-session";
import passport from "passport";
import "./middleware/google.js";
import { genericError } from "./middleware/genericError.js";
import { User } from "./users/usersModel.js";

const port = process.env.PORT || 3001;
const server = express();

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const whiteList = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

const corsOptions = {
  origin: function (origin, next) {
    if (whiteList.includes(origin) || !origin) {
      next(null, true);
    } else {
      next(new Error("Not allowed by CORS!"));
    }
  },
};
server.use(cors(corsOptions));
server.use(express.json());

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  done(null, user);
});

server.use("/profile", userRouter);
server.use(genericError);

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
