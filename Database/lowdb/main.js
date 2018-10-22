const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');

const http = require('http');
const hostname = 'localhost';
const port = 3000;
const fs = require('fs');

db.defaults({ topic: [], author: [] }).write();
// db.get('author')
//   .push({ id: 1, name: 'egoing', profile: 'developer' })
//   .write();
// db.get('topic')
//   .push({ id: 1, title: 'lowdb', description: 'lowdb is ...', author: 1 })
//   .write();
// db.get('topic')
//   .push({ id: 2, title: 'mysql', description: 'mysql is ...', author: 1 })
//   .write();
// console.log(
//   db.get('topic')
//     .find({ title: 'lowdb', author: 1 })
//     .value()
// );
// db.get('topic')
//   .find({ title: 'mysql' })
//   .assign({ title: 'Mysql & MariaDB' })
//   .write();
// db.get('topic')
//   .remove({ title: 'Mysql & MariaDB' })
//   .write();
var authorId = shortid.generate();
db.get('author')
  .push({ id: authorId, name: 'taeho', profile: 'data scientist' })
  .write();
db.get('topic')
  .push({ id: shortid.generate(), title: 'PostgreSQL', description: 'PostgreSQL is ...', author: authorId })
  .write();

const server = http.createServer((req, res) => {
  fs.readFile('./web.html', (err, data) => {
    res.statusCode = 200;
    res.end(data);
  })
})

server.listen(port, hostname);