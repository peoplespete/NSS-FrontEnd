var db = require('../modules/database');
var file = __dirname + '/../db/movies.json';
var Movie = require('../models/movie');
var _ = require('lodash');

/*
 * GET /movies
 */

exports.index = function(req, res){
  var genericMovies = db.read(file);
  var movies = _.map(genericMovies, function(genericMovie){
    return new Movie(genericMovie);
  });
  res.render('movies/index', {title: 'Top Movie List', movies:movies});
};


/*
 * GET /movies/new
 */

exports.new = function(req, res){
  res.render('movies/new', {title: 'Add Another Movie'});
};

/*
 * POST /movies
 */

exports.create = function(req, res){
  var newMovie = {};
  newMovie.title = req.body.title;
  newMovie.image = req.body.image;
  newMovie.color = req.body.color;
  newMovie.rated = req.body.rated;
  newMovie.studio = req.body.studio;
  newMovie.gross = req.body.gross;
  newMovie.numTheater = req.body.numTheaters;
  var movies = db.read(file);
  movies.push(newMovie);
  db.write(file, movies);
  res.redirect('/movies');
};

/*
 * DELETE /movies/:title
 */

exports.delete = function(req, res){
  var movies = db.read(file);
  movies = _.reject(movies, function(movie){
    return movie.title === req.params.title;
  });
  db.write(file, movies);
  res.redirect('/movies');
};