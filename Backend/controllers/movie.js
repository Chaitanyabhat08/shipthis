const movieModel = require('../models/movies');
const catchAsyncError = require('../middleware/asyncError');
const ApiFeatures = require('../utils/ApiFeatures');

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

async function countMoviesWithKeyword(keyword) {
  const count = await movieModel.countDocuments({ title: { $regex: keyword, $options: "i" } });
  return count;
}
