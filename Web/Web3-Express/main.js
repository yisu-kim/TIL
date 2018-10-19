const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const topicRouter = require('./routes/topic')
const indexRouter = require('./routes/index')
const db = require('./lib/db');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.get('*', (req, res, next) =>  {
  db.query('SELECT * FROM topic', function (err, topics) {
    if (err) {
      next(err);
    } else {
      req.list = topics;
      next();
    }
  })
})

app.use('/', indexRouter)
app.use('/topic', topicRouter)

app.use((req, res, next) => res.status(404).send("Sorry can't find that!"))
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port)