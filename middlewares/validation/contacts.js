const Joi = require('joi');

const contactBaseValidation = {
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(30).required(),
};

const contactsValidation = {
  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      ...contactBaseValidation,
      favorite: Joi.bool().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
  createContactValidation: (req, res, next) => {
    const schema = Joi.object(contactBaseValidation);

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
  contactIdParamValidation: (req, res, next) => {
    const { contactId } = req.params;

    const schema = Joi.string()
      .min(24)
      .max(24)
      .required()
      .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);
    const validationResult = schema.validate(contactId);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
  contactFavoriteValidation: (req, res, next) => {
    const { favorite } = req.body;
    console.log();

    const schema = Joi.boolean();
    const validationResult = schema.validate(favorite);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
};

module.exports = contactsValidation;
