const express = require('express')
const router = express.Router()
const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template');
const db = require('../lib/db');

router.get('/create', (req, res) => create(req, res))
router.post('/create', (req, res) => create_process(req, res))
router.get('/update/:pageId', (req, res) => update(req, res))
router.post('/update', (req, res) => update_process(req, res))
router.post('/delete', (req, res) => delete_process(req, res))
router.get('/:pageId', (req, res, next) => page(req, res, next))

function page(request, response, next) {
  db.query('SELECT author.*, topic.* FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?', [request.params.pageId], function (error, topic) {
    if (topic.length === 0) {
      next(error);
    } else {
      var id = topic[0].id;
      var title = sanitizeHtml(topic[0].title);
      var description = sanitizeHtml(topic[0].description);
      var author = sanitizeHtml(topic[0].name);
      var list = template.list(request.list);
      var body = `
        <h2>${title}</h2>
        ${description}
        <p>by ${author}</p>`;
      var control = `
        <a href="/topic/create">create</a>
        <a href="/topic/update/${id}">update</a>
        <form action = "/topic/delete" method = "post" >
          <p><input type="hidden" name="id" value=${id}></p>
          <p><input type="submit" value="delete"></p>
        </form>`;
      var html = template.HTML(title, list, body, control);
      response.send(html);
    }
  });
};

function create(request, response) {
  db.query('SELECT * FROM author', function (error2, authors) {
    if (error2) {
      throw error2;
    };
    var title = 'Create';
    var list = template.list(request.list);
    var body = `
      <form action="/topic/create" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p><textarea name="description" placeholder="description"></textarea></p>
          <p>${template.authorSelect(authors)}</p>
          <p><input type="submit" value="create"></p>
      </form>`;
    var html = template.HTML(title, list, body);
    response.send(html);
  });
}

function create_process(request, response) {
  var post = request.body;
  console.log(request.body);
  var title = post.title;
  var description = post.description;
  var author_id = post.author_id;
  db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, NOW(), ?)`,
    [title, description, author_id],
    function (error, result) {
      if (error) {
        throw error;
      }
      response.redirect(`/topic/${result.insertId}`);
    });
}

function update(request, response) {
  db.query('SELECT * FROM topic WHERE id=?', [request.params.pageId], function (error2, topic) {
    if (error2) {
      throw error2;
    };
    db.query('SELECT * FROM author', function (error3, authors) {
      if (error3) {
        throw error3;
      };
      var id = topic[0].id;
      var title = sanitizeHtml(topic[0].title);
      var description = sanitizeHtml(topic[0].description);
      var author_id = sanitizeHtml(topic[0].author_id);
      var list = template.list(request.list);
      var body = `
        <form action="/topic/update" method="post">
          <p><input type="hidden" name="id" value=${id}></p>
          <p><input type="text" name="title" placeholder="title" value=${title}></p>
          <p><textarea name="description" placeholder="description">${description}</textarea></p>
          <p>${template.authorSelect(authors, author_id)}</p>
          <p><input type="submit" value="update"></p>
        </form>`;
      var control = '<a href="/topic/create">create</a>';
      var html = template.HTML(title, list, body, control);
      response.send(html);
    });
  });
}

function update_process(request, response) {
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  var
    author_id = post.author_id;
  db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
    [title, description, author_id, id], function (error) {
      if (error) {
        throw error;
      };
      response.redirect(`/topic/${id}`);
    });
}

function delete_process(request, response) {
  var post = request.body;
  var id = post.id;
  db.query(`DELETE FROM topic WHERE id=?`, [id], function (error) {
    if (error) {
      throw error;
    };
    response.redirect('/');
  });
}

module.exports = router;