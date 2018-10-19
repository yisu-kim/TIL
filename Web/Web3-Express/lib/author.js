var template = require('./template');
var db = require('./db');
var qs = require('querystring');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

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
          <p><input type="submit" value="create"></p>
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

exports.update = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    if (error) {
      throw error;
    }
    db.query('SELECT * FROM author', function (error2, authors) {
      if (error2) {
        throw error2;
      };
      var _url = request.url;
      var queryData = url.parse(_url, true).query;
      db.query('SELECT * FROM author WHERE id=?', [queryData.id], function (error3, author) {
        if (error3) {
          throw error3;
        };
        var title = 'Update author';
        var list = template.list(topics);
        var id = author[0].id;
        var name = sanitizeHtml(author[0].name);
        var profile = sanitizeHtml(author[0].profile);
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
          <form action="/author/update_process" method="post">
            <p><input type="hidden" name="id" value="${id}"></p>
            <p><input type="text" name="name" placeholder="name" value="${name}"></p>
            <p><textarea name="profile" placeholder="profile">${profile}</textarea></p>
            <p><input type="submit" value="update"></p>
          </form>`;
        var html = template.HTML(title, list, body);
        response.writeHead(200);
        response.end(html);
      });
    });
  });
};

exports.update_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    var id = post.id;
    var name = post.name;
    var profile = post.profile;
    db.query(`UPDATE author SET name=?, profile=? WHERE id=?`,
      [name, profile, id], function (error) {
        if (error) {
          throw error;
        };
        response.writeHead(302, { Location: `/author?id=${id}` });
        response.end();
      });
  });
}

exports.delete_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    var id = post.id;
    db.query(`DELETE FROM topic WHERE author_id=?`, [id], function (error) {
      if (error) {
        throw error;
      };
      db.query(`DELETE FROM author WHERE id=?`, [id], function (error2) {
        if (error2) {
          throw error2;
        };
        response.writeHead(302, { Location: '/author' });
        response.end();
      });
    });

  });
}