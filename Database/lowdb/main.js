const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const http = require('http');
const hostname = 'localhost';
const port = 3000;
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('./web.html', (err, data) => {
        res.statusCode = 200;
        res.end(data);
    })
})

server.listen(port, hostname);