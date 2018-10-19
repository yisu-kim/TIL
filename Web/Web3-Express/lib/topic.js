var template = require('./template');
var db = require('./db');
var qs = require('querystring');
var sanitizeHtml = require('sanitize-html');

exports.home = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    if (error) {
      throw error;
    };
    var title = 'Welcome';
    var description = 'Hello, web!';
    var list = template.list(topics);
    var control = '<a href="/create">create</a>';
    var body = `
      <h2>${title}</h2>
      ${description}`;
    var html = template.HTML(title, list, body, control);
    response.send(html);
  });
};

exports.page = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    if (error) {
      throw error;
    }
    db.query('SELECT author.*, topic.* FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?', [request.params.pageId], function (error2, topic) {
      if (error2) {
        throw error2;
      };
      var id = topic[0].id;
      var title = sanitizeHtml(topic[0].title);
      var description = sanitizeHtml(topic[0].description);
      var author = sanitizeHtml(topic[0].name);
      var list = template.list(topics);
      var body = `
              <h2>${title}</h2>
              ${description}
              <p>by ${author}</p>`;
      var control = `
        <a href="/create">create</a>
        <a href="/update/${id}">update</a>
        <form action = "/delete_process" method = "post" >
          <p><input type="hidden" name="id" value=${id}></p>
          <p><input type="submit" value="delete"></p>
        </form>`;
      var html = template.HTML(title, list, body, control);
      response.send(html);
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
      var title = 'Create';
      var list = template.list(topics);
      var body = `
        <form action="/create" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p>${template.authorSelect(authors)}</p>
            <p><input type="submit"></p>
        </form>`;
      var html = template.HTML(title, list, body);
      response.send(html);
    });
  });
}

exports.create_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    var author_id = post.author_id;
    db.query(`INSERT INTO topic (title, description, created, author_id) VALUES (?, ?, NOW(), ?)`,
      [title, description, author_id],
      function (error, result) {
        if (error) {
          throw error;
        }
        response.redirect(`/page/${result.insertId}`);
      });
  });
}

exports.update = function (request, response) {
  db.query('SELECT * FROM topic', function (error, topics) {
    if (error) {
      throw error;
    }
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
        var list = template.list(topics);
        var body = `
          <form action="/update" method="post">
            <p><input type="hidden" name="id" value=${id}></p>
            <p><input type="text" name="title" placeholder="title" value=${title}></p>
            <p><textarea name="description" placeholder="description">${description}</textarea></p>
            <p>${template.authorSelect(authors, author_id)}</p>
            <p><input type="submit"></p>
          </form>
          `;
        var control = '<a href="/create">create</a>';
        var html = template.HTML(title, list, body, control);
        response.send(html);
      });
    });
  });
}

exports.update_process = function (request, response) {
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    var id = post.id;
    var title = post.title;
    var description = post.description;
    var author_id = post.author_id;
    db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
      [title, description, author_id, id], function (error) {
        if (error) {
          throw error;
        };
        response.redirect(`/page/${id}`);
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
    db.query(`DELETE FROM topic WHERE id=?`, [id], function (error) {
      if (error) {
        throw error;
      };
      response.writeHead(302, { Location: '/' });
      response.end();
    });
  });
}