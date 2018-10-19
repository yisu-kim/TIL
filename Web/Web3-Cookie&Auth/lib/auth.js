var template = require('./template');
var db = require('./db');
var qs = require('querystring');
var cookie = require('cookie');

function authIsOwner(request, response) {
  var isOwner = false;
  var cookies = {};
  if (request.headers.cookie) {
    cookies = cookie.parse(request.headers.cookie);
  }
  if (cookies.email === 'egoing777@gmail.com' && cookies.password === '1234') {
    isOwner = true;
  }
  return isOwner;
}

exports.login = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    if (error) {
      throw error;
    };
    var title = 'Login'
    var list = template.list(topics);
    var control = '<a href="/create">create</a>';
    var body = `
      <form action="login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit"></p>
      </form>`;
    var html = template.HTML(title, list, body, control);
    response.writeHead(200);
    response.end(html);
  });
};

exports.login_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    if (post.email === 'egoing777@gmail.com' && post.password === '1234') {
      response.writeHead(302, {
        'Set-Cookie': [
          `email=${post.email}`,
          `password=${post.password}`,
          `nickname=egoing`
        ],
        Location: '/'
      });
      response.end();
    } else {
      response.end('Who?')
    }
  });
};

exports.logout_process = function (request, response) {
  if(authIsOwner(request, response) === false){
    response.end('Login required!!');
    return false;
  }
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    response.writeHead(302, {
      'Set-Cookie': [
        `email=; Max-Age=0`,
        `password=; Max-Age=0`,
        `nickname=; Max-Age=0`
      ],
      Location: '/'
    });
    response.end();
  });
};