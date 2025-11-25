import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    src: {
      type: String,
      required: false,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
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

export const Income = mongoose.models.Income || model("Income", schema);

