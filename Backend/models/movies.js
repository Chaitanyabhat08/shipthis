const mongoose = require('mongoose');

const movies = new mongoose.Schema({
  show_id: {
      type: String,
      required:true,
  },
  showtype: {
    type: String,
    required:true,
  },
  title: {
    type: String,
    required:true,
  },
  director: {
    type: String,
    required:true,
  },
  country: {
    type: String,
    required:true,
  },
  date_added: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  listed_in: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model('movies', movies);