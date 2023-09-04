import mongoose from "mongoose";


mongoose.set('strictQuery', false);
// configuration for database HWjQzz1lFhRujyqG
const connectToDB = async (db_url: string) => {
  try {
    if (db_url.length == 0) {
      console.log("database connection failed");
    } else {
      await mongoose.connect(db_url);
      require("../models/users");
      console.log("Database connected succesfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
