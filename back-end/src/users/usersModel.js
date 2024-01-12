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
  /*   username: {
    type: String,
  }, */
  phoneNumber: {
    type: Number,
  },
  image: {
    type: String,
  },
  dashboard: [
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

/* {
    "name": "Erica",
    "surname": "Ropelato",
    "email": "erica.ropelato@gmail.com",
    "username": "EriksVon",
    "dashboard": [],
    "password": "123prova!"
    "password": "$2b$10$y.DrJm69IzffeLTrtMEvUOpl0rsvLMWCsMiNQ9C9o4O2SFS8Opjxa",
    "_id": "65a12a1a5f9a22e7927b6535",
    "__v": 0
} */
