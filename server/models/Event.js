import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: Date,
    time: String,
    category: {
      type: String,
      enum: ["academic", "social", "sports", "cultural", "career"],
      default: "academic"
    },
    maxAttendees: {
      type: Number,
      default: null
    },
    location: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["active", "canceled"],
      default: "active"
    },
    canceledAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);