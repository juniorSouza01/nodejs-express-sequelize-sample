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



app.post('/hello-world', (req, res) => {
    const alunoId = Math.floor(Math.random() * 10);
    const aluno = Object.assign({ id: alunoId }, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            aluno
        }
    });
});

app.patch('/hello-world:id', (req, res) => {
    const alunoId = req.params.id;
    const aluno = Object.assign({ id: alunoId }, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            aluno
        }
    });
});

app.delete('/hello-world:id', (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
});

app.get('/api/curso', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            cursos: [
                {
                    id: 1,
                    nome: 'Curso de Node.js'
                },
                {
                    id: 2,
                    nome: 'Curso de React.js'
                }
            ]
        }
    });
});

app.get('/api/curso/:id', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            curso: {
                id: req.params.id,
                nome: 'Curso de React.js'
            }
        }
    });
});

app.post('/api/curso', (req, res) => {
    const cursoId = Math.floor(Math.random() * 10);
    const curso = Object.assign({ id: cursoId }, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            curso
        }
    });
});

app.patch('/api/curso/:id', (req, res) => {
    const cursoId = req.params.id;
    const curso = Object.assign({ id: cursoId }, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            curso
        }
    });
});

app.delete('/api/curso/:id', (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
});


module.exports = app;