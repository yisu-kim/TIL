module.exports = {
    list: function (topics) {
        var list = '<ol>';
        var i = 0;
        while (i < topics.length) {
            list = list + `<li><a href='/?id=${topics[i].title}'>${topics[i].title}</a></li>`;
            i = i + 1;
        }
        list = list + '</ol>';
        return list;
    },
    HTML: function (title, list, body, control = '') {
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
    }
}