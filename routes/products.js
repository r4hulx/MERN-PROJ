// routes/products.js

const express = require('express');
const router = express.Router();

// In-memory 'database' for storing product data.
// In a real application, this would be a database like MongoDB or PostgreSQL.
let products = [
  { id: 1, name: 'Laptop Pro', price: 1200, category: 'Electronics' },
  { id: 2, name: 'Wireless Mouse', price: 45, category: 'Electronics' },
  { id: 3, name: 'Ergonomic Keyboard', price: 90, category: 'Electronics' }
];

/**
 * @route   GET /products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json(products);
});

/**
 * @route   POST /products
 * @desc    Add a new product
 * @access  Public
 */
router.post('/', (req, res) => {
  const newProduct = req.body;

  // Basic validation to ensure the request body has the required fields.
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ msg: 'Please include a name and price' });
  }

  // Assign a new ID (simple incrementing logic for this example).
  newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  
  products.push(newProduct);
  
  console.log('New product added:', newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
