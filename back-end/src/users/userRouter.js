import express from "express";
import { User } from "./usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authControl from "../middleware/authControl.js";
import passport from "passport";
import dashboardRouter from "../dashboard/dashboardRouter.js";
import { Dashboard } from "../dashboard/dashboardModel.js";

const userRouter = express.Router();

userRouter
  /* WORKING */
  .get("/", async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
      next(error);
    }
  })
  /* WORKING */
  .post("/session", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).send({ message: "error" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).send({ message: "unauthorized" });
      }

      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.status(200).json({ userId: user._id, token: token });
    } catch (error) {
      next(error);
    }
  })
  /* WORKING */
  .get(
    "/oauth-google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account",
    })
  )
  /* WORKING */
  .get(
    "/oauth-callback",
    passport.authenticate("google", {
      failureRedirect: "/",
      session: false,
    }),
    async (req, res) => {
      const payload = { id: req.user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.redirect(
        `${process.env.FE_PROD_URL}/create-or-join?token=${token}&userId=${payload.id}&email=${req.user.email}`
      );
      /* PROD - DEV */
    }
  )
  /* WORKING */
  .get("/me", authControl, async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.user.email }).populate({
        path: "dashboards",
        populate: {
          path: "partecipants activities",
        },
      });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  })
  /* WORKING */
  .get("/:id", authControl, async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate("dashboards");
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  })
  /* WORKING */
  .post("/", async (req, res, next) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const password = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        ...req.body,
        password,
      });
      const payload = { id: newUser._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      const {
        password: _,
        __v,
        ...newUserWithoutPassword
      } = newUser.toObject();

      res.status(201).json({ ...newUserWithoutPassword, token });
    } catch (error) {
      next(error);
    }
  })
  /* OK */
  .put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const userUp = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).send(userUp);
    } catch (error) {
      next(error);
    }
  })
  /* OK */
  .delete("/session", async (req, res, next) => {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus(204);
      });
    } catch (error) {
      next(error);
    }
  })
  /* OK */
  .delete("/:userId", authControl, async (req, res, next) => {
    try {
      const userId = req.params.userId;
      await Dashboard.updateMany(
        { partecipants: userId },
        { $pull: { partecipants: userId } }
      );
      await User.findByIdAndDelete(userId);
      res.status(204).send({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  });

export default userRouter;

userRouter.use("/", dashboardRouter);
