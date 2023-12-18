const express = require('express');
const productController = require('../controllers/productController');
const productValidator = require('../validators/productValidator');

const router = express.Router();

// Route: POST /products
// Description: Create a new product
// Access: Public
router.post('/', productValidator.validateCreateProduct, productController.createProduct);

// Route: GET /products/:id
// Description: Get product by ID
// Access: Public
router.get('/:id', productValidator.validateGetProduct, productController.getProductById);

module.exports = router;