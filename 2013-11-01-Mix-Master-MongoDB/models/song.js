var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');

var Song = mongoose.Schema({
  // name: {
  //         type: String,
  //         required: [true,'Name is required.'],
  //         match: [/^[a-zA-Z]+[a-zA-Z ]*$/,'{VALUE} is an invalid name.']
  // ^[a-zA-Z]+[.](mp3|mp4)$
  //       },

  title: {
            type: String,
            required: [true, 'You must supply a title for your song.'],
            match:[/^[a-z0-9 -]+$/i,'{VALUE} is not a valid song title.']
          },
  duration: Number,
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  art: String,
  filename: String,
  lyrics: String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song',Song);
