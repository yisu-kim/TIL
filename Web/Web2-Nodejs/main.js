var http = require('http');
var fs = require('fs');
var url = require('url');

function templateList(filelist) {
  var list = '<ol>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ol>';
  return list;
}

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
  </head>
  <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      <a href="/create">create</a>
      ${body}
  </body>
  </html>
  `;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;
  if (pathname === '/') {
    if (title === undefined) {
      title = 'Welcome';
    }
    fs.readdir('./data', function (err, filelist) {
      var list = templateList(filelist);
      fs.readFile(`./data/${title}`, 'utf8', function (err, description) {
        if (description === undefined) {
          description = `<p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are
          identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the
          Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser
          computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN
          in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in
          August 1991.
          </p>`
        }
        var body = `
          <h2>${title}</h2>
          ${description}`;
        var template = templateHTML(title, list, body);
        response.writeHead(200);
        response.end(template);
      })
    })
  } else if (pathname === '/create') {
    title = 'create'
    fs.readdir('./data', function (err, filelist) {
      var list = templateList(filelist);
      fs.readFile(`./data/${title}`, 'utf8', function (err, description) {
        var body = `
        <form action="http://localhost:3000/process_create" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `;
        var template = templateHTML(title, list, body);
        response.writeHead(200);
        response.end(template);
      })
    })
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);