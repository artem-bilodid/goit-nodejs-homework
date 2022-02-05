const { User } = require('../../models');

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { ...fields } = req.body;

    const existingUser = await User.findByIdAndUpdate(userId, { ...fields }, { new: true });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { _id, email, subscription } = existingUser;
    return res.status(200).json({ _id, email, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
