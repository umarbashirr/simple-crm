import mongoose, { Mongoose } from "mongoose";

const { MONGO_URI } = process.env;

declare global {
  var mongoose: {
    conn: Mongoose | null;
  };
}

if (!MONGO_URI) throw new Error("MONGO_URI is not defined.");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

export const connectMongo = async () => {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(MONGO_URI);

  return cached.conn;
};
