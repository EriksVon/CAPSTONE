import express from "express";
import { Dashboard } from "./dashboardModel.js";
import authControl from "../middleware/authControl.js";
import { User } from "../users/usersModel.js";
import brevo from "@getbrevo/brevo";
let apiInstance = new brevo.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

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

      let sendSmtpEmail = new brevo.SendSmtpEmail();

      sendSmtpEmail.subject = "Join {{params.subject}}!";
      sendSmtpEmail.htmlContent =
        "<html><body><h1>Welcome in planMe!</h1> <h3>This is the token you need to access you dashboard: {{params.token}}</h3></body></html>";
      sendSmtpEmail.sender = { name: "PlanMe", email: "planMe@plan.me" };

      const emailRecipients = emails.map((email) => ({ email }));
      sendSmtpEmail.to = emailRecipients;

      sendSmtpEmail.replyTo = {
        name: "John",
        email: "erica.ropelato@gmail.com",
      };
      sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
      sendSmtpEmail.params = {
        parameter: "PlanMe",
        subject: "PlanMe",
        token: dashboardToken,
      };

      const emailData = await apiInstance.sendTransacEmail(sendSmtpEmail);
      res.status(201).json({
        updatedUser,
        emailData,
        newDashboard,
      });
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

  .put("/:id/:dashId", async (req, res, next) => {
    try {
      let dashboard = await Dashboard.findOneAndUpdate(
        { _id: req.params.dashId },
        req.body,
        { new: true }
      );
      res.send(dashboard);
    } catch (error) {
      next(error);
    }
  });

export default dashboardRouter;
