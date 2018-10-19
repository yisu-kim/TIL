const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const topic = require('./lib/topic')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.get('*', (req, res, next) => topic.list(req, res, next));

app.get('/', (req, res) => topic.home(req, res))
app.get('/page/:pageId', (req, res) => topic.page(req, res))
app.get('/create', (req, res) => topic.create(req, res))
app.post('/create', (req, res) => topic.create_process(req, res))
app.get('/update/:pageId', (req, res) => topic.update(req, res))
app.post('/update', (req, res) => topic.update_process(req, res))
app.post('/delete', (req, res) => topic.delete_process(req, res))

app.listen(port)