const { body, param, validationResult } = require('express-validator');

const validateCreateProduct = [
  body('name')
    .isLength({ min: 10, max: 80 })
    .withMessage('Name must be between 10 and 80 characters'),
  body('description')
    .isLength({ min: 10, max: 80 })
    .withMessage('Description must be between 10 and 80 characters'),
  body('image')
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
];

const validateGetProduct = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateCreateProduct,
  validateGetProduct,
  validate
};