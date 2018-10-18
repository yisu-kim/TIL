var template = require('./template');
var db = require('./db');
var qs = require('querystring');

exports.home = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    if (error) {
      throw error;
    };
    db.query('SELECT * FROM author', function (error2, authors) {
      if (error2) {
        throw error2;
      };
      var title = 'Author';
      var list = template.list(topics);
      var control = '<a href="/author/create">create</a>';
      var body = `${template.authorTable(authors)}
        <style>
          table{
            border-collapse: collapse;
          }
          td{
            border:1px solid black;
          }
        </style>`;
      var html = template.HTML(title, list, body, control);
      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.create = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    if (error) {
      throw error;
    }
    db.query('SELECT * FROM author', function (error2, authors) {
      if (error2) {
        throw error2;
      };
      var title = 'Create author';
      var list = template.list(topics);
      var body = `
      ${template.authorTable(authors)}
      <style>
        table{
          border-collapse: collapse;
        }
        td{
          border:1px solid black;
        }
      </style>
      <form action="/author/create_process" method="post">
          <p><input type="text" name="name" placeholder="name"></p>
          <p><textarea name="profile" placeholder="profile"></textarea></p>
          <p><input type="submit"></p>
      </form>`;
      var html = template.HTML(title, list, body);
      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.create_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    var name = post.name;
    var profile = post.profile;
    db.query(`INSERT INTO author (name, profile) VALUES (?, ?)`,
      [name, profile],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.writeHead(302, { Location: `/author` });
        response.end();
      });
  });
};