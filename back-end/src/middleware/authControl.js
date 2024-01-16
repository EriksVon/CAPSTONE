import jwt from "jsonwebtoken";
import { User } from "../users/usersModel.js";

const authControl = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(payload.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};

export default authControl;
