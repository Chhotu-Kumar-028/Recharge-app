"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
// Middleware to run the explicit express-validator checks
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push(err.msg));
        return res.status(400).json({
            success: false,
            message: extractedErrors.join(', '),
            errors: errors.array(),
        });
    };
};
exports.validate = validate;
