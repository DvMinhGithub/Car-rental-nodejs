require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const connection = require('./configs/db');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  connection.query('SELECT * FROM category', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
