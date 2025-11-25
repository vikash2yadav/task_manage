import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1
    }

  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || model("User", schema);

