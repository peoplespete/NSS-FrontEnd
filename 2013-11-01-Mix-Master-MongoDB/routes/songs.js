var mongoose =require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');

/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'Song List Page',songs:songs});

  });
};



/*
 * GET /songs/new
 */

exports.new = function(req, res){
  Genre.find(function(err,genres){
    res.render('songs/new', {title: 'New Song Page', genres:genres});
  });
};

/*
 * POST /songs
 */

exports.create = function(req, res){
  //console.log(req.body);
  new Song(req.body).save(function(err, song, count){
    if(err){
      //console.log(err);
      var er = err
      Song.find().populate('genres').exec(function(err,songs){
        res.render('songs/new', {title: 'New Song', errors:er.errors, song: new Song(),songs:songs});
      });

    }else{
      // song.populate('genres').save(function(err, sing, count){
      //   console.log(sing);
      //   res.redirect('/songs');
      // });
    }
  });
};


/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  //   Song.find().populate('genres').exec(function(err,songs){
  //   console.log(songs[0].genres[0].name);
  // });
  Song.findById(req.params.id).populate('genres').exec(function(err, song){
    console.log(song);
    res.render('songs/show', {title: 'Show Page',song:song});
  });

};


/*
 * GET /songs/:id/edit
 */

exports.edit = function(req, res){
  Song.findById(req.params.id, function(err,song){
    res.render('songs/edit', {title: 'Edit Song', song:song});
  });
};

/*
 * PUT /songs/:id
 */

exports.update = function(req, res){
  Song.findByIdAndUpdate(req.params.id, req.body, function(err, song){
    res.redirect('/songs');
  });
};


/*
 * DELETE /songs/:id
 */

exports.delete = function(req, res){
  Song.findByIdAndRemove(req.params.id, function(err, song){
    res.redirect('/songs');
  });
};