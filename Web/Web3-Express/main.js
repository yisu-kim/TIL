const express = require('express')
const app = express()
const port = 3000
const topic = require('./lib/topic')

app.get('/', (req, res) => topic.home(req, res))
app.get('/page/:pageId', (req, res) => topic.page(req, res))
app.get('/create', (req, res) => topic.create(req, res))
app.post('/create', (req, res) => topic.create_process(req, res))
app.get('/update/:pageId', (req, res) => topic.update(req, res))
app.post('/update', (req, res) => topic.update_process(req, res))

app.listen(port, () => console.log('Example app listening on port ${port}!'))

/*
var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template');
var db = require('./lib/db');
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === '/') {
    if (queryData.id === undefined) {
      topic.home(request, response);
    } else {
      topic.page(request, response);
    }
  } else if (pathname === '/create') {
    topic.create(request, response);
  } else if (pathname === '/create_process') {
    topic.create_process(request, response);
  } else if (pathname === '/update') {
    topic.update(request, response);
  } else if (pathname === '/update_process') {
    topic.update_process(request, response);
  } else if (pathname === '/delete_process') {
    topic.delete_process(request, response);
  } else if (pathname === '/author') {
    author.home(request, response);
  } else if (pathname === '/author/create') {
    author.create(request, response);
  } else if (pathname === '/author/create_process') {
    author.create_process(request, response);
  } else if (pathname === '/author/update') {
    author.update(request, response);
  } else if (pathname === '/author/update_process') {
    author.update_process(request, response);
  } else if (pathname === '/author/delete_process') {
    author.delete_process(request, response);
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
*/