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

app.get("/artista", async (req, res) => {
  try {
    const artista = await db.Artista.findAll();
    res.send(artista);
  } catch (error) {
    res.status(500).send({ error: "Falha ao buscar artistas." });
  }
});

app.get("/artista/:id", async (req, res) => {
  const artistaId = req.params.id;

  try {
    const artista = await db.Artista.findByPk(artistaId);
    res.send(artista);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Falha ao buscar artista." });
  }
});

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
    console.error(error);
    res.status(500).send({ error: "Falha ao criar música." });
  }
});

app.get("/musicas", async (req, res) => {
  try {
    const musica = await db.Musica.findAll();
    res.send(musica);
  } catch (error) {
    res.status(500).send({ error: "Falha ao buscar musicas." });
  }
});

app.get("/artista/:id/musicas", async (req, res) => {
  const artistaId = req.params.id;

  try {
    const musicas = await db.Musica.findAll({ where: { artistaId } });
    res.send(musicas);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Falha ao buscar músicas do artista." });
  }
});

app.put("/musica/:id", async (req, res) => {
  const artistaId = req.params.id;

  const updatedArtista = {
    name: req.body.name,
    description: req.body.description,
    quality: req.body.quality
  };

  try {
    const updatedCount = await db.Musica.update(updatedMusica, {
      where: { id: musicaId }
    });

    if (updatedCount[0] === 0) {
      res.status(404).send({ error: "Música não encontrada." });
    } else {
      res.send({ message: "Música atualizada com sucesso." });
    }
  } catch (error) {
    res.status(500).send({ error: "Falha ao atualizar música." });
  }
});

app.delete("/musica/:id", async (req, res) => {
  const musicaId = req.params.id;

  try {
    const deletedCount = await db.Musica.destroy({
      where: {
        id: musicaId
      }
    });

    if (deletedCount === 0) {
      res.status(404).send({ error: "Música não encontrada." });
    } else {
      res.send({ message: "Música deletada com sucesso." });
    }
  } catch (error) {
    res.status(500).send({ error: "Falha ao deletar música." });
  }
});

module.exports = app;