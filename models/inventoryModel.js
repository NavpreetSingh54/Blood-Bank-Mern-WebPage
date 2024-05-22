const mongoose = require("mongoose");
const inventarySchema = new mongoose.Schema(
  {
    inventaryType: {
      type: String,
      enum: ["in", "out"],
      required: [true, "Inventary type Require"],
    },
    bloodGroup: {
      type: String,
      enum: ["O+", "O-", "A+", "B+", "A-", "B-", "AB+", "AB-"],
      required: [true, "Blood Group Require"],
    },
    quantity: {
      type: Number,
      required: [true, "Blood Quantity Is Require"],
    },
    email: {
      type: String,
      required: [true, "Donar Email Is Required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Organisation Is Require"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventaryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventaryType === "in";
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Inventary", inventarySchema);
