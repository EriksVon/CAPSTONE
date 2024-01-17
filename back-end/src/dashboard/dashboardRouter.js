import express from "express";
import { Dashboard } from "./dashboardModel.js";
import authControl from "../middleware/authControl.js";
import { User } from "../users/usersModel.js";

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

  .get("/:id/:dashboardId", authControl, async (req, res, next) => {
    try {
      const dashboards = await Dashboard.find({
        user: req.user._id,
      });
      res.json(dashboards);
    } catch (error) {
      next(error);
    }
  })

  /* WORKING */
  .post("/create-dashboard", authControl, async (req, res, next) => {
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

      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $push: { dashboards: newDashboard },
      });
      res.send(updatedUser);
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
  });

export default dashboardRouter;
