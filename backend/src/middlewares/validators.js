import { body, validationResult } from "express-validator";

export const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('product_category').isMongoId().withMessage('Invalid Category ID'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
];
