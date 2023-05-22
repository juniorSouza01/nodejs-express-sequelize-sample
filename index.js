const express = require('express');
const app = express();

app.get('/hello-world', (req, res) => {
  const { name } = req.query;
  console.log('Alô!', name);

  res.send(`Hello World! ${name}`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
