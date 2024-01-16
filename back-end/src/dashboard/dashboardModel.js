import mongoose, { Schema } from "mongoose";

const DashboardSchema = new Schema({
  partecipants: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  dashboardToken: {
    type: String,
  },
  emails: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
  },
  activities: [
    {
      type: String,
    },
  ],
  avatar: {
    type: String,
  },
});

export const Dashboard = mongoose.model("dashboards", DashboardSchema);
