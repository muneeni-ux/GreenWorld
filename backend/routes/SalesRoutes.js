import express from "express";
import Sale from "../models/Sale.js";
import Distributor from "../models/Distributor.js";
import Product from "../models/Product.js"; // ✅ Import Product model

const router = express.Router();


// ➕ Create Sale
router.post("/", async (req, res) => {
  try {
    const { distributorId, product, quantity, bv } = req.body;

    if (!distributorId || !product || !quantity || !bv) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // 🔍 Find product by name
    const foundProduct = await Product.findOne({ name: product });
    if (!foundProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // ⚠️ Check stock
    if (foundProduct.stock < quantity) {
      return res.status(400).json({
        error: `Not enough stock for ${foundProduct.name}. Available: ${foundProduct.stock}`,
      });
    }

    // 🧮 Total BV
    const totalBV = quantity * bv;

    // 💾 Create Sale
    const sale = await Sale.create({
      distributor: distributorId,
      product,
      quantity,
      bv,
      totalBV,
    });

    // 🔻 Reduce stock
    foundProduct.stock -= quantity;
    await foundProduct.save();

    res.status(201).json({ message: "Sale recorded successfully", sale });
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


// ✏️ Update Sale (PUT) — Adjust Stock Correctly
router.put("/:id", async (req, res) => {
  try {
    const { distributorId, product, quantity, bv } = req.body;
    const totalBV = quantity * bv;

    const existingSale = await Sale.findById(req.params.id);
    if (!existingSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    // 🔍 Get old and new product records
    const oldProduct = await Product.findOne({ name: existingSale.product });
    const newProduct = await Product.findOne({ name: product });

    if (!newProduct) {
      return res.status(404).json({ error: "New product not found" });
    }

    // ✅ Revert old stock first
    if (oldProduct) {
      oldProduct.stock += existingSale.quantity;
      await oldProduct.save();
    }

    // ⚠️ Check if new stock is enough
    if (newProduct.stock < quantity) {
      // rollback oldProduct adjustment if failed
      if (oldProduct) {
        oldProduct.stock -= existingSale.quantity;
        await oldProduct.save();
      }
      return res.status(400).json({
        error: `Not enough stock for ${newProduct.name}. Available: ${newProduct.stock}`,
      });
    }

    // 🔻 Deduct new quantity
    newProduct.stock -= quantity;
    await newProduct.save();

    // 💾 Update Sale Record
    existingSale.distributor = distributorId;
    existingSale.product = product;
    existingSale.quantity = quantity;
    existingSale.bv = bv;
    existingSale.totalBV = totalBV;

    const updatedSale = await existingSale.save();

    res.json({ message: "Sale updated successfully", updatedSale });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ❌ Delete Sale — Restore Stock Automatically
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sale not found" });

    // 🧾 Find product and restore stock
    const product = await Product.findOne({ name: sale.product });
    if (product) {
      product.stock += sale.quantity;
      await product.save();
    }

    await Sale.findByIdAndDelete(req.params.id);

    res.json({ message: "Sale deleted successfully and stock restored" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
