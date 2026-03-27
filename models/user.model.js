const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: /^(?!\.)(?!.*\.\.)([a-z0-9._%+-]+)@[a-z0-9.-]+\.[a-z]{2,}$/i,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      //   match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    },
    image: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
