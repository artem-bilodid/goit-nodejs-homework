const Joi = require('joi');

const userBaseValidation = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
};

const usersValidation = {
  emailAndPasswordValidation: (req, res, next) => {
    const schema = Joi.object({ ...userBaseValidation });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
  updateSubscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string().valid('starter', 'pro', 'business'),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
  userIdParamValidation: (req, res, next) => {
    const { userId } = req.params;
    const schema = Joi.string()
      .min(24)
      .max(24)
      .required()
      .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);
    const validationResult = schema.validate(userId);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
};

module.exports = usersValidation;
