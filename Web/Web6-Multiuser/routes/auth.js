const express = require('express')
const router = express.Router()
const template = require('../lib/template');
const db = require('../lib/db');

module.exports = function (passport) {
  router.get('/login', (req, res) => login(req, res))
  router.post('/login_process', (req, res) => login_process(req, res))
  router.get('/register', (req, res) => register(req, res))
  router.get('/logout', (req, res) => logout(req, res))

  function login(request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    db.query('SELECT * FROM author', function (error, authors) {
      if (error) {
        throw error;
      };
      var title = 'Login';
      var list = template.list(request.list);
      var body = `
        <div style="color:red;">${feedback}</div>
        <form action="/auth/login_process" method="post">
          <p><input type="text" name="email" placeholder="email"></p>
          <p><input type="password" name="password" placeholder="password"></p>
          <p><input type="submit" value="login"></p>
        </form>`;
      var html = template.HTML(title, list, body);
      response.send(html);
    });
  }

  function login_process(request, response) {
    request.session.save(function () {
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
        successFlash: true
      })(request, response)
    })
  };

  function register(request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    db.query('SELECT * FROM author', function (error, authors) {
      if (error) {
        throw error;
      };
      var title = 'Register';
      var list = template.list(request.list);
      var body = `
        <div style="color:red;">${feedback}</div>
        <form action="/auth/register_process" method="post">
          <p><input type="text" name="email" placeholder="email"></p>
          <p><input type="password" name="password" placeholder="password"></p>
          <p><input type="password" name="password2" placeholder="password"></p>
          <p><input type="text" name="displayName" placeholder="display name"></p>
          <p><input type="submit" value="register"></p>
        </form>`;
      var html = template.HTML(title, list, body);
      response.send(html);
    });
  }

  function logout(request, response) {
    request.logout();
    request.session.save(function () {
      response.redirect('/');
    })
  }
  return router;
}