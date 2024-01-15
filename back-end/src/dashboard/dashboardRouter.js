import express from "express";
import { Dashboard } from "./dashboardModel.js";
import { upload } from "../middleware/multer.js";

const dashboardRouter = express.Router();

dashboardRouter
  /* WORKING */
  .get("/test", (req, res) => {
    res.json({ message: "hello, world" });
  })

  .post("/", async (req, res, next) => {
    try {
      const { emails, title, theme, activities } = req.body;
      const file = req.file;
      const newDashboard = await Dashboard.create({
        emails,
        title,
        theme,
        activities,
        file,
      });

      res.status(201).json(newDashboard);
    } catch (error) {
      next(error);
    }
  })
  .patch("/:id/avatar", upload.single("avatar"), async (req, res, next) => {
    try {
      const { id } = req.params;
      const dashboard = await Dashboard.findById(id);
      dashboard.avatar = req.file.path;
      const updatedDashboard = await dashboard.save();
      res.json(updatedDashboard);
    } catch (error) {
      next(error);
    }
  });

export default dashboardRouter;
