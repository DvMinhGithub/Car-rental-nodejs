require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
