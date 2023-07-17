const catchAsyncError = require('./asyncError');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const { resolve } = require('path');

const result = config({ path: resolve(__dirname, '../config/.env') });
const userModel = require('../models/user');
if (result.error) {
  console.log(result.error);
}

module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Please login or signup to access that page" });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await userModel.findById(decodedData.id);
  next();
});