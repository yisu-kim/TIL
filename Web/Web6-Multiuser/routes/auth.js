const express = require('express')
const router = express.Router()
const template = require('../lib/template');
const db = require('../lib/db');
const shortid = require('shortid')
/*
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./lib/db.json')
const lowdb = low(adapter)
lowdb.defaults({ users: [] }).write();
*/

module.exports = function (passport) {
  router.get('/login', (req, res) => login(req, res))
  router.post('/login_process', (req, res) => login_process(req, res))
  router.get('/register', (req, res) => register(req, res))
  router.post('/register_process', (req, res) => register_process(req, res))
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
          <p><input type="text" name="email" placeholder="email" required></p>
          <p><input type="password" name="password" placeholder="password" required></p>
          <p><input type="password" name="password2" placeholder="password" required></p>
          <p><input type="text" name="displayName" placeholder="display name" required></p>
          <p><input type="submit" value="register"></p>
        </form>`;
      var html = template.HTML(title, list, body);
      response.send(html);
    });
  }

  function register_process(request, response) {
    var post = request.body;
    var id = shortid.generate();
    var email = post.email;
    var password = post.password;
    var password2 = post.password2;
    var displayName = post.displayName;
    db.query(`SELECT email FROM USERS WHERE email=?`, [email], function (error, result) {
      if (!result[0]) {
        if (password === password2) {
          /*
          lowdb.get('users').push({
            email: email,
            password: password,
            displayName: displayName
          }).write();
          */
          db.query(`INSERT INTO users (id, email, password, displayName) VALUES (?, ?, ?, ?)`,
            [id, email, password, displayName],
            function (error, result) {
              if (error) {
                throw error;
              }
              response.redirect('/');
            }
          );
        } else {
          request.flash('error', 'Password must same!')
          request.session.save(function () {
            response.redirect('/auth/register')
          })
        }
      } else {
        request.flash('error', 'User already exists.')
        request.session.save(function () {
          response.redirect('/auth/register')
        })
      }
    })
  }

  function logout(request, response) {
    request.logout();
    request.session.save(function () {
      response.redirect('/');
    })
  }
  return router;
}