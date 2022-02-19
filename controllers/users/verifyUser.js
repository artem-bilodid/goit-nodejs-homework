const { User } = require('../../models');

const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const existingUser = await User.findOne({ verificationToken });
    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    existingUser.verificationToken = null;
    existingUser.verify = true;

    await existingUser.save();

    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
