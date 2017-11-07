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

app.get('/test', (req, res) => res.send('Testing 1, 2, 3'));

app.get('/books', (req, res) => {
  client.query(`SELECT book_id, author, isbn, image_url FROM books;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
