const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load product data
const products = JSON.parse(fs.readFileSync("./data/products.json"));

// API to fetch product details
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// API to manage cart
let cart = []; // Server-side cart storage

// Add item to cart
app.post("/api/cart", (req, res) => {
  const { id, size, quantity } = req.body;
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const cartItem = {
    id: product.id,
    name: product.name,
    size,
    quantity,
    price: product.price,
    totalCost: product.price * quantity,
    image: product.image
  };

  cart.push(cartItem);
  res.status(201).json(cartItem);
});

// Get cart items
app.get("/api/cart", (req, res) => {
  res.json(cart);
});

// Remove item from cart
app.delete("/api/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    res.status(200).json({ message: "Item removed from cart" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
