const express = require('express');
const router = express.Router();
const { getAllMovies } = require('../controllers/movie.js');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.get('/movies/allmovies', getAllMovies);
module.exports = router;