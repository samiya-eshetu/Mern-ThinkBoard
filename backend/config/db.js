import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected uwu!");
  } catch (error) {
    console.error("error occurred :(", error.message);
    process.exit(1); //1 means exit with failure
  }
};