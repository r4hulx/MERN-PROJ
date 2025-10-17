// server.js

// Core Modules
const http = require('http'); // http is used by Express under the hood
const os = require('os');

// Third-party Modules
const express = require('express');
const cors = require('cors');

// Local Modules
const productRoutes = require('./routes/products');

// Initialize Express app
const app = express();
const PORT = 4000;

// --- Middleware ---

// 1. Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// 2. Enable express.json() to parse JSON request bodies
app.use(express.json());

// 3. Custom middleware to log every request using core http module's principles
app.use((req, res, next) => {
  // The 'req' object is an extension of http.IncomingMessage
  console.log(`Request received: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});


// --- Routes ---

// Mount the product routes
app.use('/products', productRoutes);

// Root route for basic testing
app.get('/', (req, res) => {
  res.send('<h1>E-commerce API</h1><p>Welcome! Use the /products endpoint to get data.</p>');
});


// --- Server Startup ---

// Use the 'os' module to get and log system information
const logSystemInfo = () => {
  console.log('--- System Information ---');
  console.log(`Platform: ${os.platform()}`);
  console.log(`Architecture: ${os.arch()}`);
  console.log(`CPU Cores: ${os.cpus().length}`);
  console.log(`Total Memory: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log('--------------------------');
};

app.listen(PORT, () => {
  logSystemInfo();
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
