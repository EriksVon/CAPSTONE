import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  image: {
    type: String,
  },
  dashboards: [
    {
      type: Schema.Types.ObjectId,
      ref: "dashboards",
    },
  ],
  password: {
    type: String,
    required: function () {
      return this.googleId ? false : true;
    },
  },
  googleId: {
    type: String,
    required: function () {
      return this.password ? false : true;
    },
  },
});

export const User = mongoose.model("users", UserSchema);
