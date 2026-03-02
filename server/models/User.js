import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: String,
    role: {
      type: String,
      enum: ["student", "organizer"],
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);