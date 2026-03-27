const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    category: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Article", articleSchema);
