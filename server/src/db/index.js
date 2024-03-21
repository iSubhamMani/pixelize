import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${DB_NAME}`
    );

    if (connectionInstance) {
      console.log(
        `Connected to MongoDB. Host: ${connectionInstance.connection.host}`
      );
    }
  } catch (error) {
    console.log(`MongoDB connection error ${error}`);
    process.exit(1);
  }
};

export default connectToDB;
