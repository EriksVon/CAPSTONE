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
  /* WORKING */
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
      const { emails, title, theme, partecipants, dashboardToken } = req.body;
      const file = req.file;
      const activities = req.body.activities || [];

      const emailRecipients = emails.map((email) => email);
      console.log(emailRecipients.length);

      // <--------------- BREVO EMAIL
      let sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = "Join {{params.subject}}!";
      sendSmtpEmail.templateId = 2;
      sendSmtpEmail.sender = { name: "PlanMe", email: "planMe@plan.me" };

      sendSmtpEmail.to = emailRecipients.map((email) => ({ email }));

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
      // ---------------> BREVO EMAIL

      if (emailRecipients.length > 0) {
        try {
          const emailData = await apiInstance.sendTransacEmail(sendSmtpEmail);
          console.log(
            "API called successfully. Returned data: " +
              JSON.stringify(emailData)
          );
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

          res.status(201).json({
            emailData,
            updatedUser,
            newDashboard,
          });
        } catch (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Error sending email" });
        }
      } else {
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
        res.status(201).json({
          updatedUser,
          newDashboard,
        });
      }
    } catch (error) {
      next(error);
    }
  })
  /* WORKING */
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
  /* WORKING */
  .put("/me/:dashId", async (req, res, next) => {
    try {
      const dashboardId = req.params.dashId;
      const updatedFields = { ...req.body };

      if (updatedFields.activities && updatedFields.activities.length > 0) {
        const existingDashboard = await Dashboard.findById(dashboardId);
        updatedFields.activities = existingDashboard.activities.concat(
          updatedFields.activities
        );
      }

      const dashboard = await Dashboard.findByIdAndUpdate(
        dashboardId,
        { $set: updatedFields },
        { new: true }
      );

      const dashboardToken = req.body.dashboardToken;
      const newEmail = req.body.emails;

      console.log(newEmail);
      console.log(dashboardToken);
      if (newEmail) {
        let sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "Join {{params.subject}}!";
        sendSmtpEmail.templateId = 2;
        sendSmtpEmail.sender = { name: "PlanMe", email: "planMe@plan.me" };

        sendSmtpEmail.to = [{ email: newEmail }];

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

        try {
          const emailData = await apiInstance.sendTransacEmail(sendSmtpEmail);
          console.log(
            "API called successfully. Returned data: " +
              JSON.stringify(emailData)
          );
          res.status(201).json({
            emailData,
            dashboard,
          });
        } catch (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Error sending email" });
        }
      } else {
        res.status(200).json(dashboard);
      }
    } catch (error) {
      next(error);
    }
  })
  /* WORKING */
  .delete("/me/:dashId", async (req, res, next) => {
    try {
      const { dashId } = req.params;
      await User.updateMany(
        { dashboards: dashId },
        { $pull: { dashboards: dashId } }
      );
      await Dashboard.findByIdAndDelete(dashId);
      res.status(204).send({ message: "Dashboard deleted" });
    } catch (error) {
      next(error);
    }
  });

export default dashboardRouter;
