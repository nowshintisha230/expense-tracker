import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

// Cache the actual connection promise on the global object so that Next.js
// hot-reload (dev) and serverless concurrent invocations (prod) don't each
// open a fresh connection to MongoDB.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConnPromise: Promise<typeof mongoose> | undefined;
}

async function connectDB(): Promise<typeof mongoose> {
  if (!global._mongooseConnPromise) {
    global._mongooseConnPromise = mongoose
      .connect(MONGODB_URI)
      .then((m) => {
        console.log("mongodb connected successfully");
        return m;
      })
      .catch((err) => {
        // Reset so the next call can retry instead of being stuck on a rejected promise.
        global._mongooseConnPromise = undefined;
        throw err;
      });
  }
  return global._mongooseConnPromise;
}

export default connectDB;