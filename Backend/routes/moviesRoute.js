const express = require('express');
const router = express.Router();
const { getAllMovies , getMoviesById } = require('../controllers/movie.js');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.get('/movies/allmovies', isAuthenticatedUser,getAllMovies);
router.get('/movies/id',isAuthenticatedUser, getMoviesById);
module.exports = router;