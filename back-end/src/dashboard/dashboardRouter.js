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
