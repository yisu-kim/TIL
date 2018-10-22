const express = require('express')
const router = express.Router()
const template = require('../lib/template');
const db = require('../lib/db');

router.get('/login', (req, res) => login(req, res))
// router.post('/login', (req, res) => login_process(req, res))
router.get('/logout', (req, res) => logout(req, res))

function login(request, response) {
  db.query('SELECT * FROM author', function (error, authors) {
    if (error) {
      throw error;
    };
    var title = 'Login';
    var list = template.list(request.list);
    var body = `
      <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit" value="login"></p>
      </form>`;
    var html = template.HTML(title, list, body);
    response.send(html);
  });
}
/*
function login_process(request, response) {
  var post = request.body;
  var email = post.email;
  var password = post.password;
  if (email === authData.email && password === authData.password) {
    request.session.is_logined = true;
    request.session.nickname = authData.nickname;
    request.session.save(function () {
      response.redirect('/');
    });
  } else {
    response.send('Who?');
  }
}
*/
function logout(request, response) {
  request.session.destroy(function (err) {
    response.redirect('/');
  })
}

module.exports = router;