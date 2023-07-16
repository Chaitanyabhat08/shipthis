const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, getAllUsers } = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");

router.post('/users/registerUser', registerUser);
router.post('/users/loginUser', loginUser);
router.get('/users/logoutUser', logoutUser);
router.post('/users/forgotPassword', forgotPassword);
router.put('/users/resetPassword/:token', resetPassword);
router.get('/users/getMyDetails', isAuthenticatedUser, getUserDetails);
router.put('/users/updatePassword', isAuthenticatedUser, updatePassword);

module.exports = router;