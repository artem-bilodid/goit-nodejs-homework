const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { User } = require('../../models');
const { sendUserConfiramtion } = require('../../notifications/email');

const addUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const avatarURL = gravatar.url(email);
    const verificationToken = v4();

    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);
    const { subscription } = await newUser.save();
    await sendUserConfiramtion(email, verificationToken);

    return res.status(201).json({ user: { email, subscription, avatarURL } });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
