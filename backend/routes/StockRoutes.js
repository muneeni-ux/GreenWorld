const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");

// ✅ Create Stock
router.post("/", async (req, res) => {
  try {
    const { name, quantity, bv } = req.body;
    if (!name || !quantity) {
      return res.status(400).json({ message: "Name and quantity are required" });
    }

    const stock = new Stock({ name, quantity, bv });
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    console.error("Create Stock Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get All Stock Items
router.get("/", async (req, res) => {
  try {
    const stock = await Stock.find().sort({ createdAt: -1 });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Get Single Stock Item
router.get("/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Update Stock
router.put("/:id", async (req, res) => {
  try {
    const { name, quantity, bv } = req.body;
    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      { name, quantity, bv },
      { new: true }
    );
    if (!updatedStock) return res.status(404).json({ message: "Stock not found" });
    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Delete Stock
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Stock not found" });
    res.json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
