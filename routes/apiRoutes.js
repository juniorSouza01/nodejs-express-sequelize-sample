const express = require("express");
const router = express.Router();
const db = require("../models");
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/hello-world', (req, res) => {
  const name = req.query.name || `world`;
  res.send(`Hello ${name}!` );
});

app.get('/hello-world/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}!` );

});

//cria o artista
app.post("/artista", async (req, res) => {
  const newArtista = {
    artista: req.body.artista
  };

  try {
    const submittedArtista = await db.Artista.create(newArtista);
    res.send(submittedArtista);
  } catch (error) {
    res.status(500).send({ error: "Falha ao criar artista." });
  }
});

//procura por todos os artistas
app.get("/artista", async (req, res) => {
  try {
    const artistas = await db.Artista.findAll({
      include: [db.Musica, db.Instrumento],
    });
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar artistas." });
  }
});

//procura um artista em específico
app.get("/artista/:id", async (req, res) => {
  const artistaId = req.params.id;
  try {
    const artista = await db.Artista.findByPk(artistaId, {include: db.Musica});
    if (artista) {
      res.status(200).json(artista);
    } else {
      res.status(404).json({ message: "Não há artistas com este id." });
    }
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar artistas." });
  }
});

//atualiza o artista
app.put("/artista/:id", async (req, res) => {
  const artistaId = req.params.id;

  const updatedArtista = {
    artista: req.body.artista
  };

  try {
    const artista = await db.Artista.findByPk(artistaId);
    if (!artista) {
      return res.status(404).send({ error: "Artista não encontrado." });
    }

    await artista.update(updatedArtista);

    res.send({ message: "Artista atualizado com sucesso." });
  } catch (error) {
    res.status(500).send({ error: "Falha ao atualizar artista." });
  }
});

//cria uma musica para um artista em específico
app.post("/artista/:id/musica", async (req, res) => {
  const artistaId = req.params.id;

  const newMusica = {
    name: req.body.name,
    description: req.body.description,
    quality: req.body.quality,
    artistaId: artistaId
  };

  try {
    const musica = db.Musica.build(newMusica);
    await musica.save();

    res.send(musica);
  } catch (error) {
    res.status(500).send({ error: "Falha ao criar música." });
  }
});

//procura todas as musicas existentes
app.get("/musicas", async (req, res) => {
  try {
    const musica = await db.Musica.findAll();
    res.send(musica);
  } catch (error) {
    res.status(500).send({ error: "Falha ao buscar musicas." });
  }
});

app.get("/musica/:id", async (req, res) => {
  const musicaId = req.params.id;
  try {
    const musica = await db.Musica.findByPk(musicaId);
    if (musica) {
      res.status(200).json(musica);
    } else {
      res.status(404).json({ message: "Não há musicas com este id." });
    }
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar musica." });
  }
});

//procura as musicas de um artista em específico
app.get("/artista/:id/musicas", async (req, res) => {
  const artistaId = req.params.id;

  try {
    const musicas = await db.Musica.findAll({ where: { artistaId } });
    res.send(musicas);
  } catch (error) {
    res.status(500).send({ error: "Falha ao buscar músicas do artista." });
  }
});

//atualiza a musica
app.put("/musica/:id", async (req, res) => {
  const musicaId = req.params.id;
  const artistaId = req.body.artistaId;

  const updatedMusica = {
    name: req.body.name,
    description: req.body.description,
    quality: req.body.quality,
    artistaId: artistaId
  };

  try {
    const musica = await db.Musica.findByPk(musicaId);
    if (!musica) {
      return res.status(404).json({ error: "Música não encontrada." });
    }

    const artista = await db.Artista.findByPk(artistaId);
    if (!artista) {
      return res.status(404).json("Artista não encontrado.");
    }

    const updateMusic = await musica.update(updatedMusica);

    res.send(updateMusic);
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar música." });
  }
});


