var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

/*
 * POST /users
 */

exports.create = function(req, res){
  var user = new User();
  user.email = req.body.email;
  bcrypt.hash(req.body.password, 10, function(err, hash){
    user.password = hash;
    user.save(function(err, user){
      if(err){
        res.send({status: 'error'});
      } else{
        res.send({status: 'ok'});
      }
    });
  });

};


/*
 * PUT /login
 */

exports.login = function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.save(function(err){
              res.send({status: 'ok', email: user.email});
            });
          });

        }
        else{
          req.session.destroy(function(err){
            res.send({status:'error'});
          });
        }
      });
    }else{
      res.send({status:'error'});
    }

  });
};

/*
 * DELETE /logout
 */


exports.logout = function(req, res){
  req.session.destroy(function(err){
    res.send({status:'ok'});
  });
};



/*
 * GET /make-me-an-admin?password=sdflskjsdlfjk
 */

exports.makeMeAnAdmin = function(req, res){
  if(req.query.password === 'chyld'){
    res.locals.user.isAdmin = true;
    res.locals.user.save(function(err, user){
      res.send(user);
    });
  }else{
    res.send('sorry');
  }
};

/*
 * GET /admin
 */

exports.admin = function(req, res){
  User.find(function(err, users){
    res.render('admin/index', {title: 'Express', users: users});
  });
};



/*
 * DELETE /admin/:id
 */

exports.delete = function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    res.redirect('/admin');
  });
};


/*
 * PUT /admin/:id
 */

exports.toggleAdmin = function(req, res){
  User.findById(req.params.id, function(err, user){
    console.log(user);
    user.isAdmin = user.isAdmin === false;
    user.save(function(err, user){
      console.log(user);
      res.send({isAdmin: user.isAdmin});
    });
  });
};










// /*
//  * GET /temp
//  */


// exports.temp = function(req, res){
//   if(req.query.name){
//     req.session.name = req.query.name;
//     req.session.age = 40;
//     req.session.save(function(err){
//       res.send(req.session);
//     });
//   } else{
//     res.send(req.session);
//   }
// };
