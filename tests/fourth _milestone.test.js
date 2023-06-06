const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../routes/apiRoutes');
const agent = supertest.agent(app);
const db = require("../models/index");
const { afterEach } = require('mocha');

describe('User API Test', () => {

    let createdInstrumentId;
    let createdArtistaId;
    before(async () => {
   
    });

    it('Route POST /instrumentos - creation of an instrument', async () => {
        const newInstrument = {
          name: 'Violão',
          difficulty: 10
        };
    
        const createResponse = await agent.post('/instrumentos').send(newInstrument);
        expect(createResponse.statusCode).to.be.equal(200);
        createdInstrumentId = createResponse.body.id;
    
        const getResponse = await agent.get(`/instrumentos/${createdInstrumentId}`);
        expect(getResponse.statusCode).to.be.equal(200);
        expect(getResponse.body.name).to.be.equal("Violão");
        expect(getResponse.body.difficulty).to.equal(10);

    
        const deleteRes = await agent.delete(`/instrumentos/${createdInstrumentId}`);
        expect(deleteRes.statusCode).to.equal(200);
    });

    it('Route GET /instrumentos - StatusCode 200', async () => {
        const newInstrument = {
            name: 'Bateria',
            difficulty: 10
          };
        
        const createResponse = await agent.post('/instrumentos').send(newInstrument);
        expect(createResponse.statusCode).to.be.equal(200);
        const createdInstrumentId = createResponse.body.id;

        const getResponse = await agent.get(`/instrumentos`);
        expect(getResponse.statusCode).to.be.equal(200);
        expect(getResponse.body[0].name).to.be.equal("Bateria");
        expect(getResponse.body[0].difficulty).to.equal(10);

    
        const deleteRes = await agent.delete(`/instrumentos/${createdInstrumentId}`);
        expect(deleteRes.statusCode).to.equal(200);
    });

    it('Route GET /instrumentos/:id - StatusCode 200', async () => {
        const newInstruments = {
            name: 'Uculêlê',
            difficulty: 10
          };
      
          const createResponse = await agent.post('/instrumentos').send(newInstruments);
          expect(createResponse.statusCode).to.be.equal(200);
          createdInstrumentId = createResponse.body.id;

        const getRespon = await agent.get(`/instrumentos/${createdInstrumentId}`);
        expect(getRespon.statusCode).to.be.equal(200);
        expect(getRespon.body.name).to.be.equal("Uculêlê");
        expect(getRespon.body.difficulty).to.equal(10);
    
        const deleteInstrumento = await agent.delete(`/instrumentos/${createdInstrumentId}`);
        expect(deleteInstrumento.statusCode).to.equal(200);
    });
    

    it('Route GET /instrumentos/:id - StatusCode 404', async () => {
        const getResponse = await agent.get(`/instrumentos/-1`);
    
        expect(getResponse.statusCode).to.equal(404);
        expect(getResponse.body).to.have.property('message', 'Não há instrumentos com este id.');
    });

    it('Route GET /instrumentos caso não houver itens', async () => {
        const getResponse = await agent.get('/instrumentos');
        expect(getResponse.statusCode).to.equal(200);
        expect(getResponse.body).to.have.lengthOf(0);
    });

    it('Route PUT /instrumentos/:id', async () => {
        const newInstrumentos = {
            name: 'Baixo',
            difficulty: 10
        };
      
        const createResponse = await agent.post('/instrumentos').send(newInstrumentos);
        expect(createResponse.statusCode).to.be.equal(200);
        createdInstrumentId = createResponse.body.id;
      
        const getResponse = await agent.get(`/instrumentos`);
        expect(getResponse.statusCode).to.be.equal(200);
        expect(getResponse.body[0].name).to.be.equal("Baixo");
        expect(getResponse.body[0].difficulty).to.equal(10);

        const novoInstrumento = {
            name: 'Guitarra',
            difficulty: 10
        };
        const updateResponse = await agent.put(`/instrumentos/${createdInstrumentId}`).send(novoInstrumento);
        expect(updateResponse.statusCode).to.equal(200);
    
        const getRespons = await agent.get(`/instrumentos/${createdInstrumentId}`);
        expect(getRespons.statusCode).to.equal(200);

        expect(getRespons.body.name).to.be.equal("Guitarra");
        expect(getRespons.body.difficulty).to.equal(10);

        const deleteResponse = await agent.delete(`/instrumentos/${createdInstrumentId}`);
        expect(deleteResponse.statusCode).to.equal(200);
    });

    it('Route PUT /instrumentos/:id' , async () => {
        const updateResponse = await agent.put(`/instrumentos/-1`).send();
        expect(updateResponse.statusCode).to.equal(404);
        expect(updateResponse.body).to.have.property('error', 'Instrumento não encontrado.');
    });

    it('Teste rota post /artista/:artistaId/instrumentos/:instrumentoId - associação de artista e instrumento', async () => {
        const newArtista = {
          artista: 'Teste',
        };
      
        const createArtistaResponse = await agent.post('/artista').send(newArtista);
        expect(createArtistaResponse.statusCode).to.be.equal(200);
        const createdArtistaId = createArtistaResponse.body.id;
      
        const newInstrumen = {
          name: 'Violão',
          difficulty: 10
        };
      
        const createInstrumentoResponse = await agent.post('/instrumentos').send(newInstrumen);
        expect(createInstrumentoResponse.statusCode).to.be.equal(200);
        const createdInstrumentoId = createInstrumentoResponse.body.id;
      
        const associacaoResponse = await agent.post(`/artista/${createdArtistaId}/instrumentos/${createdInstrumentoId}`);
        expect(associacaoResponse.statusCode).to.be.equal(200);
        expect(associacaoResponse.body.message).to.be.equal("Instrumento associado ao artista com sucesso.");
      
        const deleteArtistaResponse = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteArtistaResponse.statusCode).to.equal(200);
      
        const deleteInstrumentoResponse = await agent.delete(`/instrumentos/${createdInstrumentoId}`);
        expect(deleteInstrumentoResponse.statusCode).to.equal(200);
    });

    it('Teste rota post /artista/:artistaId/instrumentos/:instrumentoId - associação de artista e instrumento 404', async () => {

        const newInstrumen = {
          name: 'Violão',
          difficulty: 10
        };
      
        const createInstrumentoResponse = await agent.post('/instrumentos').send(newInstrumen);
        expect(createInstrumentoResponse.statusCode).to.be.equal(200);
        const createdInstrumentoId = createInstrumentoResponse.body.id;
      
        const associacaoResponse = await agent.post(`/artista/-1/instrumentos/${createdInstrumentoId}`);
        expect(associacaoResponse.statusCode).to.be.equal(404);
        expect(associacaoResponse.body).to.have.property('error', 'Artista não encontrado.');
      
        const deleteInstrumentoResponse = await agent.delete(`/instrumentos/${createdInstrumentoId}`);
        expect(deleteInstrumentoResponse.statusCode).to.equal(200);
    });

    it('Teste rota post /artista/:artistaId/instrumentos/:instrumentoId - associação de artista e instrumento', async () => {
        const newArtista = {
          artista: 'Teste',
        };
      
        const createArtistaResponse = await agent.post('/artista').send(newArtista);
        expect(createArtistaResponse.statusCode).to.be.equal(200);
        const createdArtistaId = createArtistaResponse.body.id;
      
      
        const associacaoResponse = await agent.post(`/artista/${createdArtistaId}/instrumentos/-1`);
        expect(associacaoResponse.statusCode).to.be.equal(404);
        expect(associacaoResponse.body).to.have.property('error', 'Instrumento não encontrado.');
      
        const deleteArtistaResponse = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteArtistaResponse.statusCode).to.equal(200);
    });

    after(async () => {
        if (createdInstrumentId) {
            await agent.delete(`/instrumentos/${createdInstrumentId}`);
        }
        if (createdArtistaId) {
            await agent.delete(`/artista/${createdArtistaId}`);
        }
    });
});
