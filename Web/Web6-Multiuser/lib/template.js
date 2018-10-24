var sanitizeHtml = require('sanitize-html');

module.exports = {
  list: function (topics) {
    var list = '<ul>';
    var i = 0;
    while (i < topics.length) {
      list = list + `<li><a href='/topic/${topics[i].id}'>${sanitizeHtml(topics[i].title)}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
  }, HTML: function (title, list, body, authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">Register</a>', control = '') {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${sanitizeHtml(title)}</title>
        <meta charset="utf-8">
      </head>
      <body>
        ${authStatusUI}
        <h1><a href="/">WEB</a></h1>
        <a href="/author">author</a>
        ${list}
        ${control}
        <p>${body}</p>
      </body>
      </html>
      `;
  }, authorSelect: function (authors, author_id) {
    var i = 0;
    var authorSelect = '<select name="author_id">';
    while (i < authors.length) {
      var selected = '';
      if (authors[i].id == author_id) {
        selected = ' selected';
      }
      authorSelect += `<option value='${authors[i].id}'${selected}>${sanitizeHtml(authors[i].name)}</option>`;
      i++;
    }
    authorSelect += '</select>'
    return authorSelect;
  }, authorTable: function (authors) {
    var authorTable = '<table>';
    var i = 0;
    while (i < authors.length) {
      authorTable += `
          <tr>
            <td>${sanitizeHtml(authors[i].name)}</td>
            <td>${sanitizeHtml(authors[i].profile)}</td>
            <td><a href="/author/update?id=${authors[i].id}">update</a></td>
            <td>
              <form action = "/author/delete_process" method = "post" >
                <p><input type="hidden" name="id" value=${authors[i].id}></p>
                <p><input type="submit" value="delete"></p>
              </form>
            </td>
          </tr>`
      i++;
    };
    authorTable += '</table>';
    return authorTable;
  }
}