var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;
  if (title === undefined) {
    title = 'Welcome';
  } else {
    var filteredTitle = path.parse(title).base;
  }
  if (pathname === '/') {
    fs.readdir('./data', function (err, filelist) {
      var list = template.list(filelist);
      fs.readFile(`./data/${filteredTitle}`, 'utf8', function (err, description) {
        if (description === undefined) {
          description = `The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.`
        }
        var sanitizedTitle = sanitizeHtml(title);
        var sanitizedDescription = sanitizeHtml(description, {
          allowedTags: ['h1']
        });
        var body = `
          <h2>${sanitizedTitle}</h2>
          ${sanitizedDescription}`;
        var control = '<a href="/create">create</a>';
        if (title != 'Welcome') {
          control = control
            + ` <a href="/update?id=${filteredTitle}">update</a>`
            + ` <form action="/delete_process" method="post">
                      <p><input type="hidden" name="id" value=${title}></p>
                      <p><input type="submit" value="delete"></p>
                      </form>`;
        }
        var html = template.HTML(title, list, body, control);
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === '/create') {
    title = 'create'
    fs.readdir('./data', function (err, filelist) {
      var list = template.list(filelist);
      var body = `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `;
      var html = template.HTML(title, list, body);
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
      var title = post.title;
      var filteredTitle = path.parse(title).base;
      var description = post.description;
      fs.writeFile(`data/${filteredTitle}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${filteredTitle}` });
        response.end();
      });
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', function (err, filelist) {
      fs.readFile(`./data/${filteredTitle}`, 'utf8', function (err, description) {
        var list = template.list(filelist);
        var body = `
        <form action="/update_process" method="post">
          <p><input type="hidden" name="id" value=${title}></p>
          <p><input type="text" name="title" placeholder="title" value=${title}></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `;
        var html = template.HTML(title, list, body);
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
      var filteredId = path.parse(id).base;
      var title = post.title;
      var filteredTitle = path.parse(title).base;
      var description = post.description;
      fs.rename(`data/${filteredId}`, `data/${filteredTitle}`, function (err) {
        fs.writeFile(`data/${filteredTitle}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${filteredTitle}` });
          response.end();
        });
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
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function (err) {
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