const express = require('express');
const app = express();

app.get('/hello-world', (req, res) => {
   let name = req.query['name'];
   if(name) {
    res.json({ message: `Hello ${name}!` });
   } else {
    res.json({ message: 'Hello World' });
   }
});

app.get('/hello-world/:name', (req, res) => {
    const name = req.params.name || 'World';
    const message = `Hello ${name}!`;
    
    res.json({ message: message });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});