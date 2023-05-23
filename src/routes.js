const express = require('express');
const app = express();

/** 
app.get('/hello-world', (req, res) => {
    const name = req.query.name || `world`;
    res.send(`Hello ${name}!` );
});

app.get('/hello-world/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}!` );
});

*/

let alunos = [];
let cursos = [
  { id: 1, nome: 'Curso de Node.js' },
  { id: 2, nome: 'Curso de React.js' }
];

// Rota GET para listar todos os alunos
app.get('/alunos', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      alunos
    }
  });
});

// Rota GET para obter um aluno específico por ID
app.get('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  const aluno = alunos.find(a => a.id === parseInt(alunoId));

  if (aluno) {
    res.status(200).json({
      status: 'success',
      data: {
        aluno
      }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Aluno não encontrado'
    });
  }
});

// Rota POST para criar um novo aluno
app.post('/alunos', (req, res) => {
  const alunoId = Math.floor(Math.random() * 10);
  const aluno = Object.assign({ id: alunoId }, req.body);
  alunos.push(aluno);

  res.status(201).json({
    status: 'success',
    data: {
      aluno
    }
  });
});

// Rota PATCH para atualizar um aluno existente
app.patch('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  const alunoIndex = alunos.findIndex(a => a.id === parseInt(alunoId));

  if (alunoIndex !== -1) {
    const aluno = Object.assign(alunos[alunoIndex], req.body);
    alunos[alunoIndex] = aluno;

    res.status(200).json({
      status: 'success',
      data: {
        aluno
      }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Aluno não encontrado'
    });
  }
});

// Rota DELETE para excluir um aluno
app.delete('/alunos/:id', (req, res) => {
  const alunoId = req.params.id;
  const alunoIndex = alunos.findIndex(a => a.id === parseInt(alunoId));

  if (alunoIndex !== -1) {
    alunos.splice(alunoIndex, 1);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Aluno não encontrado'
    });
  }
});

// Rota GET para listar todos os cursos
app.get('/cursos', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      cursos
    }
  });
});

// Rota GET para obter um curso específico por ID
app.get('/cursos/:id', (req, res) => {
  const cursoId = req.params.id;
  const curso = cursos.find(c => c.id === parseInt(cursoId));

  if (curso) {
    res.status(200).json({
      status: 'success',
      data: {
        curso
      }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Curso não encontrado'
    });
  }
});

// Rota POST para criar um novo curso
app.post('/cursos', (req, res) => {
  const cursoId = Math.floor(Math.random() * 10);
  const curso = Object.assign({ id: cursoId }, req.body);
  cursos.push(curso);

  res.status(201).json({
    status: 'success',
    data: {
      curso
    }
  });
});

// Rota PATCH para atualizar um curso existente
app.patch('/cursos/:id', (req, res) => {
  const cursoId = req.params.id;
  const cursoIndex = cursos.findIndex(c => c.id === parseInt(cursoId));

  if (cursoIndex !== -1) {
    const curso = Object.assign(cursos[cursoIndex], req.body);
    cursos[cursoIndex] = curso;

    res.status(200).json({
      status: 'success',
      data: {
        curso
      }
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Curso não encontrado'
    });
  }
});

// Rota DELETE para excluir um curso
app.delete('/cursos/:id', (req, res) => {
  const cursoId = req.params.id;
  const cursoIndex = cursos.findIndex(c => c.id === parseInt(cursoId));

  if (cursoIndex !== -1) {
    cursos.splice(cursoIndex, 1);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Curso não encontrado'
    });
  }
});

module.exports = app;
