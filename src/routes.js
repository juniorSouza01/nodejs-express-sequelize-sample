const express = require('express');
const app = express();

app.get('/hello-world', (req, res) => {
    const name = req.query.name || `world`;
    res.send(`Hello ${name}!` );
});

app.get('/hello-world/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}!` );
});

module.exports = app;