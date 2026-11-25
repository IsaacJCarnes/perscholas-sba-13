import "dotenv/config";
import express from "express";
import connect from "./config/connection.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/products", productRoutes);

try {
  await connect();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.error("Server startup failed:", error.message);
}
