import mongoose, { Schema } from "mongoose";

const ActivitySchema = new Schema({
  type: {
    type: String,
  },
  content: {
    type: String,
  },
  toolTitle: {
    type: String,
  },
});

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
  activities: [ActivitySchema],
  avatar: {
    type: String,
  },
});

export const Dashboard = mongoose.model("dashboards", DashboardSchema);
