import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "User",
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

export const UserToken = mongoose.models.UserToken || model("UserToken", schema);

