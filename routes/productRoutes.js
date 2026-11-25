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

export default productRouter;
