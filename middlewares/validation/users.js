const Joi = require('joi');

const emailBaseValidation = Joi.string().email().required();

const userBaseValidation = {
  email: emailBaseValidation,
  password: Joi.string().min(6).max(30).required(),
};

const uuidBaseValidation = Joi.string()
  .required()
  .pattern(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  );

const usersValidation = {
  emailValidation: (req, res, next) => {
    const { email } = req.body;
    const schema = emailBaseValidation;
    const validationResult = schema.validate(email);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
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
  verificationTokenParamValidation: (req, res, next) => {
    const { verificationToken } = req.params;
    const schema = uuidBaseValidation;
    const validationResult = schema.validate(verificationToken);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
};

module.exports = usersValidation;
