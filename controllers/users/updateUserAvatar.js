const path = require('path');
const fs = require('fs/promises');
var Jimp = require('jimp');

const { User } = require('../../models');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const generateUserAvatarFilename = (userId, filename) => {
  const [extension] = filename.split('.').reverse();
  return `${userId}.${extension}`;
};

const generateAvatarURL = (userId, filename) => {
  return path.join('avatars', generateUserAvatarFilename(userId, filename));
};

const resizeImageAndSave = async (path, filename) => {
  const width = Jimp.AUTO;
  const height = 250;
  const imageToUpdate = await Jimp.read(path);
  imageToUpdate.resize(width, height).write(path);
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, filename = '' } = req.file;

    await resizeImageAndSave(tempUpload, filename);

    const resultUpload = path.join(avatarsDir, generateUserAvatarFilename(_id, filename));

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = generateAvatarURL(_id, filename);

    const existingUser = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUserAvatar;
