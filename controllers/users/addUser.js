const gravatar = require('gravatar');
const { User } = require('../../models');

const addUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    const { subscription } = await newUser.save();

    return res.status(201).json({ user: { email, subscription, avatarURL } });
  } catch (error) {
    next(error);
  }
};

module.exports = addUser;
