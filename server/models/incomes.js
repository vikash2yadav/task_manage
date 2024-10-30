import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    src: {
      type: String,
      required: false,
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
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Income = mongoose.models.Income || model("Income", schema);
