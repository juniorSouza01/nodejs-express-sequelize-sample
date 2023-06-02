const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../routes/apiRoutes');
const agent = supertest.agent(app);
const db = require("../models/index");
const { afterEach } = require('mocha');

describe('User API Test', () => {
    let createdArtistaId;
    let createdMusicaId;

    before(async () => {
        await db.sequelize.sync();
    });

    it('Teste rota post /artista', async () => {
        const newArtista = {
          artista: 'Teste 3° Milestone',
        };
      
        const createResponse = await agent.post('/artista').send(newArtista);
        expect(createResponse.statusCode).to.be.equal(200);
        createdArtistaId = createResponse.body.id;
      
        const getResponse = await agent.get(`/artista/${createdArtistaId}`);
        expect(getResponse.statusCode).to.be.equal(200);
        expect(getResponse.body.artista).to.be.equal("Teste 3° Milestone");
      
        const deleteRes = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteRes.statusCode).to.equal(200);
    });
    
    it('Teste rota GET /artista - StatusCode 200', async () => {
        const newArtista = {
          artista: 'Teste 3° Milestone',
        };
        
        const createResponse = await agent.post('/artista').send(newArtista);
        expect(createResponse.statusCode).to.be.equal(200);
        const createdArtistaId = createResponse.body.id;
        
        const getResponse = await agent.get(`/artista`);
        expect(getResponse.statusCode).to.equal(200);
        expect(getResponse.body[0].artista).to.be.equal("Teste 3° Milestone");

        const deleteRes = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteRes.statusCode).to.equal(200);
    });

    it('Teste rota GET /artista - StatusCode 200', async () => {
        const newArtista = {
          artista: 'Teste 3° Milestone',
        };
        
        const createResponse = await agent.post('/artista').send(newArtista);
        expect(createResponse.statusCode).to.be.equal(200);
        const createdArtistaId = createResponse.body.id;
        
        const getResponse = await agent.get(`/artista`);
        expect(getResponse.statusCode).to.equal(200);
        expect(getResponse.body[0].artista).to.be.equal("Teste 3° Milestone");

        const newMusica = {
            name: 'Calma na alma',
            description: 'Cone Crew',
            quality: 10,
            artistaId: createdArtistaId
        };
    
        const createMusicaResponse = await agent.post(`/artista/${createdArtistaId}/musica`).send(newMusica);
        expect(createMusicaResponse.statusCode).to.equal(200);
        const createdMusicaId = createMusicaResponse.body.id;
    
        const getRespon = await agent.get(`/artista`);
        expect(getRespon.statusCode).to.equal(200);
        expect(getRespon.body[0].Musicas[0].name).to.equal('Calma na alma');
        expect(getRespon.body[0].Musicas[0].description).to.equal('Cone Crew');
        expect(getRespon.body[0].Musicas[0].quality).to.equal(10);

        const deleteMusica = await agent.delete(`/musica/${createdMusicaId}`);
        expect(deleteMusica.statusCode).to.equal(200);

        const deleteRes = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteRes.statusCode).to.equal(200);
    });
          
    it('Teste rota GET /artista Caso não haver o que consultar', async () => {
        const getResponse = await agent.get('/artista');
        expect(getResponse.statusCode).to.equal(200);
        expect(getResponse.body).to.have.lengthOf(0);
    });
    
    it('Teste rota GET /artista/:id - StatusCode 200', async () => {
        const newArtista = {
          artista: 'Teste GET art. pelo Id',
        };

        const createResponse = await agent.post('/artista').send(newArtista);
        expect(createResponse.statusCode).to.equal(200);
        const createdArtistaId = createResponse.body.id;
        
        const getResponse = await agent.get(`/artista/${createdArtistaId}`);
        expect(getResponse.statusCode).to.equal(200);
        expect(getResponse.body.artista).to.be.equal("Teste GET art. pelo Id");

        const deleteRes = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteRes.statusCode).to.equal(200);
    });
    
    it('Teste rota GET /artista/:id - StatusCode 404', async () => {
            const getResponse = await agent.get(`/artista/-1`);
        
            expect(getResponse.statusCode).to.equal(404);
            expect(getResponse.body).to.have.property('message', 'Não há artistas com este id.');
    });
    
    it('Teste rota put /artista/:id', async () => {
            const newArtista = {
              artista: 'Teste novo artista',
            };
          
            const createResponse = await agent.post('/artista').send(newArtista);
            expect(createResponse.statusCode).to.equal(200);
            const createdArtistaId = createResponse.body.id;
          
            const getResponse = await agent.get(`/artista/${createdArtistaId}`);
            expect(getResponse.statusCode).to.equal(200);
            expect(getResponse.body.artista).to.be.equal("Teste novo artista");
          
            const updateResponse = await agent.put(`/artista/${createdArtistaId}`).send({
              artista: 'Artista atualizado',
            });
            expect(updateResponse.statusCode).to.equal(200);
            expect(updateResponse.body).to.have.property('message', 'Artista atualizado com sucesso.');
          
            const getUpdatedResponse = await agent.get(`/artista/${createdArtistaId}`);
            expect(getUpdatedResponse.statusCode).to.equal(200);
            expect(getUpdatedResponse.body.artista).to.be.equal("Artista atualizado");
          
            const deleteResponse = await agent.delete(`/artista/${createdArtistaId}`);
            expect(deleteResponse.statusCode).to.equal(200);
    });

    it('Teste rota put /artista/:id - Artista não encontrado', async () => {
        const updateResponse = await agent.put(`/artista/-1`).send({
          artista: 'Artista atualizado',
        });
        expect(updateResponse.statusCode).to.equal(404);
        expect(updateResponse.body).to.have.property('error', 'Artista não encontrado.');
    });
    
    it('Teste rota post /artista/:id/musica', async () => {
        const newArtista = {
            artista: 'Azul & Azulejo',
        };
    
        const createResponse = await agent.post('/artista').send(newArtista);
        expect(createResponse.statusCode).to.equal(200);
        const createdArtistaId = createResponse.body.id;
        
        const getResponse = await agent.get(`/artista/${createdArtistaId}`);
        expect(getResponse.statusCode).to.be.equal(200);
        expect(getResponse.body.artista).to.be.equal("Azul & Azulejo");
        
        const newMusica = {
            name: 'As andorinhas voltaram',
            description: 'buteco',
            quality: 10,
            artistaId: createdArtistaId
        };
    
        const createMusicaResponse = await agent.post(`/artista/${createdArtistaId}/musica`).send(newMusica);
        expect(createMusicaResponse.statusCode).to.equal(200);
        const createdMusicaId = createMusicaResponse.body.id;
    
        const getRespon = await agent.get(`/musica/${createdMusicaId}`);
        expect(getRespon.statusCode).to.equal(200);

        expect(getRespon.body.name).to.equal('As andorinhas voltaram');
        expect(getRespon.body.description).to.equal('buteco');
        expect(getRespon.body.quality).to.equal(10);
        expect(getRespon.body).to.have.property('artistaId', newMusica.artistaId);

        const deleteMusica = await agent.delete(`/musica/${createdMusicaId}`);
        expect(deleteMusica.statusCode).to.equal(200);
    
        const deleteRes = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteRes.statusCode).to.equal(200);
    });
    
    it('Teste rota GET /musicas - StatusCode 200', async () => {
        const newArtista = {
          artista: 'Renner',
        };
      
        const createArtistaResponse = await agent.post('/artista').send(newArtista);
        expect(createArtistaResponse.statusCode).to.equal(200);
        const createdArtistaId = createArtistaResponse.body.id;

        const getRespon = await agent.get(`/artista/${createdArtistaId}`);
        expect(getRespon.statusCode).to.equal(200);
        expect(getRespon.body.artista).to.be.equal("Renner");
      
        const newMusica = {
          name: 'Por um gole a mais',
          description: 'buteco',
          quality: 10,
          artistaId: createdArtistaId,
        };
      
        const createMusicaResponse = await agent.post(`/artista/${createdArtistaId}/musica`).send(newMusica);
        expect(createMusicaResponse.statusCode).to.equal(200);
        const createdMusicaId = createMusicaResponse.body.id;
      
        const getResponse = await agent.get('/musicas');
        expect(getResponse.statusCode).to.equal(200);
        expect(getResponse.body).to.have.lengthOf(1);
        expect(getResponse.body[0].name).to.equal('Por um gole a mais');
        expect(getResponse.body[0].description).to.equal('buteco');
        expect(getResponse.body[0].quality).to.equal(10);
        expect(getResponse.body[0]).to.have.property('artistaId', newMusica.artistaId);
      
        const deleteMusicaResponse = await agent.delete(`/musica/${createdMusicaId}`);
        expect(deleteMusicaResponse.statusCode).to.equal(200);
      
        const deleteArtistaResponse = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteArtistaResponse.statusCode).to.equal(200);
      });

    it('Teste rota GET /musica/:id - StatusCode 200', async () => {
        const newArtista = {
            artista: 'Frederico',
        };
    
        const createArtistaResponse = await agent.post('/artista').send(newArtista);
        expect(createArtistaResponse.statusCode).to.equal(200);
        const createdArtistaId = createArtistaResponse.body.id;

        const getRespon = await agent.get(`/artista/${createdArtistaId}`);
        expect(getRespon.statusCode).to.equal(200);
        expect(getRespon.body.artista).to.be.equal("Frederico");
    
        const newMusica = {
            name: 'Ipê florido',
            description: 'buteco',
            quality: 10,
            artistaId: createdArtistaId
        };
    
        const createMusicaResponse = await agent.post(`/artista/${createdArtistaId}/musica`).send(newMusica);
        expect(createMusicaResponse.statusCode).to.equal(200);
        const createdMusicaId = createMusicaResponse.body.id;
    
        const getResponse = await agent.get(`/musica/${createdMusicaId}`);
        expect(getResponse.statusCode).to.equal(200);

        expect(getResponse.body.name).to.be.equal('Ipê florido');
        expect(getResponse.body.description).to.be.equal('buteco');
        expect(getResponse.body.quality).to.be.equal(10);
        expect(getResponse.body).to.have.property('artistaId', newMusica.artistaId);
    
        const deleteMusica = await agent.delete(`/musica/${createdMusicaId}`);
        expect(deleteMusica.statusCode).to.equal(200);
    
        const deleteArtista = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteArtista.statusCode).to.equal(200);
    });
    
    it('Teste rota GET /musica/:id - StatusCode 404', async () => {
        const getResponse = await agent.get(`/musica/-1`);
        
        expect(getResponse.statusCode).to.equal(404);
        expect(getResponse.body).to.have.property('message', 'Não há musicas com este id.');
    });
    
    it('Teste rota GET /artista/:id/musicas - StatusCode 200', async () => {
        const newArtista = {
            artista: 'Roberto Carlos',
        };
    
        const createArtistaResponse = await agent.post('/artista').send(newArtista);
        expect(createArtistaResponse.statusCode).to.equal(200);
        const createdArtistaId = createArtistaResponse.body.id;

        const getRespon = await agent.get(`/artista/${createdArtistaId}`);
        expect(getRespon.statusCode).to.equal(200);
        expect(getRespon.body.artista).to.be.equal("Roberto Carlos");

        const newMusica = {
            name: 'Tanto a te falar',
            description: 'buteco',
            quality: 10,
            artistaId: createdArtistaId,
        };
    
        const createMusicaResponse = await agent.post(`/artista/${createdArtistaId}/musica`).send(newMusica);
        expect(createMusicaResponse.statusCode).to.equal(200);
        const createdMusicaId = createMusicaResponse.body.id;
    
        const getRespons = await agent.get(`/artista/${createdArtistaId}/musicas`);
        expect(getRespons.statusCode).to.equal(200);
    
        expect(getRespons.body[0].name).to.be.equal('Tanto a te falar');
        expect(getRespons.body[0].description).to.be.equal('buteco');
        expect(getRespons.body[0].quality).to.be.equal(10);
        expect(getRespons.body[0]).to.have.property('artistaId', newMusica.artistaId);
        
        const deleteMusicaResponse = await agent.delete(`/musica/${createdMusicaId}`);
        expect(deleteMusicaResponse.statusCode).to.equal(200);
        
        const deleteArtistaResponse = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteArtistaResponse.statusCode).to.equal(200);   
    });

    it('Teste rota put /musica/:id', async () => {
            const newArtista = {
                artista: 'Senna',
            };
        
            const createArtistaResponse = await agent.post('/artista').send(newArtista);
            expect(createArtistaResponse.statusCode).to.equal(200);
            const createdArtistaId = createArtistaResponse.body.id;

            const getRespon = await agent.get(`/artista/${createdArtistaId}`);
            expect(getRespon.statusCode).to.equal(200);
            expect(getRespon.body.artista).to.be.equal("Senna");
        
            const newMusica = {
                name: 'For elisa',
                description: 'calma',
                quality: 10,
                artistaId: createdArtistaId
            };
        
            const createMusicaResponse = await agent.post(`/artista/${createdArtistaId}/musica`).send(newMusica);
            const createdMusicaId = createMusicaResponse.body.id;
            expect(createMusicaResponse.statusCode).to.equal(200);

            const getRespons = await agent.get(`/artista/${createdArtistaId}/musicas`);
            expect(getRespons.statusCode).to.equal(200);
        
            expect(getRespons.body[0].name).to.be.equal('For elisa');
            expect(getRespons.body[0].description).to.be.equal('calma');
            expect(getRespons.body[0].quality).to.be.equal(10);
            expect(getRespons.body[0]).to.have.property('artistaId', newMusica.artistaId);
        
            const novaMusica = {
                name: 'Poeira da estrada',
                description: 'buteco',
                quality: 10,
                artistaId: createdArtistaId
            };
            const updateResponse = await agent.put(`/musica/${createdMusicaId}`).send(novaMusica);
            expect(updateResponse.statusCode).to.equal(200);
        
            const getResponse = await agent.get(`/musica/${createdMusicaId}`);
            expect(getResponse.statusCode).to.equal(200);

            expect(getResponse.body.name).to.be.equal('Poeira da estrada');
            expect(getResponse.body.description).to.be.equal('buteco');
            expect(getResponse.body.quality).to.be.equal(10);
            expect(getResponse.body).to.have.property('artistaId', newMusica.artistaId);
        
            const deleteResponse = await agent.delete(`/musica/${createdMusicaId}`);
            expect(deleteResponse.statusCode).to.equal(200);
        
            const deleteArtistaResponse = await agent.delete(`/artista/${createdArtistaId}`);
            expect(deleteArtistaResponse.statusCode).to.equal(200);
    });
    
    it('Teste rota put /musica/:id' , async () => {
        const updateResponse = await agent.put(`/musica/-1`).send();
        expect(updateResponse.statusCode).to.equal(404);
        expect(updateResponse.body).to.have.property('error', 'Música não encontrada.');
    });
    
    it("deve retornar um erro 404 se o artista não existir", async () => {
        const newArtista = {
            artista: 'Kay Black',
        };
    
        const createResponse = await agent.post('/artista').send(newArtista);
        expect(createResponse.statusCode).to.equal(200);
        const createdArtistaId = createResponse.body.id;

        const getRespon = await agent.get(`/artista/${createdArtistaId}`);
        expect(getRespon.statusCode).to.equal(200);
        expect(getRespon.body.artista).to.be.equal("Kay Black");

        const newMusica = {
            name: 'Melhor só',
            description: 'ft. Baco',
            quality: 10,
            artistaId: createdArtistaId
        };
    
        const createMusicaResponse = await agent.post(`/artista/${createdArtistaId}/musica`).send(newMusica);
        expect(createMusicaResponse.statusCode).to.equal(200);
        const createdMusicaId = createMusicaResponse.body.id;

        const getRespons = await agent.get(`/artista/${createdArtistaId}/musicas`);
            expect(getRespons.statusCode).to.equal(200);
        
            expect(getRespons.body[0].name).to.be.equal('Melhor só');
            expect(getRespons.body[0].description).to.be.equal('ft. Baco');
            expect(getRespons.body[0].quality).to.be.equal(10);
            expect(getRespons.body[0]).to.have.property('artistaId', newMusica.artistaId);
    
        const NovaMusica = {
            name: 'Música atualizada2',
            description: 'Descrição da música atualizada',
            quality: 10,
            artistaId: 1
        };
        const updateResponse = await agent.put(`/musica/${createdMusicaId}`).send(NovaMusica);
        expect(updateResponse.statusCode).to.equal(404);

        expect(updateResponse.text).to.equal(`"Artista não encontrado."`);
        const deleteMusicaResponse = await agent.delete(`/musica/${createdMusicaId}`);
        expect(deleteMusicaResponse.statusCode).to.equal(200);

        const deleteArtistaResponse = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteArtistaResponse.statusCode).to.equal(200);
    });
    
    it('Teste rota delete /musica/:id', async () => {
        const newArtista = {
          artista: 'Jovem Dex',
        };
        
        const createArtistaResponse = await agent.post('/artista').send(newArtista);
        const createdArtistaId = createArtistaResponse.body.id;

        const getRespon = await agent.get(`/artista/${createdArtistaId}`);
        expect(getRespon.statusCode).to.equal(200);
        expect(getRespon.body.artista).to.be.equal("Jovem Dex");
        
        const newMusica = {
          name: 'submarino',
          description: 'hit',
          quality: 10,
          artistaId: createdArtistaId
        };
        
        const createMusicaResponse = await agent.post(`/artista/${createdArtistaId}/musica`).send(newMusica);
        const createdMusicaId = createMusicaResponse.body.id;

        const getResponse = await agent.get(`/musica/${createdMusicaId}`);
        expect(getResponse.statusCode).to.equal(200);

        expect(getResponse.body.name).to.be.equal('submarino');
        expect(getResponse.body.description).to.be.equal('hit');
        expect(getResponse.body.quality).to.be.equal(10);
        expect(getResponse.body).to.have.property('artistaId', newMusica.artistaId);
        
        const deleteResponse = await agent.delete(`/musica/${createdMusicaId}`);
        expect(deleteResponse.status).to.equal(200);
        expect(deleteResponse.body).to.deep.equal({ message: 'Música deletada com sucesso.' });
        
        const deleteArtistaResponse = await agent.delete(`/artista/${createdArtistaId}`);
        expect(deleteArtistaResponse.status).to.equal(200);
    });
    
    it('Teste rota delete /musica/:id - Música inexistente', async () => {
        const deleteResponse = await agent.delete(`/musica/-1`);
        expect(deleteResponse.status).to.equal(404);
        expect(deleteResponse.body).to.deep.equal({ error: 'Música não encontrada.' });
    });
    
    afterEach(async () => {
        if (createdMusicaId) {
            await agent.delete(`/musica/${createdMusicaId}`);
        }
        if (createdArtistaId) {
            await agent.delete(`/artista/${createdArtistaId}`);
        }
    });
});