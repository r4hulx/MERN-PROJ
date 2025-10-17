
const http = require('http'); // http is used by Express under the hood
const os = require('os');

const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products');

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});



app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('<h1>E-commerce API</h1><p>Welcome! Use the /products endpoint to get data.</p>');
});



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
