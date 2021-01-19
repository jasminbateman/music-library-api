const express = require('express')

const app = express()

const { createArtist, 
        listArtists,
        getArtistById,
        updateArtist,
        removeArtist
    } = require('./controllers/artists');

const {  createAlbum,
         listAlbums,
         getAlbumById,
         updateAlbum,
         removeAlbum
    } = require('./controllers/albums');

const {  createSong,
         listSongs,
         getSongsByAlbum,
         getSongsByArtist,
         findSongById,
         updateSong,
         removeSong
   } = require('./controllers/songs');

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

app.post('/artists', createArtist);

app.get('/artists', listArtists);

app.get('/artists/:id', getArtistById);

app.patch('/artists/:id', updateArtist);

app.delete('/artists/:id', removeArtist);

//albums

app.post('/artists/:artistId/albums', createAlbum);

app.get('/albums', listAlbums);

app.get('/albums/:id', getAlbumById);

app.patch('/albums/:id', updateAlbum);

app.delete('/albums/:id', removeAlbum);

//songs

app.post('/albums/:albumId/songs', createSong);

app.get('/songs', listSongs);

app.get('/albums/:albumId/songs', getSongsByAlbum);

app.get('/artists/:artistId/songs', getSongsByArtist);

app.get('/songs/:songId', findSongById);

app.patch('/songs/:songId', updateSong);

app.delete('/songs/:songId', removeSong);

module.exports = app