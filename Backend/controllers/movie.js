const movieModel = require('../models/movies');
const catchAsyncError = require('../middleware/asyncError');

module.exports.getAllMovies = catchAsyncError(async (req, res, next) => {
  const allmovies = await movieModel.find();
  const resultPerPage = 15;
  const moviesCount = await movieModel.countDocuments();
  res.status(201).send({
    success: true,
    allmovies,
    moviesCount,
    resultPerPage,
  });
});