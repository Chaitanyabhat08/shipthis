const userModel = require('../models/user');
const shortId = require('shortid');
const catchAsyncError = require('../middleware/asyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/.env' });

//Register a user
module.exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { age, name, email, password, avatar } = req.body;
  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const existing = await userModel.findOne({ email });
  if (existing) {
    return res.status(11000).json({message: "User already exists,Please Login" });
  }
  const user = await userModel.create({
    age,
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Checking if password and email are present
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter Email and Password" });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid Password or Email" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid Password or Email" });
    }
    sendToken(user, 200, res); // Set the token as a cookie in the response
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "You are not Registered With us, Please Register" });
  }
  let html = [`<h5>Hello ${user.name}</h5>`];
  const resetToken = await user.ResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}users/resetPassword/${resetToken}`;

  const message = `Please click on this button to redirect to set up new password \n`;
  html.push(`<button style="background-color:white"><a href=${resetPasswordUrl}>Reset Password Link</a></button>`)
  html.push(`<p>${message}</p>`);
  html.push(`<p>Thanks and Regards</p>`);
  html.push(`<p>Moive app</p>`);
  html.push(`<tr><img src="./man.png" alt="s&s"></tr>`)

  html = html.join('');
  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery Email`,
      html,
    });
    res.status(200).json({
      success: true,
      message: `Password Recover Eamil sent to ${user.email} successfully`,
    });

  } catch (err) {
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpire = null;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ message: err.message });
  }
});

module.exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "Reset password token is Invalid or Expires" });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Password does not match! Please try again" });
  }
  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordTokenExpire = null;
  await user.save({ validateBeforeSave: false });
  sendToken(user, 200, res);
});

module.exports.getUserDetails = catchAsyncError(async function (req, res, next) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  res.status(200).json({
    success: true,
    user,
  });
});

module.exports.updatePassword = catchAsyncError(async function (req, res, next) {
  const user = await userModel.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Old password is Incorrect" });
  }
  if (req.body.newPassword == req.body.oldPassword) {
    return res.status(400).json({ message: "New password should not be same as Old Password" });
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Password does not match! Please try again" });
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});
module.exports.getAllUsers = catchAsyncError(async function (req, res, next) {
  const users = await userModel.find();
  res.status(200).json({
    success: true,
    users
  });
});

module.exports.getDetailsofUser = catchAsyncError(async function (req, res, next) {
  const users = await userModel.findById(req.params.id);
  if (!users) {
    return res.status(404).json({ message: 'user does not exist' });
  }
  res.status(200).json({
    success: true,
    users
  });
});