const express = require("express");
const router = express.Router();
const db = require("../models");

// buscar todos os itens
router.get("/all", (req, res) => {
  db.Item.findAll().then(itens => res.send(itens));
});

// buscar um item em específico
router.get("/item/:id", (req, res) => {
    const itemId = req.params.id;
  
    db.Item.findByPk(itemId)
      .then(item => {
        if (item) {
          res.send(item);
        } else {
          res.status(404).send({ error: "Item não encontrado." });
        }
      })
      .catch(error => res.status(500).send({ error: "Falha ao encontrar item." }));
  });~

// novo item
router.post("/new", (req, res) => {
    const newItem = {
      name: req.body.name,
      description: req.body.description
    };
  
    db.Item.create(newItem)
      .then(submittedItem => res.send(submittedItem))
      .catch(error => res.status(500).send({ error: "Falha ao criar item." }));
  });


// deletar item
router.delete("/item/:id", (req, res) => {
    const itemId = req.params.id;
  
    db.Item.destroy({
      where: {
        id: itemId
      }
    })
      .then(deletedCount => {
        if (deletedCount === 0) {
          res.status(404).send({ error: "Item não encontrado." });
        } else {
          res.send({ message: "Item deletado com sucesso." });
        }
      })
      .catch(error => res.status(500).send({ error: "Falha ao deletar item." }));
  });

// editar item
router.put("/item/:id", (req, res) => {
    const itemId = req.params.id;
  
    const updatedItem = {
      name: req.body.name,
      description: req.body.description
    };
  
    db.Item.update(updatedItem, {
      where: { id: itemId }
    })
      .then(updatedCount => {
        if (updatedCount[0] === 0) {
          res.status(404).send({ error: "Item não encontrado." });
        } else {
          res.send({ message: "Item atualizado com sucesso." });
        }
      })
      .catch(error => res.status(500).send({ error: "Falha ao atualizar item." }));
  });

module.exports = router;