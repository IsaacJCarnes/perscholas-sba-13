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

productRouter.get("/", async (req, res) => {
  try {
    const category = req.query.category ?? "";
    const minPrice = req.query.minPrice ?? 1;
    const maxPrice = req.query.maxPrice ?? 100;
    const sortBy = req.query.sortBy == "price_desc" ? -1 : 1;
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;
    const offset = (page - 1) * limit;
    const filter = {
      category,
      price: { $gt: minPrice, $lt: maxPrice },
    };
    const products = await Product.find(filter)
      .sort({ price: sortBy })
      .skip(offset)
      .limit(limit);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: "Unable to get products" });
  }
});

export default productRouter;
