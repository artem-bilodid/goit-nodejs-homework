const Joi = require("joi");

const contactsValidation = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(3).max(30).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }

    next();
  },
  getContactByIdValidation: (req, res, next) => {
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
};

module.exports = contactsValidation;
