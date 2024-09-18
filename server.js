require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
