const express = require('express');
const app = express();

app.get('/hello-world', (req, res) => {
    const name = req.query.name || `World!`;
    res.json({ message: `Hello ${name}!` });
});

app.get('/hello-world/:name', (req, res) => {
    const name = req.params.name || 'World';
    const message = `Hello ${name}!`;
    
    res.json({ message: message });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});