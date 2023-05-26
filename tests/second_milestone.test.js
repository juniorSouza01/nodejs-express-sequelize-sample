const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');

// importe sua aplicação aqui
const app = require('../routes/apiRoutes');
const agent = supertest.agent(app);
const db = require("../models/index");

describe('User API Test', async () => {

    before(async () => {
        await db.sequelize.sync();
    });

    let createdItemId;

    it('should return an empty array on GET route /all', async () => {
        const res = await agent.get('/item');
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(0);
    });


    it('should return a unique item on route GET/:id', async () => {
        const newItem = {
            name: 'Item teste',
            description: 'Novo Item.',
            quality: 10
        };

        const createResponse = await agent.post('/item').send(newItem);
        let createdItemId = createResponse.body.id;
        let getResponse = await agent.get(`/item/${createdItemId}`);
        createdItemId = getResponse.body.id;

        const deleteRes = await agent.delete(`/item/${createdItemId}`);

        expect(getResponse.statusCode).to.be.equal(200);
        expect(getResponse.body).to.be.an('object');
        expect(getResponse.body).to.have.property('id');
        expect(getResponse.body.name).to.be.equal(newItem.name);
        expect(getResponse.body.description).to.be.equal(newItem.description);
        expect(getResponse.body.quality).to.be.equal(newItem.quality);
        expect(deleteRes.statusCode).to.equal(200);
    });
    
    it('should create a new item on POST route /new', async () => {
        const newItem = {
            name: 'Item teste',
            description: 'Novo Item.',
            quality: 10
        };
        let res = await agent.post('/item').send(newItem);
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.be.equal(newItem.name);
        expect(res.body.description).to.be.equal(newItem.description);
        expect(res.body.quality).to.be.equal(newItem.quality);
        createdItemId = res.body.id;
    
        res = await agent.get('/item');
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
        expect(res.body[0].id).to.be.equal(createdItemId);
        expect(res.body[0].name).to.be.equal('Item teste');
        expect(res.body[0].description).to.be.equal('Novo Item.');
        expect(res.body[0].quality).to.be.equal(10);
    });

    it('should update an item on PUT route /item/:id', async () => {
        const newItem = {
            name: 'Item teste',
            description: 'Novo Item.',
            quality: 10
        };
        let res = await agent.post('/item').send(newItem);
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.be.equal(newItem.name);
        expect(res.body.description).to.be.equal(newItem.description);
        expect(res.body.quality).to.be.equal(newItem.quality);
        createdItemId = res.body.id;
    
        const updatedItem = {
            name: 'Novo nome',
            description: 'Nova descrição',
            quality: 10
        };
    
        res = await agent.put(`/item/${createdItemId}`).send(updatedItem);
    
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Item atualizado com sucesso.');
    });

    it('should delete an item on DELETE route /item/:id', async () => {
        const newItem = {
          name: 'Item teste',
          description: 'Novo Item.',
          quality: 10
        };
        const createRes = await agent.post('/item').send(newItem);
        expect(createRes.statusCode).to.be.equal(200);
        expect(createRes.body).to.be.an('object');
        expect(createRes.body).to.have.property('id');
        const ItemId = createRes.body.id;
      
        const deleteRes = await agent.delete(`/item/${ItemId}`);
        expect(deleteRes.statusCode).to.equal(200);

        const getRes = await agent.get('/item');
        expect(getRes.statusCode).to.be.equal(200);
        expect(getRes.body).to.be.an('array');
        expect(getRes.body.length).to.be.equal(0);

      });
  
    afterEach(async () => {
        if (createdItemId) {
            await agent.delete(`/item/${createdItemId}`);
          }
    });
});