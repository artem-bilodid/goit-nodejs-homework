const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, salt);
};

userSchema.methods.checkPassword = function (password) {
  try {
    return bcrypt.compareSync(password, this.password);
  } catch (error) {
    throw new Error('Incorrect password');
  }
};

const User = model('user', userSchema);

module.exports = User;
