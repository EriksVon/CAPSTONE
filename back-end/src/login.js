import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./users/usersModel.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const { email, password } = await req.body;
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
    res.status(200).json({ payload: payload, token: token });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
