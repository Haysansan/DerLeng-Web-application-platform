import { body, validationResult } from "express-validator";

export const productValidationRules = [
  body('name').notEmpty().withMessage('Product name is required').trim(),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('product_category').isMongoId.withMessage('Invalid Category ID'),
];

export const validate = (rew, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next;

  return res.status(400).json({ errors: errors.array() });
};