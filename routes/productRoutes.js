import express from "express";
import Product from "../models/Product.js";

const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ message: "Unable to create product" });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not found." });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not found." });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    return res.status(404).json({ message: "Product not found." });
  }
});

export default productRouter;
