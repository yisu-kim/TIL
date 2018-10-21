const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./lib/db')
const helmet = require('helmet')

app.use(helmet())
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

const topicRouter = require('./routes/topic')
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')

app.use('/', indexRouter)
app.use('/topic', topicRouter)
app.use('/auth', authRouter)

app.use((req, res, next) => res.status(404).send("Sorry can't find that!"))
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port)