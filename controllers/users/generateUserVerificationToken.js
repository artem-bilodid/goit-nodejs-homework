const { v4 } = require('uuid');
const { User } = require('../../models');
const { sendUserConfiramtion } = require('../../notifications/email');

const generateUserVerificationToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const verificationToken = v4();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (existingUser.verify) {
      return res.status(404).json({ message: 'Verification has already been passed' });
    }

    existingUser.verificationToken = verificationToken;
    await existingUser.save();
    await sendUserConfiramtion(email, verificationToken);

    return res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    next(error);
  }
};

module.exports = generateUserVerificationToken;
