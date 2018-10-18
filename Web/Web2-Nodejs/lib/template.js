module.exports = {
    list: function (topics) {
        var list = '<ul>';
        var i = 0;
        while (i < topics.length) {
            list = list + `<li><a href='/?id=${topics[i].id}'>${topics[i].title}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    }, HTML: function (title, list, body, control = '') {
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
            if (authors[i].id === author_id) {
                selected = 'selected';
            }
            authorSelect += `<option value='${authors[i].id}' ${selected}>${authors[i].name}</option>`;
            i++;
        }
        authorSelect += '</select>'
        return authorSelect;
    }
}