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
    subTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Saving = mongoose.models.Saving || model("Saving", schema);
