const express = require('express')
const router = express.Router()
const template = require('../lib/template')
const auth = require('../lib/auth')

router.get('/', (req, res) => home(req, res))

function home(request, response) {
  var title = 'Welcome';
  var description = 'Hello, web!';
  var list = template.list(request.list);
  var control = '<a href="/topic/create">create</a>';
  var body = `
      <h2>${title}</h2>
      ${description}
      <image src=/images/hello.jpg style="width:300px; display:block; margin-top:10px;">`;
  var html = template.HTML(title, list, body, auth.statusUI(request, response), control);
  response.send(html);
}

module.exports = router;