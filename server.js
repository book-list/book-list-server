'use strict'

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/books', (req, res) => {
  client.query(`SELECT * FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// loadDB();
//
// function loadBooks() {
//   fs.readFile('../book-list-client/data/books.json', function(err, fd) {
//     JSON.parse(fd.toString()).forEach(function(ele) {
//       client.query(
//         'INSERT INTO books(title, author, isbn, image_url, description) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
//         [ele.title, ele.author, ele.isbn, ele.image_url, ele.description]
//       )
//     })
//   })
// }
//
// function loadDB() {
//   client.query(`
//     CREATE TABLE IF NOT EXISTS
//     books(id SERIAL PRIMARY KEY, title VARCHAR(255), author VARCHAR(255), isbn VARCHAR(255), image_url VARCHAR(255), description TEXT NOT NULL);
//     `)
//
//     .then(loadBooks());
// }
