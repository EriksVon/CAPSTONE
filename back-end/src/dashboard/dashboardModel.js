import mongoose, { Schema } from "mongoose";

const DashboardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
  },
  activities: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

export const Dashboard = mongoose.model("dashboards", DashboardSchema);
