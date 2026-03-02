import express from "express";
import Event from "../models/Event.js";
import { protect, organizerOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all events (students + organizers)

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find().populate("createdBy", "name");
  res.json(events);
});

// Get single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy", "name");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: "Invalid event ID" });
  }
});

// Create event (organizer only)
router.post("/", protect, organizerOnly, async (req, res) => {
  const event = await Event.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(event);
});

// Update event
router.put("/:id", protect, organizerOnly, async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  Object.assign(event, req.body);
  await event.save();

  res.json(event);
});

// Cancel event (soft delete)
router.patch("/:id/cancel", protect, organizerOnly, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });
  if (event.status === "canceled")
    return res.status(400).json({ message: "Event already canceled" });
  event.status = "canceled";
  event.canceledAt = new Date();
  await event.save();
  res.json({ message: "Event canceled" });
});

// Delete event (hard delete, optional, for admin)
router.delete("/:id", protect, organizerOnly, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  if (event.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });
  await event.deleteOne();
  res.json({ message: "Event deleted" });
});

export default router;