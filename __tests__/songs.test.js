const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/models');

describe('/songs', () => {
    let artist;
    let album;
  
    before(async () => {
      try {
        await Artist.sequelize.sync();
        await Album.sequelize.sync();
        await Song.sequelize.sync();
      } catch (err) {
        console.log(err);
      }
    });
  
    beforeEach(async () => {
      try {
        await Artist.destroy({ where: {} });
        await Album.destroy({ where: {} });
        await Song.destroy({ where: {} });
        artist = await Artist.create({
          name: 'Taylor Swift',
          genre: 'Pop',
        });
        album = await Album.create({
            name: 'evermore',
            year: '2020',
            artistName: 'Taylor Swift',
            artistId: artist.id,
        })
      } catch (err) {
        console.log(err);
      }
    });
  
    describe('POST /albums/:albumId/songs', () => {
        it('creates a new song under an album', (done) => {
            request(app)
              .post(`/albums/${album.id}/songs`)
              .send({
                artist: artist.id,
                name: 'willow',
              })
              .then((res) => {
                expect(res.status).to.equal(201);
                const songId = res.body.id;
                expect(res.body.id).to.equal(songId);
                expect(res.body.name).to.equal('willow');
                expect(res.body.artistId).to.equal(artist.id);
                expect(res.body.albumId).to.equal(album.id);
                done();
              }).catch(error => done(error))
      });
  
      it('returns a 404 and does not create an song if the album does not exist', (done) => {
        request(app)
          .post('/albums/1234/songs')
          .send({
            name: 'Yellow',
          })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
  
            Song.findAll().then((songs) => {
              expect(songs.length).to.equal(0);
              done();
            });
          }).catch(error => done(error))
      });
    });

    describe('with songs in the database', () => {
      let songs;

      beforeEach((done) => {
        Promise.all([
            Song.create({ artistId: artist.artistId, albumId: album.id, name: 'champagne problems' }),
            Song.create({ artistId: artist.artistId, albumId: album.id, name: 'gold rush' }),
            Song.create({ artistId: artist.artistId, albumId: album.id, name: '\'tis the damn season' }),
        ]).then((documents) => {
            songs = documents;
            done();
        })
        .catch(error => done(error))
    });
  
      describe('GET /songs', () => {
          it('gets all song records', (done) => {
              request(app)
                  .get('/songs')
                  .then((res) => {
                      expect(res.status).to.equal(200);
                      expect(res.body.length).to.equal(3);
                      res.body.forEach((song) => {
                          const expected = songs.find(a => a.id === song.id);
                          expect(song.name).to.equal(expected.name);
                      });
                      done();
                  })
                  .catch(error => done(error))
          });
      });
  
      describe('GET /albums/:albumId/songs', () => {
       
          it('gets songs under an album', (done) => {
              request(app)
              .get(`/albums/${album.id}/songs`)
              .then((res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.length).to.equal(3);
                  res.body.forEach((song) => {
                    const expected = songs.find((s) => s.id === song.id)
                    expect(song.name).to.equal(expected.name)
                }); 
                done();
              })
              .catch(error => done(error))
          });      
          
          it('returns a 404 if the album does not exist', (done) => {
              request(app)
                  .get('/albums/12345')
                  .then((res) => {
                      expect(res.status).to.equal(404);
                      expect(res.body.error).to.equal('The album could not be found.');
                      done();
                  })
                  .catch(error => done(error))
          });
      });
  
      