var db = require('./db')
var bcrypt = require('bcryptjs')

module.exports = function (app) {
  var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    db.query(`SELECT * FROM users WHERE id=?`, [id], function (err, user) {
      done(null, user[0]);
    })
  });
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      db.query(`SELECT * FROM users WHERE email=?`, [email], function (err, user) {
        if (user[0]) {
          bcrypt.compare(password, user[0].password, function (err, res) {
            if (res) {
              return done(null, user[0], {
                message: `${user[0].displayName}`
              });
            } else {
              return done(null, false, {
                message: 'This password is not correct'
              });
            }

          })
        } else {
          return done(null, false, {
            message: "This email does not exist"
          });
        }
      })
    }
  ));
  return passport;
} 