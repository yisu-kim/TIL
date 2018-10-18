var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var connection = require('./lib/connection');
var db = mysql.createConnection(connection);
db.connect();

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === '/') {
    if (queryData.id === undefined) {
      db.query('SELECT * FROM topic', function (error, topics) {
        if (error) {
          throw error;
        };
        var title = 'Welcome';
        var description = `The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.`;
        var list = template.list(topics);
        var control = '<a href="/create">create</a>';
        var body = `
          <h2>${title}</h2>
          ${description}`;
        var html = template.HTML(title, list, body, control);
        response.writeHead(200);
        response.end(html);
      });
    } else {
      db.query('SELECT * FROM topic', function (error, topics) {
        if (error) {
          throw error;
        }
        db.query('SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?', [queryData.id], function (error2, topic) {
          if (error2) {
            throw error2;
          };
          var id = topic[0].id;
          var title = topic[0].title;
          var description = topic[0].description;
          var author = topic[0].name;
          var list = template.list(topics);
          var body = `
              <h2>${title}</h2>
              ${description}
              <p>by ${author}</p>`;
          var control = `
            <a href="/create">create</a>
            <a href="/update?id=${id}">update</a>
            <form action = "/delete_process" method = "post" >
              <p><input type="hidden" name="id" value=${id}></p>
              <p><input type="submit" value="delete"></p>
            </form>`;
          var html = template.HTML(title, list, body, control);
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === '/create') {
    db.query('SELECT * FROM topic', function (error, topics) {
      if (error) {
        throw error;
      }
      db.query('SELECT * FROM author', function (error, authors) {
        var title = 'Create';
        var list = template.list(topics);
        var body = `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p><textarea name="description" placeholder="description"></textarea></p>
          <p>${template.authorSelect(authors)}</p>
          <p><input type="submit"></p>
        </form>`;
        var html = template.HTML(title, list, body);
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      var author_id = post.author_id;
      db.query(`INSERT INTO topic (title, description, created, author_id)
        VALUES (?, ?, NOW(), ?)`,
        [title, description, author_id],
        function (error, result) {
          if (error) {
            throw error;
          }
          response.writeHead(302, { Location: `/?id=${result.insertId}` });
          response.end();
        });
    });
  } else if (pathname === '/update') {
    db.query('SELECT * FROM topic', function (error, topics) {
      if (error) {
        throw error;
      }
      db.query('SELECT * FROM topic WHERE id=?', [queryData.id], function (error2, topic) {
        if (error2) {
          throw error2;
        };
        var id = topic[0].id;
        var title = topic[0].title;
        var description = topic[0].description;
        var list = template.list(topics);
        var body = `
          <form action="/update_process" method="post">
            <p><input type="hidden" name="id" value=${id}></p>
            <p><input type="text" name="title" placeholder="title" value=${title}></p>
            <p><textarea name="description" placeholder="description">${description}</textarea></p>
            <p><input type="submit"></p>
          </form>
        `;
        var control = '<a href="/create">create</a>';
        var html = template.HTML(title, list, body, control);
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
        [title, description, 1, id], function (error) {
          if (error) {
            throw error;
          };
          response.writeHead(302, { Location: `/?id=${id}` });
          response.end();
        });
    });
  } else if (pathname === '/delete_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var id = post.id;
      db.query(`DELETE FROM topic WHERE id=?`, [id], function (error) {
        if (error) {
          throw error;
        };
        response.writeHead(302, { Location: '/' });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);