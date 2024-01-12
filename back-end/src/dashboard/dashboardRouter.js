import express from "express";
const dashboardRouter = express.Router();

dashboardRouter
  /* WORKING */
  .get("/test", (req, res) => {
    res.json({ message: "hello, world" });
  });

export default dashboardRouter;