//Deletar musica
app.delete("/musica/:id", async (req, res) => {
  const musicaId = req.params.id;

  try {
    const musica = await db.Musica.findByPk(musicaId);
    if (musica) {
      await db.Musica.destroy({
        where: {
          id: musicaId
        }
      });
      res.send({ message: "Música deletada com sucesso." });
    } else {
      res.status(404).send({ error: "Música não encontrada." });
    }
  } catch (error) {
    res.status(500).send({ error: "Falha ao deletar música." });
  }
});

//deletar usuário
app.delete("/artista/:id", async (req, res) => {
  const artistaId = req.params.id;

  try {
    const deletedCount = await db.Artista.destroy({
      where: {
        id: artistaId
      }
    });

    if (deletedCount === 0) {
      res.status(404).send({ error: "Artista não encontrado." });
    } else {
      res.send({ message: "Artista deletado com sucesso." });
    }
  } catch (error) {
    res.status(500).send({ error: "Falha ao deletar artista." });
  }
});

// CRUD 4° MileStone
app.post("/instrumentos", async (req, res) => {
 const novoInstrumento = {
    name: req.body.name,
    difficulty: req.body.difficulty,
  };

  try {
    const instrumento = await db.Instrumento.create(novoInstrumento);
    res.send(instrumento);
  } catch (error) {
    res.status(500).send({ error: "Falha ao criar instrumento." });
  }
});

app.get("/instrumentos", async (req, res) => {
    const instrumentoId = req.params.id;
    try {
      const instrumento = await db.Instrumento.findAll(instrumentoId, {include: db.Artista});
        res.send(instrumento);
    } catch (error) {
      res.status(500).json({ error: "Falha ao buscar instrumentos." });
    }
});

app.get("/instrumentos/:id", async (req, res) => {
  const instrumentoId = req.params.id;
  try {
    const instrumento = await db.Instrumento.findByPk(instrumentoId);
    if (instrumento) {
      res.status(200).json(instrumento);
    } else {
      res.status(404).json({ message: "Não há instrumentos com este id." });
    }
  } catch (error) {
    res.status(500).json({ error: "Falha ao buscar instrumento." });
  }
});

app.put("/instrumentos/:id", async (req, res) => {
  const instrumentoId = req.params.id;

  const updatedInstrumento = {
    name: req.body.name,
    difficulty: req.body.difficulty,
  };

  try {
    const instrumento = await db.Instrumento.findByPk(instrumentoId);
    if (!instrumento) {
      return res.status(404).send({ error: "Instrumento não encontrado." });
    }

    await instrumento.update(updatedInstrumento);

    res.send({ message: "Instrumento atualizado com sucesso." });
  } catch (error) {
    res.status(500).send({ error: "Falha ao atualizar instrumento." });
  }
});

app.delete("/instrumentos/:id", async (req, res) => {
  const instrumentoId = req.params.id;

  try {
    const deletedInstrumento = await db.Instrumento.destroy({
      where: {
        id: instrumentoId
      }
    });

    if (deletedInstrumento === 0) {
      res.status(404).send({ error: "Instrumento não encontrado." });
    } else {
      res.send({ message: "Instrumento deletado com sucesso." });
    }
  } catch (error) {
    res.status(500).send({ error: "Falha ao deletar instrumento." });
  }
});


//Rota de associação
app.post("/artista/:artistaId/instrumentos/:instrumentoId", async (req, res) => {
  const artistaId = req.params.artistaId;
  const instrumentoId = req.params.instrumentoId;

  try {
    const artista = await db.Artista.findByPk(artistaId);
    if (!artista) {
      return res.status(404).send({ error: "Artista não encontrado." });
    }

    const instrumento = await db.Instrumento.findByPk(instrumentoId);
    if (!instrumento) {
      return res.status(404).send({ error: "Instrumento não encontrado." });
    }

    await artista.addInstrumento(instrumento);

    res.send({ message: "Instrumento associado ao artista com sucesso." });
  } catch (error) {
    res.status(500).send({ error: "Falha ao associar instrumento ao artista." });
  }
});

module.exports = app;