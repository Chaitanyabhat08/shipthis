const movieModel = require('../models/movies');
const catchAsyncError = require('../middleware/asyncError');
const ApiFeatures = require('../utils/ApiFeatures');
const mongoose = require('mongoose');

module.exports.getAllMovies = catchAsyncError(async (req, res, next) => {
  console.log(req.query);
  const resultPerPage = 15;
  const apiFeature = new ApiFeatures(movieModel.find(), req.query).search();
  apiFeature.pagination(resultPerPage);
  const allmovies = await apiFeature.query;
  const moviesCount = await movieModel.countDocuments();
  const filteredMoviesCount = await countMoviesWithKeyword(req.query.keyWord); // New method to count movies with the keyword

  res.status(201).send({
    success: true,
    allmovies,
    moviesCount,
    resultPerPage,
    filteredMoviesCount,
  });
});

module.exports.getMoviesById = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
console.log(id);
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).send({ success: false, message: 'Invalid movie ID' });
  }

  const movie = await movieModel.findById(id);
  if (!movie) {
    return res.status(404).send({ success: false, message: 'Movie not found' });
  }

  res.status(200).send({ success: true, movie });
});

async function countMoviesWithKeyword(keyword) {
  const count = await movieModel.countDocuments({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { cast: { $regex: keyword, $options: "i" } }
    ]
  });
  return count;
}
