import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI as string;
  let isConnected=false;
  async function connectDB(){
    if(isConnected)
        return;
    await mongoose.connect(MONGODB_URI);
    isConnected=true;

    console.log("mongodb connected successfully");
  }
  export default connectDB;