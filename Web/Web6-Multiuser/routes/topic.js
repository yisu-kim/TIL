const express = require('express')
const router = express.Router()
const sanitizeHtml = require('sanitize-html');
const template = require('../lib/template');
const db = require('../lib/db');
const auth = require('../lib/auth')

router.get('/create', (req, res) => create(req, res))
router.post('/create', (req, res) => create_process(req, res))
router.get('/update/:pageId', (req, res) => update(req, res))
router.post('/update', (req, res) => update_process(req, res))
router.post('/delete', (req, res) => delete_process(req, res))
router.get('/:pageId', (req, res, next) => page(req, res, next))

function page(request, response, next) {
  db.query('SELECT users.*, topic.* FROM topic LEFT JOIN users ON topic.author_id=users.id WHERE topic.id=?', [request.params.pageId], function (error, topic) {
    if (topic.length === 0) {
      next(error);
    } else {
      var title = sanitizeHtml(topic[0].title);
      var description = sanitizeHtml(topic[0].description);
      var list = template.list(request.list);
      var body = `
        <h2>${title}</h2>
        ${description}
        <p>by ${topic[0].displayName}</p>`;
      var control = `
        <a href="/topic/create">create</a>
        <a href="/topic/update/${topic[0].id}">update</a>
        <form action = "/topic/delete" method = "post" >
          <p><input type="hidden" name="id" value=${topic[0].id}></p>
          <p><input type="submit" value="delete"></p>
        </form>`;
      var html = template.HTML(title, list, body, auth.statusUI(request, response), control);
      response.send(html);
    }
  });
};

function create(request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  db.query('SELECT * FROM author', function (error, authors) {
    if (error) {
      throw error;
    };
    var title = 'Create';
    var list = template.list(request.list);
    var body = `
      <form action="/topic/create" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p><input type="submit" value="create"></p>
      </form>`;
    var html = template.HTML(title, list, body, auth.statusUI(request, response));
    response.send(html);
  });
}

function create_process(request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  var post = request.body;
  var title = post.title;
  var description = post.description;
  var user_id = request.user.id;
  db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, NOW(), ?)`,
    [title, description, user_id],
    function (error, result) {
      if (error) {
        throw error;
      }
      response.redirect(`/topic/${result.insertId}`);
    });
}

function update(request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  db.query('SELECT * FROM topic WHERE id=?', [request.params.pageId], function (error, topic) {
    if (error) {
      throw error;
    };
    if (topic[0].author_id !== request.user.id) {
      request.flash('error', 'Not yours!');
      request.session.save(function () {
        response.redirect('/');
      })
      return false;
    }
    var title = sanitizeHtml(topic[0].title);
    var description = sanitizeHtml(topic[0].description);
    var list = template.list(request.list);
    var body = `
        <form action="/topic/update" method="post">
          <p><input type="hidden" name="id" value=${topic[0].id}></p>
          <p><input type="text" name="title" placeholder="title" value=${title}></p>
          <p><textarea name="description" placeholder="description">${description}</textarea></p>
          <p><input type="hidden" name="author_id" value=${topic[0].author_id}></p>
          <p><input type="submit" value="update"></p>
        </form>`;
    var control = '<a href="/topic/create">create</a>';
    var html = template.HTML(title, list, body, auth.statusUI(request, response), control);
    response.send(html);
  });
}

function update_process(request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
  var post = request.body;
  console.log(post.author_id, request.user.id)
  if (post.author_id !== request.user.id) {
    request.flash('error', 'Not yours!');
    request.session.save(function () {
      response.redirect('/');
    })
    return false;
  }
  db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
    [post.title, post.description, post.author_id, post.id], function (error) {
      if (error) {
        throw error;
      };
      response.redirect(`/topic/${post.id}`);
    });
}

function delete_process(request, response) {
  if (!auth.isOwner(request, response)) {
    response.redirect('/');
    return false;
  }
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