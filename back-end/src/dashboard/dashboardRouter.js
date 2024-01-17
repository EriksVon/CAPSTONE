import express from "express";
import { Dashboard } from "./dashboardModel.js";
import { upload } from "../middleware/multer.js";
import { User } from "../users/usersModel.js";
import authControl from "../middleware/authControl.js";

const dashboardRouter = express.Router();

dashboardRouter
  /* WORKING */
  .get("/", async (req, res, next) => {
    try {
      const dashboard = await Dashboard.find();
      res.json(dashboard);
    } catch (error) {
      res.status(500).send(error);
      next(error);
    }
  })
  /* WORKING */
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const dashboard = await Dashboard.findById(id);
      res.json(dashboard);
    } catch (error) {
      next(error);
    }
  })

  .get("/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;
      const dashboard = await Dashboard.findOne({
        partecipants: { $in: [userId] },
      });
      console.log("Dashboard data:", dashboard);
      if (!dashboard) {
        return res
          .status(404)
          .json({ message: "Dashboard not found for the user" });
      }
      res.json(dashboard);
    } catch (error) {
      res.status(500).send(error);
      res.status(500).json({ error: error.message });
      next(error);
    }
  })

  /* WORKING */
  .post("/", authControl, async (req, res, next) => {
    try {
      const { emails, title, theme, activities, partecipants, dashboardToken } =
        req.body;
      const file = req.file;

      const newDashboard = await Dashboard.create({
        emails,
        title,
        theme,
        activities,
        avatar: file,
        partecipants,
        dashboardToken,
      });

      const userId = req.user._id;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { dashboards: newDashboard._id } },
        { new: true }
      );

      res.status(201).json(newDashboard);
    } catch (error) {
      next(error);
    }
  })

  .post("/join-dashboard", async (req, res, next) => {
    try {
      const { email, dashboardToken } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const dashboard = await Dashboard.findOne({ emails: email });
      if (!dashboard) {
        return res
          .status(404)
          .json({ message: "Dashboard not found for the provided email" });
      }

      if (dashboard.dashboardToken !== dashboardToken) {
        return res.status(401).json({ message: "Invalid token" });
      }
      if (dashboard.partecipants.includes(user._id)) {
        return res
          .status(400)
          .json({ message: "User is already a participant" });
      }

      dashboard.partecipants.push(user._id);
      user.dashboards.push(dashboard._id);
      await dashboard.save();
      await user.save();

      res.json({
        message: "User added to the dashboard successfully",
        dashboard,
      });
    } catch (error) {
      res.status(500).send(error);
      next(error);
    }
  })

  .patch("/:id/avatar", upload.single("avatar"), async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedDashboard = await Dashboard.findByIdAndUpdate(id, {
        avatar: req.file.path,
      });
      res.send(updatedDashboard);
    } catch (error) {
      next(error);
    }
  });

export default dashboardRouter;
