import express from "express";
import { User } from "./usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authControl from "../middleware/authControl.js";
import passport from "passport";

const userRouter = express.Router();

userRouter

  /* WORKING */
  .get("/", authControl, async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
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
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    async (req, res) => {
      const payload = { id: req.user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.redirect(
        `http://localhost:3000/main`
        /* `http://localhost:3000?token=${token}&userId=${req.user._id}` */
      );
    }
  )

  /* WORKING */
  .get("/me", authControl, async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  })
  /* WORKING */
  .get("/:id", authControl, async (req, res, next) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      next(error);
    }
  })

  /* WORKING */
  .post("/", async (req, res, next) => {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        ...req.body,
        password,
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  })

  /* WORKING */
  .put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const userUp = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).send(userUp);
    } catch (error) {
      next(error);
    }
  })

  .delete("/:id", authControl, async (req, res, next) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).send();
      }
      res.status(204).send({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  });

//OAUTH GOOGLE

// Logout
//  .delete("/session", async (req, res) => {})

export default userRouter;
