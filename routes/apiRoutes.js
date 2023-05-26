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

// buscar todos os itens
app.get("/item", async (req, res) => {
  try {
    let whereClause = {};
    
    if (req.query.quality) {
      whereClause.quality = {
        gt: 5
      };
    }
    
    const itens = await db.Item.findAll({
      where: whereClause
    });
    
    res.send(itens);
  } catch (error) {
    res.status(500).send({ error: "Falha ao buscar itens." });
  }
});

// buscar um item em específico
app.get("/item/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await db.Item.findByPk(itemId);
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ error: "Item não encontrado." });
    }
  } catch (error) {
    res.status(500).send({ error: "Falha ao encontrar item." });
  }
});

// novo item
app.post("/item", async (req, res) => {
  const newItem = {
    name: req.body.name,
    description: req.body.description,
    quality: req.body.quality
  };

  try {
    const submittedItem = await db.Item.create(newItem);
    res.send(submittedItem);
  } catch (error) {
    res.status(500).send({ error: "Falha ao criar item." });
  }
});

// deletar item
app.delete("/item/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const deletedCount = await db.Item.destroy({
      where: {
        id: itemId
      }
    });

    if (deletedCount === 0) {
      res.status(404).send({ error: "Item não encontrado." });
    } else {
      res.send({ message: "Item deletado com sucesso." });
    }
  } catch (error) {
    res.status(500).send({ error: "Falha ao deletar item." });
  }
});

// editar item
app.put("/item/:id", async (req, res) => {
  const itemId = req.params.id;

  const updatedItem = {
    name: req.body.name,
    description: req.body.description,
    quality: req.body.quality
  };

  try {
    const [updatedCount] = await db.Item.update(updatedItem, {
      where: { id: itemId }
    });

    if (updatedCount === 0) {
      res.status(404).send({ error: "Item não encontrado." });
    } else {
      res.send({ message: "Item atualizado com sucesso." });
    }
  } catch (error) {
    res.status(500).send({ error: "Falha ao atualizar item." });
  }
});

module.exports = app;