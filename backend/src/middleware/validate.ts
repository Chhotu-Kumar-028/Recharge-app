import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

// Middleware to run the explicit express-validator checks
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors: string[] = [];
    errors.array().map((err) => extractedErrors.push(err.msg));

    return res.status(400).json({
      success: false,
      message: extractedErrors.join(', '),
      errors: errors.array(),
    });
  };
};
