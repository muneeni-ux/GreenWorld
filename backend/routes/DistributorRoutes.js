import express from "express";
import Distributor from "../models/Distributor.js";

const router = express.Router();

// ➕ Add distributor
router.post("/", async (req, res) => {
  try {
    const distributor = await Distributor.create(req.body);
    res.status(201).json(distributor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📦 Get all distributors
router.get("/", async (req, res) => {
  try {
    const distributors = await Distributor.find().sort({ createdAt: -1 });
    res.json(distributors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update distributor
router.put("/:id", async (req, res) => {
  try {
    const distributor = await Distributor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(distributor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete distributor
router.delete("/:id", async (req, res) => {
  try {
    await Distributor.findByIdAndDelete(req.params.id);
    res.json({ message: "Distributor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
