var db = require('./db')

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
      db.query(`SELECT * FROM users WHERE email=? AND password=?`, [email, password], function (err, user) {
        if (user[0]) {
          return done(null, user[0], {
            message: `${user[0].displayName}`
          });
        } else {
          return done(null, false, {
            message: 'Incorrect user information.'
          });
        }
      })
    }
  ));
  return passport;
} 