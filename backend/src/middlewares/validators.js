import { body, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array().map(err => err.msg) });
  }
  next();
};

export const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('product_category').isMongoId().withMessage('Invalid Category ID'),

  handleValidationErrors,
];

export const validateProductCategory = [
  body('product_category_name').trim().notEmpty().withMessage('Category name is required'),
  handleValidationErrors,
]
