import mongoose from "mongoose";

export const connectDB = (uri) => {
    mongoose
      .connect(uri, { dbName: "task_manages" })
      .then((data) =>
        console.log(
          `Connected to DB: ${data.connection.host} managed by Vikash`
        )
      )
      .catch((err) => {
        throw err;
      });
  };