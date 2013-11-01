var moment = require('moment');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/*
 * GET /posts
 */

exports.index = function(req, res){
  Post.find(function(err, posts){
    res.render('posts/index', {title: 'Post', posts: posts});
  });//by default (no params for find) it returns everything // this is the callback function
};


/*
 * GET /posts/new
 */

exports.new = function(req, res){
  var date = moment().format("MM[/]DD[/]YYYY, h:mm a");
  res.render('posts/new', {title: 'New Post', date: date});
};


/*
 * POST /posts
 */

exports.create = function(req, res){
  // console.log('Before Save...');
  // console.log(req.body);
  new Post(req.body).save(function(err, post, count){
    // console.log('Save Complete!');
    // console.log(post);
    res.redirect('/posts');
  });
};


/*
 * GET /posts/:id/edit
 */

exports.edit = function(req, res){
  res.render('posts/edit', {title: 'Edit'});
};


/*
 * PUT /posts/:id
 */

exports.update = function(req, res){
  res.redirect('/posts/' + req.params.id);
};


/*
 * GET /posts/:id
 */

exports.show = function(req, res){
  Post.findById(req.params.id, function(err, post){
    res.render('posts/show', {title: 'Show #{post.title}', post: post});
  });
};


/*
 * DELETE /posts/:id
 */

exports.delete = function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err, post){
    res.redirect('/posts');
  });
};


