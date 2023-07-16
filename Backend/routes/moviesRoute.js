const express = require('express');
const router = express.Router();
const { getAllMovies , getMoviesById } = require('../controllers/movie.js');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.get('/movies/allmovies', getAllMovies);
router.get('/movies/id', getMoviesById);
module.exports = router;