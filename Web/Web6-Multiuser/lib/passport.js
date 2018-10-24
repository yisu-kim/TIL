var db = require('./db')

module.exports = function (app) {
  var authData = {
    email: 'egoing777@gmail.com',
    password: '1234',
    nickname: 'egoing'
  };
  var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    console.log('serializeUser', user)
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    db.query(`SELECT * FROM users WHERE id=?`, [id], function (err, user) {
      console.log('deserializeUser', id, user[0])
      done(null, user[0]);
    })
  });
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (username, password, done) {
      console.log('LocalStrategy', username, password)
      if (username === authData.email) {
        if (password === authData.password) {
          return done(null, authData, {
            message: `${authData.nickname}`
          });
        } else {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
      } else {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
    }
  ));
  return passport;
} 