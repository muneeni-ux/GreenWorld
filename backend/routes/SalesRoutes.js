import express from "express";
import Sale from "../models/Sale.js";
import Distributor from "../models/Distributor.js";

const router = express.Router();

// ➕ Create Sale
router.post("/", async (req, res) => {
  try {
    const { distributorId, product, quantity, bv } = req.body;

    if (!distributorId || !product || !quantity || !bv) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const totalBV = quantity * bv;

    const sale = await Sale.create({
      distributor: distributorId,
      product,
      quantity,
      bv,
      totalBV,
    });

    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Get all sales (with distributor details)
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("distributor", "name phone gender nationality")
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update Sale (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { distributorId, product, quantity, bv } = req.body;
    const totalBV = quantity * bv;

    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      { distributor: distributorId, product, quantity, bv, totalBV },
      { new: true }
    );

    if (!updatedSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    res.json(updatedSale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete Sale
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Sale not found" });

    res.json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
