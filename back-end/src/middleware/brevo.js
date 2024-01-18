/* import express from "express";
import brevo from "@getbrevo/brevo";

let apiInstance = new brevo.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const brevoRouter = express.Router();

brevoRouter.post("/test-brevo", async (req, res) => {
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent =
    "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = { name: "PlanMe", email: "planMe@plan.me" };
  sendSmtpEmail.to = [{ email: "eriks.von.eriksson@gmail.com", name: "Eriks" }];
  sendSmtpEmail.replyTo = { name: "John", email: "erica.ropelato@gmail.com" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = {
    parameter: "PlanMe",
    subject: "Join PlanMe!",
  };

  const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

  console.log(
    "API called successfully. Returned data: " + JSON.stringify(data)
  );

  res.send(data);
});

export default brevoRouter;
 */
